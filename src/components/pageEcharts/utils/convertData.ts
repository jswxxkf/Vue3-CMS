import { coordinateData } from './coordinateData'

export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  // 最终嵌入options中的数据：
  // [{name: cityName, value: [longitude, altitude, saleCount]}, ...]
  return res
}
