# 前端性能优化说明

## 优化范围

- 优化日期：2026-08-20
- 仅修改 `project` 前端代码。
- 未修改 `vue3_admin_backend` 后端代码。
- 未修改接口地址、请求方法、请求参数和响应结构。
- 本次对应性能优化项：1、3、4、5、7、8、9。

## 1. Element Plus 按需加载

### 修改位置

- `src/plugins/element-plus.ts`
- `src/main.ts`
- `src/App.vue`
- `src/components/index.ts`

### 实现方式

- 移除 `app.use(ElementPlus)` 全量安装方式。
- 新增 Element Plus 插件，只注册项目模板中实际使用的组件。
- 将全部图标注册改为图标白名单，只注册路由、菜单和按钮正在使用的图标。
- 将 `element-plus/dist/index.css` 改为组件级样式导入。
- 在根组件使用 `el-config-provider` 保留中文配置。

### 性能收益

- 未使用的组件、图标和样式不会进入首屏资源。
- 后续新增 Element Plus 组件或图标时，需要同步加入 `src/plugins/element-plus.ts` 白名单。

## 3. ECharts 模块化加载

### 修改位置

- `src/utils/echarts.ts`
- `src/views/screen/components/*/index.vue`

### 实现方式

- 将各图表组件中的 `import * as echarts from 'echarts'` 改为共享模块。
- 只注册当前大屏使用的柱状图、折线图、航线图、饼图、雷达图、散点图及相关组件。
- 保留 `echarts-liquidfill` 水球图扩展，不改变现有大屏功能。

### 性能收益

- 避免加载项目没有使用的 ECharts 图表类型和功能组件。
- 所有图表共用同一份 ECharts 模块，便于统一维护和分包。

## 4. 图表生命周期管理

### 修改位置

- `src/hooks/useECharts.ts`
- 8 个数据大屏图表组件

### 实现方式

- 新增 `useECharts` Hook，统一初始化图表和设置配置。
- 使用 `ResizeObserver` 监听图表容器尺寸。
- 使用 `requestAnimationFrame` 合并同一帧内的多次 `resize()`。
- 组件卸载时断开观察器、取消动画帧并执行 `chart.dispose()`。
- KeepAlive 页面重新激活时重新计算图表尺寸。

### 性能收益

- 避免重复进入页面后残留 Canvas、图表实例和尺寸监听器。
- 降低连续缩放时的重复布局和图表计算。

## 5. 数据大屏缩放优化

### 修改位置

- `src/views/screen/index.vue`

### 实现方式

- 将全局 `window.onresize` 改为组件生命周期内注册的事件监听。
- 使用 `requestAnimationFrame` 对连续 resize 事件进行合并。
- 离开数据大屏时主动移除监听器。

### 性能收益

- 后台其他页面不再继续执行大屏缩放逻辑。
- 浏览器窗口连续变化时，每一帧最多计算一次缩放比例。

## 7. 后台列表页面缓存

### 修改位置

- `src/layout/main/index.vue`
- `src/router/routes.ts`

### 实现方式

- 使用 `KeepAlive` 缓存用户、角色、菜单、品牌、属性、SPU 和 SKU 页面。
- 最大缓存数量设置为 8，避免页面无限占用内存。
- 登录页、404 页面和数据大屏不缓存。
- 原有刷新按钮改为更新当前路由的独立缓存键，只重建当前页面。

### 性能收益

- 切换菜单后返回列表页时，保留分页、筛选条件和页面数据。
- 减少组件重复创建及列表首屏接口重复请求。

## 8. 重复请求和整站刷新优化

### 修改位置

- `src/utils/request.ts`
- `src/App.vue`
- `src/views/acl/user/index.vue`
- `src/views/acl/role/index.vue`

### 实现方式

- 使用 `AbortController` 管理 GET 请求，相同请求只保留最后一次。
- 被主动取消的旧请求不弹出错误消息，其他网络异常继续向调用方传递。
- 删除根组件挂载时额外执行的测试登录请求。
- 用户保存后只刷新用户列表，不再执行 `window.location.reload()`。
- 角色权限保存后只更新当前用户信息和动态路由，不再重新加载整个应用。

### 性能收益

- 快速切换分页或查询时，旧响应不会覆盖最新数据。
- 避免重新下载和执行全部脚本、样式与路由初始化逻辑。

## 9. 构建分包和浏览器缓存

### 修改位置

- `vite.config.ts`

### 实现方式

- 将 Vue、Vue Router 和 Pinia 输出到 `vue-vendor` 分包。
- 将 Element Plus 和图标输出到 `element-plus` 分包。
- 将 ECharts 和水球图扩展输出到 `echarts` 分包。
- 业务路由继续使用原有动态导入，不强制合并其他依赖。

### 性能收益

- 业务代码更新后，大型第三方依赖的文件哈希通常保持不变，浏览器可以继续使用缓存。
- 数据大屏依赖不会进入普通后台页面的业务代码块。

## 代码注释

关键优化位置已经加入中文注释，主要说明：

- 为什么只注册部分组件和图标。
- 为什么需要取消重复 GET 请求。
- KeepAlive 缓存范围与刷新方式。
- 图表 resize 合并和实例销毁原因。
- Vite 分包的缓存目的。

## 验证结果

- Vite 生产构建成功，共转换 2421 个模块。
- 构建结果已生成独立的 `vue-vendor`、`element-plus` 和 `echarts` 文件。
- Vue TypeScript 检查仍存在项目原有的未使用变量错误；本次新增的插件、Hook 和性能代码没有产生新的类型错误。
- 本次没有修改后端代码及接口。

## 本次未包含

- 用户未选择第 2 项，因此未压缩约 3.7 MB 的 `china.json` 和大屏图片。
- 用户未选择第 6 项，因此保留 Moment 时间格式化逻辑。
