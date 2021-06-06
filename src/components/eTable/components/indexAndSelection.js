/*
 * @Autor: eobeans
 * @Date: 2021-06-06 17:52:39
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 17:52:59
 * @Version: 0.1.0
 * @Description: 
 */
import { isObject } from "../utils/index.js";

export default function (h) {
  const _this = this;
  let indSel = [],
    config = _this.tableConfig;
  const indSelTemp = function (name, config) {
    let indSelattrs = {
      type: name,
      fixed: _this.hasLeftFixed || config[name].fixed || false,
    };
    if (isObject(config[name])) {
      indSelattrs = {
        ...config[name],
        ...indSelattrs,
      };
    }
    return h("el-table-column", {
      attrs: {
        ...indSelattrs,
      },
    });
  };
  
  if (config.index !== false) {
    indSel.push(indSelTemp("index", config));
  }
  if (config.selection !== false) {
    indSel.push(indSelTemp("selection", config));
  }
  return indSel;
}
