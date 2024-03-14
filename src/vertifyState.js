import { LitElement, html } from 'lit'

import install from '@twind/with-web-components'
import config from '../twind.config'

const withTwind = install(config)

class VerifyStateComponent extends withTwind(LitElement) {

    static properties = {
        state: { type: Boolean },
    };

    get customizeStyle() {
        return html``;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <style>
            ${this.customizeStyle} 
            </style>
            <div class="relative">
                <div class="absolute top-[50%] right-[10px] translate-y-[-50%]">
                    <span class="text-[#56C7BB] ${this.state ? 'block' : 'hidden'}">
                        <i class="fa-solid fa-check bg-[#56C7BB] text-white px-[3px] py-[2px] bg-[#56C7BB] rounded-full"></i>
                        <p class="inline-block">已認證</p>
                    </span>
                    <span class="text-[#EC7E7E] ${this.state ? 'hidden' : 'block'}">尚未認證</span>
                </div>
                <slot></slot>
            </div>
            `;
    }

}

customElements.define('wb-verify-state', VerifyStateComponent);


