import { LitElement, html } from 'lit'

import * as Croppie from 'croppie';

import install from '@twind/with-web-components'
import config from '../twind.config'

const withTwind = install(config)

class CroppieComponent extends withTwind(LitElement) {

    // 儲存 croppie 實體
    croppie;

    static properties = {
        imgUrl: { type: String },
        options: { type: Object },
        coppieInstance: { type: Object },
    };

    get customizeStyle() {
        return html``;
    }

    defaultOptions = {
        viewport: { width: 150, height: 150 },
        boundary: { width: 250, height: 250 },
        showZoomer: true,
        enableOrientation: true
    }


    constructor() {
        super();
    }

    firstUpdated() {
        const options = this.options || this.defaultOptions;
        const croppieElem = this.renderRoot.getElementById('croppie-content');

        // FIX 解決 build 發生 Croppie is not constructor 的問題
        if (Croppie.default) {
            this.croppie = new Croppie.default(croppieElem, options);
        } else {
            this.croppie = new Croppie(croppieElem, options);
        }
    }

    updated(changedProperties) {
        setTimeout(() => {
            this.croppie.bind({
                url: this.imgUrl,
            });
        }, 0);
    }

    uploadImage() {
        const options = {
            detail: { croppieInstance: this.croppie},
            bubbles: true,
            composed: true,
          };
        this.dispatchEvent(new CustomEvent('uploadImage', options));
    }

    handelCancel() {
        const options = {
            detail: {},
            bubbles: true,
            composed: true,
            };
        this.dispatchEvent(new CustomEvent('close', options));
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/croppie/2.6.5/croppie.min.css" />
            <style>
            ${this.customizeStyle} 
            </style>
            <div>
                <div id="croppie-content"></div>
                <div class="flex place-content-around">
                    <button class="px-4 py-2" type="button" @click="${ this.uploadImage }">確定</button>
                    <button class="px-4 py-2" type="button" @click="${ this.handelCancel }">取消</button>
                </div>
            </div>
        `;
    }

}

customElements.define('wb-croppie', CroppieComponent);
