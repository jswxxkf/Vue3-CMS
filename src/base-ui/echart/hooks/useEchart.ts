import * as echarts from 'echarts'

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el, 'bright', { renderer: 'svg' })
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
  }
}
