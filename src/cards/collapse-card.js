import { LitElement, html, css } from 'lit';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class CollapseCardComponent extends withTwind(LitElement) {

    static properties = {
        roundedSize: { type: String },
        collapse: { type: Boolean },
    };

    get customizeStyle() {
        return css`
            @media print {
                .fa-solid
                {
                    display: none !important
                }
            }
        `;
    }

    constructor() {
        super();
        this.roundedSize = 'rounded-2xl';
        this.collapse = true;
    }

    changeCollapse() {
        this.collapse = !this.collapse;
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            <style>
                ${this.customizeStyle}
            </style>
            <div class="relative h-full ${this.roundedSize} bg-white w-full"
                style="box-shadow: 0px 1px 10px #00000021; break-inside: avoid;;"
            >
                <div class="flex items-center justify-between ${this.collapse ? 'border-b-[0.5px] border-[#D7D7D7] border-solid' : ''}">
                    <slot name="card-title">卡片標題</slot>
                    <i class="${this.collapse ? 'inline' : 'hidden'} md:hidden mr-[24px] fa-solid fa-angle-up text-[#9A9A9A]" @click=${this.changeCollapse}></i>
                    <i class="${this.collapse ? 'hidden' : 'inline'} md:hidden mr-[24px] fa-solid fa-angle-down text-[#9A9A9A]" @click=${this.changeCollapse}></i>
                </div>
                <div id="card-content" class="transition-all ease-in delay-[50ms] ${this.collapse ? 'block' : 'hidden'}">
                    <slot name="card-content"></slot>
                </div>
            </div>
            `;
    }

}

customElements.define('wb-collapse-card', CollapseCardComponent);
