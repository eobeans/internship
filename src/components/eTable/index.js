/*
 * @Autor: eobeans
 * @Date: 2021-06-06 17:48:22
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 19:15:36
 * @Version: 0.1.0
 * @Description: 当需要作为插件时，引用这个
 */
import ETable from './e-table.js'

const components = [ETable]

const install = function (Vue) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ETable
}
