/*
 * @Autor: eobeans
 * @Date: 2021-06-06 17:48:22
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 18:18:30
 * @Version: 0.1.0
 * @Description: 
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