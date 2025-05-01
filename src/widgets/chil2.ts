import { LitElement, css, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { customElement } from 'lit/decorators.js'
import Markdown from 'markdown-it'
import MyCounter from '../my-counter'

@customElement('my-chil-2')
export default class MyChil2 extends LitElement {
  static styles = css``

  md: Markdown

  constructor() {
    super()
    this.md = new Markdown()
  }

  connectedCallback() {
    super.connectedCallback()
    // 触发事件通知主组件
    this.dispatchEvent(
      new CustomEvent('child-register', {
        detail: {
          apply: (instance: MyCounter) => {
            instance.renderFunction.renderH1 = (val: string) => {
              const _html = this.md.render(val)
              return html`<div class="bg-gray-700 p-4 text-white">${unsafeHTML(_html)}</div>`
            }
          },
          feature: '改变背景颜色为红色'
        },
        bubbles: true,
        composed: true
      })
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-chil-2': MyChil2
  }
}
