import { LitElement, html } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { customElement, state } from 'lit/decorators.js'
import hljs from 'highlight.js/lib/core'
import highlightcss from 'highlight.js/styles/atom-one-dark.css?inline'
import MyCounter from '../my-counter'

// 不执行任何语法高亮
import plaintext from 'highlight.js/lib/languages/plaintext'
hljs.registerLanguage('plaintext', plaintext)
// 默认语法支持
import './languages/bash'
import './languages/cpp'
import './languages/csharp'
import './languages/css'
import './languages/dart'
import './languages/go'
import './languages/java'
import './languages/javascript'
import './languages/json'
import './languages/kotlin'
import './languages/lua'
import './languages/markdown'
import './languages/perl'
import './languages/php'
import './languages/powershell'
import './languages/python'
import './languages/r'
import './languages/ruby'
import './languages/rust'
import './languages/scala'
import './languages/sql'
import './languages/swift'
import './languages/typescript'
import './languages/xml'
import './languages/yaml'
import { until } from 'lit/directives/until.js'

@customElement('my-chil-1')
export default class MyChil1 extends LitElement {
  @state()
  isComplete = false

  private waitForCompletion(): Promise<void> {
    return new Promise(resolve => {
      const checkStatus = () => {
        if (this.isComplete) {
          resolve()
        } else {
          setTimeout(checkStatus, 50)
        }
      }
      checkStatus()
    })
  }

  connectedCallback() {
    super.connectedCallback()
    // 触发事件通知主组件
    this.dispatchEvent(
      new CustomEvent('child-register', {
        detail: {
          apply: (instance: MyCounter) => {
            instance.renderFunction.renderH1 = (val: string) => {
              const lang = 'javascript'
              if (hljs.getLanguage(lang)) {
                console.log('支持的语言类型')
                const highlightedCode = hljs.highlight(val, { language: lang })?.value
                return html`<div class="bg-gray-500 p-4">
                  <pre class="hljs"><code class="language-${lang}">${unsafeHTML(highlightedCode)}</code></pre>
                </div>`
              } else {
                console.log('不支持的语言类型')
                const highlightedCode = hljs.highlight(val, { language: 'plaintext' })?.value
                return html`<div class="bg-gray-500 p-4">
                  <pre class="hljs"><code class="language-javascript">${unsafeHTML(highlightedCode)}</code></pre>
                </div>`
              }
            }
            instance.renderFunction.renderH1 = (val: string) => {
              return html`${until(
                this.waitForCompletion().then(() => {
                  const lang = 'javascript'
                  console.log('1111111111111111111')
                  if (hljs.getLanguage(lang)) {
                    console.log('支持的语言类型')
                    const highlightedCode = hljs.highlight(val, { language: lang })?.value
                    return html`<div class="bg-gray-500 p-4">
                      <pre class="hljs"><code class="language-${lang}">${unsafeHTML(highlightedCode)}</code></pre>
                    </div>`
                  } else {
                    console.log('不支持的语言类型')
                    const highlightedCode = hljs.highlight(val, { language: 'plaintext' })?.value
                    return html`<div class="bg-gray-500 p-4">
                      <pre class="hljs"><code class="language-javascript">${unsafeHTML(highlightedCode)}</code></pre>
                    </div>`
                  }
                }),
                () => {
                  console.log('222222222222222222222222')
                  const highlightedCode = hljs.highlight(val, { language: 'plaintext' })?.value
                  return html`<div class="bg-gray-500 p-4">
                    <pre class="hljs"><code class="language-javascript">${unsafeHTML(highlightedCode)}</code></pre>
                  </div>`
                }
              )}`
            }
          },
          feature: '改变背景颜色为绿色',
          styles: highlightcss
        },
        bubbles: true,
        composed: true
      })
    )
  }

  firstUpdated() {
    this.isComplete = true
  }

  render() {
    return html`<slot name="default-language">
        <languages-bash></languages-bash>
        <languages-cpp></languages-cpp>
        <languages-csharp></languages-csharp>
        <languages-css></languages-css>
        <languages-dart></languages-dart>
        <languages-go></languages-go>
        <languages-java></languages-java>
        <languages-javascript></languages-javascript>
        <languages-json></languages-json>
        <languages-kotlin></languages-kotlin>
        <languages-lua></languages-lua>
        <languages-markdown></languages-markdown>
        <languages-perl></languages-perl>
        <languages-php></languages-php>
        <languages-powershell></languages-powershell>
        <languages-python></languages-python>
        <languages-r></languages-r>
        <languages-ruby></languages-ruby>
        <languages-rust></languages-rust>
        <languages-scala></languages-scala>
        <languages-sql></languages-sql>
        <languages-swift></languages-swift>
        <languages-typescript></languages-typescript>
        <languages-xml></languages-xml>
        <languages-yaml></languages-yaml>
      </slot>
      <slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-chil-1': MyChil1
  }
}
