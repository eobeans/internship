<!--
 * @Autor: eobeans
 * @Date: 2021-08-14 11:05:04
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-14 12:15:42
 * @Version: 0.1.0
 * @Description: 根据起止时间和事件频率生成日期列表
-->
<template>
  <div>
    <div>
      <el-form>
        <el-form-item label="开始日期">
          <el-date-picker v-model="startDate" value-format="yyyyMMdd" />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="endDate" value-format="yyyyMMdd"  />
        </el-form-item>
        <el-form-item label="事件频率">
          <el-select v-model="selectFreq">
            <el-option 
              v-for="freq in frequencyOpts"
              :label="freq.label"
              :key="freq.value"
              :value="freq.value"
            />
          </el-select>
        </el-form-item>
        <el-button @click="handleClick">确定</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import dayjs from 'dayjs'
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
const today = dayjs().format('YYYYMMDD')
const startOfYear = dayjs().startOf('year').format('YYYYMMDD')
export default {
  name: 'dateListByFreq',
  data() {
    return {
      frequencyOpts: [
        {
          label: '日',
          value: 'D'
        },
        {
          label: '月',
          value: 'M'
        },
        {
          label: '季',
          value: 'Q'
        },
        {
          label: '半年',
          value: 'S'
        },
        {
          label: '年',
          value: 'Y'
        },
      ],
      startDate: startOfYear,
      endDate: today,
      selectFreq: 'M'
    }
  },
  methods: {
    handleClick() {
      console.log(this.startDate, this.endDate, this.selectFreq)
      let rptDatList = []
      if (this.selectFreq === 'D') {
        const durationFreqD = dayjs.duration(dayjs(this.endDate).diff(dayjs(this.startDate))).asDays()
        console.log(durationFreqD)
        for (let i = 0; i <= durationFreqD; i++) {
          rptDatList.push(dayjs(this.startDate).add(i, 'd').format('YYYYMMDD'))
        }
      } else if (this.selectFreq === 'M') {
        const durationY = _.subtract(_.toNumber(this.endDate.substring(0, 4)), _.toNumber(this.startDate.substring(0, 4)))
        const durationM = _.subtract(_.toNumber(this.endDate.substring(4, 6)), _.toNumber(this.startDate.substring(4, 6)))
        const durationFreqM = _.add(_.multiply(durationY, 12), durationM)
        const startFreqMDate = dayjs(this.startDate).endOf('month').format('YYYYMMDD')
        console.log(durationY, durationM, durationFreqM)
        if (startFreqMDate === this.endDate) {
          rptDatList.push(startFreqMDate)
        } else {
          for(let i = 0; i < durationFreqM; i++) {
            if (dayjs(startFreqMDate).isBefore(this.endDate)) {
              rptDatList.push(dayjs(startFreqMDate).add(i, 'M').format('YYYYMMDD'))
            }
          }
        }
      } else if (this.selectFreq === 'Q') {
        const durationY = _.subtract(_.toNumber(this.endDate.substring(0, 4)), _.toNumber(this.startDate.substring(0, 4)))
        const durationM = _.subtract(_.toNumber(this.endDate.substring(4, 6)), _.toNumber(this.startDate.substring(4, 6)))
      }
      console.log('rptDatList', rptDatList)
    }
  }
}
</script>