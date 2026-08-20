import type { App, Component } from 'vue'
import {
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElCard,
    ElCarousel,
    ElCarouselItem,
    ElCheckbox,
    ElCheckboxGroup,
    ElCol,
    ElColorPicker,
    ElConfigProvider,
    ElDialog,
    ElDrawer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElForm,
    ElFormItem,
    ElIcon,
    ElInput,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElPagination,
    ElPopconfirm,
    ElPopover,
    ElRow,
    ElScrollbar,
    ElSelect,
    ElSubMenu,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTag,
    ElTree,
    ElUpload,
} from 'element-plus'
import {
    ArrowDown,
    ArrowRight,
    Bottom,
    Calendar,
    ChromeFilled,
    DataLine,
    Delete,
    DocumentDelete,
    Edit,
    Expand,
    Fold,
    FullScreen,
    Goods,
    HomeFilled,
    InfoFilled,
    Lock,
    Monitor,
    MoonNight,
    Orange,
    Platform,
    Plus,
    Promotion,
    Refresh,
    Setting,
    ShoppingCartFull,
    Sunny,
    Top,
    User,
    UserFilled,
    View,
} from '@element-plus/icons-vue'

//只加载项目实际使用到的组件样式，避免把整套 Element Plus CSS 打进首屏资源。
import 'element-plus/es/components/breadcrumb/style/css'
import 'element-plus/es/components/breadcrumb-item/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/card/style/css'
import 'element-plus/es/components/carousel/style/css'
import 'element-plus/es/components/carousel-item/style/css'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/checkbox-group/style/css'
import 'element-plus/es/components/col/style/css'
import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/config-provider/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/drawer/style/css'
import 'element-plus/es/components/dropdown/style/css'
import 'element-plus/es/components/dropdown-item/style/css'
import 'element-plus/es/components/dropdown-menu/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/popconfirm/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/scrollbar/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/sub-menu/style/css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/tree/style/css'
import 'element-plus/es/components/upload/style/css'

const components: Component[] = [
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElButton,
    ElCard,
    ElCarousel,
    ElCarouselItem,
    ElCheckbox,
    ElCheckboxGroup,
    ElCol,
    ElColorPicker,
    ElConfigProvider,
    ElDialog,
    ElDrawer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElForm,
    ElFormItem,
    ElIcon,
    ElInput,
    ElMenu,
    ElMenuItem,
    ElOption,
    ElPagination,
    ElPopconfirm,
    ElPopover,
    ElRow,
    ElScrollbar,
    ElSelect,
    ElSubMenu,
    ElSwitch,
    ElTable,
    ElTableColumn,
    ElTag,
    ElTree,
    ElUpload,
]

//动态菜单和按钮通过字符串解析图标，因此只把当前路由和页面用到的图标注册到全局。
const icons = {
    ArrowDown,
    ArrowRight,
    Bottom,
    Calendar,
    ChromeFilled,
    DataLine,
    Delete,
    DocumentDelete,
    Edit,
    Expand,
    Fold,
    FullScreen,
    Goods,
    HomeFilled,
    InfoFilled,
    Lock,
    Monitor,
    MoonNight,
    Orange,
    Platform,
    Plus,
    Promotion,
    Refresh,
    Setting,
    ShoppingCartFull,
    Sunny,
    Top,
    User,
    UserFilled,
    View,
}

export default {
    install(app: App) {
        components.forEach((component) => {
            app.component(component.name as string, component)
        })
        Object.entries(icons).forEach(([name, component]) => {
            app.component(name, component)
        })
    },
}
