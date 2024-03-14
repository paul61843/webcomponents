import { LitElement, html } from 'lit';

import install from '@twind/with-web-components';
import config from '../../../twind.config';

const withTwind = install(config);

class CardComponent extends withTwind(LitElement) {

    static properties = {
        loading: { type: Boolean },
    };

    get customizeStyle() {
        return html``;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <style>
            ${this.customizeStyle}
            </style>
            <div class="bg-white rounded-2xl w-full h-fit" style="box-shadow: 0px 3px 6px #00000029" >
                <div class="px-4 md:px-11 py-4 border-b-[0.5px] border-[#D7D7D7] border-solid">
                    <slot name="card-title">卡片標題</slot>
                </div>
                <div class="px-4 md:px-[44px] lg:px-[80px]">
                    <div class="pt-4 md:pt-[40px] pb-8">
                        <slot name="card-hint">卡片提示訊息</slot>
                    </div>
                    <slot name="card-content">卡片內容</slot>
                </div>
            </div>
            `;
    }

}

customElements.define('wb-card', CardComponent);
