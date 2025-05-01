import { LitElement } from 'lit';
export default class MyCounter extends LitElement {
    static styles: import("lit").CSSResult[];
    content: string;
    count: number;
    renderFunction: {
        renderH1: (val: string) => import("lit").TemplateResult<1>;
    };
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleChildRegister;
    render(): import("lit").TemplateResult<1>;
    updated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-counter': MyCounter;
    }
    interface HTMLElementEventMap {
        'count-changed': CustomEvent<{
            count: number;
        }>;
        'child-register': CustomEvent<{
            feature: string;
        }>;
    }
}
