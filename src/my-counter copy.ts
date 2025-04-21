import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("my-counter")
export class MyCounter extends LitElement {
  static styles = css`
    .counter {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: Arial, sans-serif;
    }
    button {
      padding: 5px 10px;
      cursor: pointer;
    }
    span {
      font-size: 16px;
    }
  `;

  @property({ type: Number })
  count = 0;

  increment() {
    this.count++;
    this.dispatchEvent(
      new CustomEvent("count-changed", { detail: this.count })
    );
  }

  decrement() {
    this.count--;
    this.dispatchEvent(
      new CustomEvent("count-changed", { detail: this.count })
    );
  }

  render() {
    return html`
      <div class="counter">
        <button @click=${this.decrement}>-</button>
        <span>Count: ${this.count}</span>
        <button @click=${this.increment}>+</button>
      </div>
    `;
  }
}
