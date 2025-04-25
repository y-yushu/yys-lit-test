import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import inlinecss from './index.css?inline'

@customElement('my-counter')
export default class MyCounter extends LitElement {
  static styles = [
    unsafeCSS(inlinecss),
    css`
      /* :host {
        color: var(--cu-text-color, black);
      } */
    `
  ]

  @property({ type: Number, attribute: 'start-value' })
  startValue = 0

  @state()
  count = 0

  connectedCallback() {
    super.connectedCallback()
    this.count = this.startValue
    // 监听 child-register 事件
    this.addEventListener('child-register', this._handleChildRegister)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('child-register', this._handleChildRegister)
  }

  private _handleChildRegister(e: CustomEvent) {
    const feature = e.detail.feature
    console.log(`子组件注册，功能：${feature}`)
    e.detail.apply(this)
  }

  _increment() {
    this.count++
    this._dispatchCountChange()
  }

  private _decrement() {
    this.count--
    this._dispatchCountChange()
  }

  _dispatchCountChange() {
    const event = new CustomEvent('count-changed', {
      detail: { count: this.count },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(event)
  }

  render() {
    return html`
      <div class="flex min-h-28 items-center justify-center space-x-0.5 rounded-lg border border-solid border-gray-300 p-4">
        <button class="w-8 border border-solid border-gray-300 bg-gray-50 px-2 py-1 active:bg-gray-200" @click=${this._decrement}>-</button>
        <span class="min-w-8 text-center text-xl font-bold">${this.count}</span>
        <button class="w-8 border border-solid border-gray-300 bg-gray-50 px-2 py-1" @click=${this._increment}>+</button>
      </div>
      <slot></slot>
    `
  }

  updated() {
    console.log('触发更新')
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
