import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import tailwindcss from './index.css?inline'
// import highlightcss from 'highlight.js/styles/atom-one-dark.css?inline'

@customElement('my-counter')
export default class MyCounter extends LitElement {
  static styles = [unsafeCSS(tailwindcss), css``]

  @property({ type: String })
  content = ''

  @state()
  count = 0

  renderFunction = {
    renderH1: (val: string) => {
      return html`<div class="bg-gray-700 p-4 text-white">${val}</div>`
    }
  }

  connectedCallback() {
    super.connectedCallback()
    // 监听 child-register 事件
    this.addEventListener('child-register', this._handleChildRegister)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('child-register', this._handleChildRegister)
  }

  private _handleChildRegister(e: CustomEvent) {
    const feature = e.detail.feature
    console.log('子组件注册了一个功能:', feature)
    const styles = e.detail.styles
    if (styles) {
      const styleElement = document.createElement('style')
      styleElement.textContent = styles
      this.shadowRoot?.appendChild(styleElement)
    }
    e.detail.apply(this)
  }

  render() {
    return html`
      <div class="min-h-28 p-4">${this.renderFunction.renderH1(this.content)}</div>
      <slot></slot>
    `
  }

  updated() {
    // console.log('触发更新')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-counter': MyCounter
  }
  interface HTMLElementEventMap {
    'count-changed': CustomEvent<{ count: number }>
    'child-register': CustomEvent<{ feature: string }>
  }
}
