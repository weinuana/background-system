//进行axios二次封装:使用请求与响应拦截器
import axios from "axios"
import { ElMessage } from 'element-plus'
//引入用户相关仓库
import useUserStore from "@/store/modules/user";
//第一步:利用axios对象的creat方法，去创建axios实例(其他的配置:基础路径、超时的时间)
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径会携带/api
    timeout: 5000 //超时时间配置
});
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    //登录用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    let userStore = useUserStore();
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
    (error) => {
        // 失败回调：处理http网络错误
    },
)
//对外暴露
export default request;
