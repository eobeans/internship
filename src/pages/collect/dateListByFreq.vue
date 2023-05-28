<!--
 * @Autor: eobeans
 * @Date: 2021-08-14 11:05:04
 * @LastEditors: eobeans
 * @LastEditTime: 2021-09-05 21:13:06
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
        <el-button @click="handleClick1">convertLineData</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import dayjs from 'dayjs'
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
const quarterOfYear = require('dayjs/plugin/quarterOfYear')
dayjs.extend(quarterOfYear)
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
const today = dayjs().format('YYYYMMDD')
const startOfYear = dayjs().startOf('year').format('YYYYMMDD')
import convertFunc from '@/utils/convertData.js'
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
      endDate: '20250930',
      selectFreq: 'S'
    }
  },
  methods: {
    handleClick1() {
      const data = convertFunc.convertLineData()
      console.log('convertLineData', data)
    },
    handleClick() {
      console.log(this.startDate, this.endDate, this.selectFreq)
      let rptDatList = []
      if (this.selectFreq === 'D') {
        const durationFreqD = dayjs.duration(dayjs(this.endDate).diff(dayjs(this.startDate))).asDays()
        console.log(durationFreqD)
        const forLength = durationFreqD > 29 ? 29 : durationFreqD
        for (let i = 0; i <= forLength; i++) {
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
          const forLength = durationFreqM > 29 ? 29 : durationFreqM
          for(let i = 0; i <= forLength; i++) {
            if (dayjs(startFreqMDate).isBefore(this.endDate)) {
              rptDatList.push(dayjs(startFreqMDate).add(i, 'M').format('YYYYMMDD'))
            }
          }
        }
      } else if (this.selectFreq === 'Q') {
        const startFreqQDate = dayjs(this.startDate).endOf('quarter')
        for(let i = 0; i < 29; i++) {
          const rptDat = dayjs(startFreqQDate).add(i, 'quarter').format('YYYYMMDD')
          rptDatList.push(rptDat)
          if (dayjs(rptDat).isAfter(this.endDate, 'day')) {
            break
          }
        }
        rptDatList.pop()
      } else if (this.selectFreq === 'S') {
        let startDateS = '0630'
        if (dayjs(this.startDate).month() >= 6 && dayjs(this.startDate).month() < 12) {
          startDateS = '1231'
        }
        const startFreqSDate = this.startDate.substring(0, 4) + startDateS
        for(let i = 0; i < 29; i++) {
          const rptDat = dayjs(startFreqSDate).add(_.multiply(i, 2), 'quarter').endOf('month').format('YYYYMMDD') // dayjs add 6个月 || 2个季度，不会自动从月末开始
          rptDatList.push(rptDat)
          if (dayjs(rptDat).isAfter(this.endDate, 'day')) {
            break
          }
        }
        rptDatList.pop()
      } else if (this.selectFreq === 'Y') {
        const startFreqYDate = dayjs(this.startDate).endOf('year')
        for(let i = 0; i < 29; i++) {
          const rptDat = dayjs(startFreqYDate).add(i, 'year').format('YYYYMMDD')
          rptDatList.push(rptDat)
          if (dayjs(rptDat).isAfter(this.endDate, 'day')) {
            break
          }
        }
        rptDatList.pop()
      }
      console.log('rptDatList', rptDatList)
    }
  }
}
</script>