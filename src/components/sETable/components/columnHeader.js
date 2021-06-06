/*
 * @Autor: eobeans
 * @Date: 2021-06-06 20:54:44
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 21:25:53
 * @Version: 0.1.0
 * @Description: 
 */
export default function (props, h, col) {
  return (
    <span class='e-custom-header'>
      { col.label || col.prop }
    </span>
  )
}
