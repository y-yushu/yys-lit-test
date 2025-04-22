import { LitElement } from "lit";
export default class MyChil1 extends LitElement {
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    static register(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "my-chil-1": MyChil1;
    }
}
