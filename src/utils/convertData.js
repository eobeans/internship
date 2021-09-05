/*
 * @Autor: eobeans
 * @Date: 2021-09-05 00:44:15
 * @LastEditors: eobeans
 * @LastEditTime: 2021-09-05 13:04:33
 * @Version: 0.1.0
 * @Description: 处理对象数组数据，化为echart可识别的数据格式
 */
import _ from 'lodash'

function test() {
  console.log('test')
  return false
}
function createDateList(startDate, endDate, frequency) {
  // 暂时处理月频度
  const rptDateList = ['20210131', '20210228', '20210331']
  return rptDateList
}

function createDateNameList(rptDateList, frequency) {
  const rptDateNameList = ['jan', 'feb', 'mar']
  return rptDateNameList
}

function convertLineData(dataAsset = {realData: [], scheData: [], lastData: [], adjData: [], lastAdjData: []},
  params = {prec: '1000000', val_typ: 'Movement', frq: 'M', startdt: '20210101', enddt: '20210331'}) {
  // 处理参数映射 to finish
  const rptDateList = createDateList(params.startdt, params.enddt, params.frq) // 假处理
  // 若所选区间内无对应频度，则发出提示
  if (rptDateList.length === 0) {
    const message = 'Please Select The Appropriate Time Interval And Time Frequency.'
    throw message
  }
  const rptDateNameList = createDateNameList(rptDateList, params.frq) // 假处理
  const noCrossYera = rptDateList.length === 1
    ? true
    : rptDateList[0].substring(0, 4) === rptDateList[rptDateList.length].substring(0, 4)
  const source = [['product']]
  if(noCrossYera) {
    rptDateNameList.map((name, i) => {
      source[0].push(name)
      _.isUndefined(dataAsset.lastData[i])
        ? source[1].push(0)
        : source[1].push(dataAsset.lastData[i])
      _.isUndefined(dataAsset.realData[i])
        ? source[2].push(0)
        : source[2].push(dataAsset.realData[i])
      _.isUndefined(dataAsset.scheData[i])
        ? source[3].push(0)
        : source[3].push(dataAsset.scheData[i])
    })
    // 设置调整值
    let index1 = 0 // 去年调整值索引
    let index2 = 0 // 今年调整值索引
    rptDateList.map((date, i) => {
      if (!_.isUndefined(dataAsset.lastAdjData[index1])
        && dataAsset.lastAdjData[index1].rptDat === date) {
        source[1][i] = dataAsset.lastAdjData[index1].amt
        index1++
      }
      if (!_.isUndefined(dataAsset.adjData[index2])
        && dataAsset.adjData[index2].rptDat === date) {
        source[2][i] = dataAsset.lastAdjData[index2].amt
        index2++
      }
    })
    // 组装数据
  }
}

export default {
  test,
  convertLineData
}
