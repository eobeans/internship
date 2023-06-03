/*
 * @Autor: eobeans
 * @Date: 2021-06-06 17:51:18
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 17:51:19
 * @Version: 0.1.0
 * @Description: 
 */
import { hasOwn } from "../utils/index.js";

export default {
  methods: {
    closeFilterPanel(key) {
      if (hasOwn(this.filterPanels, key)) {
        this.filterPanels[key].doClose();
        return;
      }
      console.error(`${key} is not exist`);
    },

    clearFiltedColumn(key, callback = function () {}) {
      if (hasOwn(this.filtedList, key)) {
        this.$delete(this.filtedList, key);
        callback(true);
        return;
      }
      callback(false);
    },

    clearAllFiltedColumn() {
      this.filtedList = {};
    },

    cancelEdit() {
      this.editX = null;
      this.editY = null;
    },
  },
};
