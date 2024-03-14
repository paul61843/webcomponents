import { LitElement, html } from 'lit';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class SimpleCardComponent extends withTwind(LitElement) {

    static properties = {
        loading: { type: Boolean },
        roundedSize: { type: String },
    };

    get customizeStyle() {
        return html``;
    }

    constructor() {
        super();
        this.roundedSize = 'rounded-2xl';
    }

    render() {
        return html`
            <style>
            ${this.customizeStyle}
            </style>
            <div class="h-full ${this.roundedSize} bg-white w-full" style="box-shadow: 0px 1px 10px #00000021; break-inside: avoid;">
                <slot name="card-header"></slot>
                <slot name="card-content"></slot>
            </div>
            `;
    }

}

customElements.define('wb-simple-card', SimpleCardComponent);
