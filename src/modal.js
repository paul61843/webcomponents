import { LitElement, html } from 'lit';

import install from '@twind/with-web-components';
import config from '../twind.config';

const withTwind = install(config);

class ModalComponent extends withTwind(LitElement) {

    static properties = {
        showModal: { type: Boolean },
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
            <div class="${this.showModal ? 'block' : 'hidden'}  fixed z-[9000] inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="flex relative items-end justify-center min-h-screen pt-4 px-4 pb-20 sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    <div class="bg-white rounded-[20px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <slot name="modal-content"></slot>
                    </div>
                </div>
            </div>
            `;
    }

}

customElements.define('wb-modal', ModalComponent);
