import * as echarts from 'echarts/core'
import {
    BarChart,
    LineChart,
    LinesChart,
    PieChart,
    RadarChart,
    ScatterChart,
} from 'echarts/charts'
import {
    GeoComponent,
    GridComponent,
    LegendComponent,
    RadarComponent,
    TitleComponent,
    TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

//只注册数据大屏实际使用的图表与组件，避免打包完整ECharts功能集。
echarts.use([
    BarChart,
    LineChart,
    LinesChart,
    PieChart,
    RadarChart,
    ScatterChart,
    GeoComponent,
    GridComponent,
    LegendComponent,
    RadarComponent,
    TitleComponent,
    TooltipComponent,
    CanvasRenderer,
])

export default echarts
