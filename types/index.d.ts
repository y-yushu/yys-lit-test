// 定义自定义事件映射
interface MyCounterEventMap extends HTMLElementEventMap {
  "count-changed": CustomEvent<number>;
}

// 声明 MyCounter 类
export declare class MyCounter extends HTMLElement {
  count: number;

  // 保留标准的 addEventListener 签名，并通过事件映射支持自定义事件
  addEventListener<K extends keyof MyCounterEventMap>(
    type: K,
    listener: (this: this, ev: MyCounterEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  // 可选：如果需要 removeEventListener，也要声明
  removeEventListener<K extends keyof MyCounterEventMap>(
    type: K,
    listener: (this: this, ev: MyCounterEventMap[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}
