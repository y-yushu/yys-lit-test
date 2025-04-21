import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

// 主组件
@customElement('my-counter')
export class MyMainCom extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 2px solid #333;
      padding: 16px;
      border-radius: 8px;
    }
    .main-content {
      background-color: #f0f0f0;
      padding: 10px;
    }
    slot {
      display: block;
      margin-top: 10px;
    }
  `;

  @state()
  private childFeatures: string[] = [];

  // 监听子组件注册事件
  private handleChildRegister(e: CustomEvent) {
    const feature = e.detail.feature;
    if (!this.childFeatures.includes(feature)) {
      this.childFeatures = [...this.childFeatures, feature];
    }
  }

  render() {
    return html`
      <div class="main-content">
        <h2>Main Component</h2>
        <p>This is the main component's default rendering.</p>
        ${this.childFeatures.length > 0
          ? html`
              <h3>Loaded Child Features:</h3>
              <ul>
                ${this.childFeatures.map(
                  (feature) => html`<li>${feature}</li>`
                )}
              </ul>
            `
          : html`<p>No child components registered.</p>`}
      </div>
      <slot @child-register=${this.handleChildRegister}></slot>
    `;
  }
}