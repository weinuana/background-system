import { onActivated, onBeforeUnmount, onMounted, type Ref } from 'vue'
import type { EChartsCoreOption, EChartsType } from 'echarts/core'
import echarts from '@/utils/echarts'

//统一管理图表初始化、尺寸同步和销毁，避免重复进入页面后残留Canvas与监听器。
export const useECharts = (
    container: Ref<HTMLDivElement | undefined>,
    getOption: () => EChartsCoreOption,
) => {
    let chart: EChartsType | undefined
    let resizeObserver: ResizeObserver | undefined
    let resizeFrame = 0

    //同一帧内多次尺寸变化只执行一次resize，降低大屏缩放时的计算压力。
    const resize = () => {
        cancelAnimationFrame(resizeFrame)
        resizeFrame = requestAnimationFrame(() => chart?.resize())
    }

    onMounted(() => {
        if (!container.value) return
        chart = echarts.init(container.value)
        chart.setOption(getOption())
        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(container.value)
    })

    //页面被KeepAlive重新激活时重新计算容器大小。
    onActivated(resize)

    onBeforeUnmount(() => {
        cancelAnimationFrame(resizeFrame)
        resizeObserver?.disconnect()
        chart?.dispose()
        chart = undefined
    })
}
