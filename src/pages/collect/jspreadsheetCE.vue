<!--
 * @Autor: eobeans
 * @Date: 2021-08-15 17:14:35
 * @LastEditors: eobeans
 * @LastEditTime: 2021-08-15 17:23:21
 * @Version: 0.1.0
 * @Description: 
-->
<template>
  <div>
    <div id='my-spreadsheet'></div>
  </div>
</template>
<script>
export default {
  name: 'jspreadsheetCE',
  data() {
    return {
      data: [
        ['Mazda', 2001, 2000],
        ['Pegeout', 2010, 5000],
        ['Honda Fit', 2009, 3000],
        ['Honda CRV', 2010, 6000],
      ]
    }
  },
  mounted() {
    jspreadsheet(document.getElementById('my-spreadsheet'), {
      data: this.data,
      columns:[
        { title:'Model', width:300 },
        { title:'Price', width:80 },
        { title:'Model', width:100 }
      ]
    })
  }
  
}
</script>