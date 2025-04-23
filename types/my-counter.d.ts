import { LitElement } from 'lit';
export default class MyCounter extends LitElement {
    static styles: import("lit").CSSResult[];
    startValue: number;
    count: number;
    private _hasChild;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleChildRegister;
    _increment(): void;
    private _decrement;
    _dispatchCountChange(): void;
    render(): import("lit").TemplateResult<1>;
    static register(): void;
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
