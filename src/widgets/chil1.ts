import { LitElement, html, css } from 'lit'
import MyCounter from '../my-counter'

export default class MyChil1 extends LitElement {
  static styles = css``

  connectedCallback() {
    super.connectedCallback()
    console.log('触发connectedCallback')
    // 触发事件通知主组件
    this.dispatchEvent(
      new CustomEvent('child-register', {
        detail: {
          apply: (instance: MyCounter) => {
            console.log('123123', instance)
            instance._increment = () => {
              instance.count += 2
              instance._dispatchCountChange()
            }
          },
          feature: 'Child 1 Feature: Add Green Border'
        },
        bubbles: true,
        composed: true
      })
    )
  }

  render() {
    return html``
  }

  // 暴露一个静态方法用于手动注册组件
  static register() {
    if (!customElements.get('my-chil-1')) {
      customElements.define('my-chil-1', MyChil1)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-chil-1': MyChil1
  }
}
