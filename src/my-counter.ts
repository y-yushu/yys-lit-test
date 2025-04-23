import { LitElement, html, css, unsafeCSS } from 'lit'
import { property, state } from 'lit/decorators.js'
import inlinecss from './index.css?inline'

export default class MyCounter extends LitElement {
  static styles = [
    unsafeCSS(inlinecss),
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 8px;
        font-family: sans-serif;
        background-color: var(--my-counter-background, white);
      }
      button {
        padding: 5px 10px;
        font-size: 1em;
        cursor: pointer;
        border: 1px solid var(--my-counter-button-border-color, #ddd);
        background-color: var(--my-counter-button-background, #f8f8f8);
        color: var(--my-counter-button-color, blue);
        border-radius: 4px;
      }
      button:active {
        background-color: #eee;
      }
      span {
        min-width: 30px;
        text-align: center;
        font-size: 1.2em;
        font-weight: bold;
        color: var(--my-counter-text-color, black);
      }
      slot {
        display: block;
        margin-top: 10px;
      }
    `
  ]

  @property({ type: Number, attribute: 'start-value' })
  startValue = 0

  @state()
  count = 0

  @state()
  private _hasChild = false // 跟踪是否有子组件

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
    this._hasChild = true // 标记子组件存在
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
      <div>
        <button @click=${this._decrement} aria-label="Decrement count">-</button>
        <span aria-live="polite">${this.count}</span>
        <button @click=${this._increment} aria-label="Increment count">+</button>
      </div>
      <!-- 支持子组件渲染 -->
      <slot></slot>
    `
  }

  // 暴露一个静态方法用于手动注册组件
  static register() {
    if (!customElements.get('my-counter')) {
      customElements.define('my-counter', MyCounter)
    }
  }

  // 动态更新 has-child 属性
  updated() {
    if (this._hasChild) {
      this.setAttribute('has-child', '')
    } else {
      this.removeAttribute('has-child')
    }
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
