/*
 * @Autor: eobeans
 * @Date: 2021-06-06 17:57:04
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 17:57:05
 * @Version: 0.1.0
 * @Description: 
 */
export default {
  props: {
    value_: [String, Number],
    column: Object,
    row: Object,
    columnObj: Object,
  },
  data() {
    return {
      value: this.value_,
    };
  },
};
