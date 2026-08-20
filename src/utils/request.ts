//进行axios二次封装:使用请求与响应拦截器
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关仓库
import useUserStore from '@/store/modules/user'

type PendingRequestConfig = InternalAxiosRequestConfig & {
    pendingRequestKey?: string
    pendingRequestController?: AbortController
}

const pendingRequests = new Map<string, AbortController>()

const getRequestKey = (config: InternalAxiosRequestConfig) => {
    return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`
}

const clearPendingRequest = (config?: PendingRequestConfig) => {
    if (!config?.pendingRequestKey) return
    //旧请求取消后不能误删同一地址的新请求控制器。
    if (pendingRequests.get(config.pendingRequestKey) === config.pendingRequestController) {
        pendingRequests.delete(config.pendingRequestKey)
    }
}

//第一步:利用axios对象的creat方法，去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径会携带/api
    timeout: 5000 //超时时间配置
});
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config: PendingRequestConfig) => {
    //相同GET请求只保留最后一次，快速切换分页或筛选时旧响应不会覆盖新数据。
    if (config.method?.toLowerCase() === 'get') {
        const requestKey = getRequestKey(config)
        pendingRequests.get(requestKey)?.abort()
        const controller = new AbortController()
        config.signal = controller.signal
        config.pendingRequestKey = requestKey
        config.pendingRequestController = controller
        pendingRequests.set(requestKey, controller)
    }
    //登录用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    //config配置对象,header属性请求头,经常给服务器端携带公共参数
    //返回配置对象
    return config;
})
//第三步:响应拦截器
// request.interceptors.response.use((response) => { (老师的方法与接口不适用)
//     //成功回调
//     //简化数据
//     return response.data;
// }, (error) => {
//     //失败回调:处理http网络错误
//     //定一个变量:存储网络错误信息
//     let msg = '';
//     let status = error.response.status;
//     switch (status) {
//         case 401:
//             msg = "token过期";
//             break;
//         case 403:
//             msg = '无权访问';
//             break;
//         case 404:
//             msg = "请求地址错误";
//             break;
//         case 500:
//             msg = "服务器出现问题";
//             break;
//         default:
//             msg = "无网络";

//     }
//     //提示错误信息
//     ElMessage({
//         type: 'error',
//         message: msg
//     })
//     return Promise.reject(error);
// });
request.interceptors.response.use(
    (response) => {
        clearPendingRequest(response.config as PendingRequestConfig)
        // 成功回调
        /* 判断服务返回的 code
           200 -> 请求成功
           201 -> 请求参数错误
           202 -> 用户名已存在，用于创建用户
           203 -> 用户名不存在，用于登录
           204 -> 用户名或密码错误，用于登录
           205 -> 服务繁忙，服务内部错误
           206 -> 无效的Token
           207 -> 无权访问，需要登录
           208 -> 该节点下有子节点，不可以删除
        */
        const code = response.data.code
        if (code !== 200) {
            // 提示错误信息
            ElMessage({
                type: 'error',
                message: response.data.message,
            })
            // 抛出错误
            return Promise.reject(new Error(response.data.message))
        }
        // 返回数据
        return response.data
    },
    (error: AxiosError) => {
        clearPendingRequest(error.config as PendingRequestConfig)
        //主动取消的旧请求无需提示用户，其余异常继续向上传递。
        if (!axios.isCancel(error)) {
            ElMessage({
                type: 'error',
                message: error.message || '网络请求失败',
            })
        }
        return Promise.reject(error)
    },
)
//对外暴露
export default request
