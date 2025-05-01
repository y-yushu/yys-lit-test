import { LitElement } from 'lit';
import Markdown from 'markdown-it';
export default class MyChil2 extends LitElement {
    static styles: import("lit").CSSResult;
    md: Markdown;
    constructor();
    connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-chil-2': MyChil2;
    }
}
