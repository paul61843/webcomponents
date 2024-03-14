import { LitElement, html } from 'lit';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class AlertComponent extends withTwind(LitElement) {

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
            <div class="bg-[#FFF6DA] rounded-lg">
                <i class="fa-solid fa-lightbulb"></i>
                <slot name="alert-content"></slot>
            </div>
            `;
    }

}

customElements.define('wb-alert', AlertComponent);
