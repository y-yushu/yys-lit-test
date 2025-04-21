import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

// 子组件 1
@customElement("my-chil-1")
export class MyChil1 extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #e0ffe0;
      padding: 8px;
      margin: 5px 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // 触发事件通知主组件
    this.dispatchEvent(
      new CustomEvent("child-register", {
        detail: { feature: "Child 1 Feature: Add Green Border" },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<div>Child Component 1</div>`;
  }
}
