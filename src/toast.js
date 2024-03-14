import { LitElement, html } from 'lit';

import { choose } from 'lit/directives/choose.js';

import install from '@twind/with-web-components';
import config from '../twind.config';


const withTwind = install(config);

class ToastComponent extends withTwind(LitElement) {

    static properties = {
        show: { type: Boolean },
        message: { type: String },
        type: { type: String },
        closeTimeout: { type: Number },
    };

    get customizeStyle() {
        return html``;
    }

    constructor() {
        super();
    }

    successIcon() {
        return html`
            <?xml version="1.0" encoding="UTF-8"?>
            <svg id="_圖層_2" data-name="圖層 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40.02">
            <defs>
                <style>
                .cls-1 {
                    fill: #56c7bb;
                }
                </style>
            </defs>
            <g id="_圖層_1-2" data-name="圖層 1">
                <path class="cls-1" d="m19.95,0C8.9.01,0,8.99,0,20.12c0,10.86,9.02,19.9,19.82,19.89,11.2,0,20.18-8.9,20.18-19.99C39.99,8.94,31.03-.01,19.95,0Zm10.74,13.74c-.09.37-.31.75-.57,1.02-2.71,2.74-5.44,5.46-8.16,8.18-1.45,1.45-2.9,2.91-4.35,4.36-.83.83-1.69.77-2.43-.14-1.85-2.31-3.7-4.62-5.55-6.93-.59-.74-.55-1.6.12-2.13.66-.53,1.51-.38,2.11.36,1.48,1.85,2.95,3.69,4.43,5.54.07.09.15.18.26.31,2.01-2.02,4-4,5.99-5.99,1.89-1.89,3.78-3.79,5.68-5.68.51-.51,1.13-.61,1.71-.31.53.27.89.85.75,1.44Z"/>
            </g>
            </svg>
        `;
    }

    infoIcon() {
        return html`
            <?xml version="1.0" encoding="UTF-8"?>
            <svg id="_圖層_2" data-name="圖層 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <defs>
                <style>
                .cls-1 {
                    fill: #4195d4;
                }
                </style>
            </defs>
            <g id="_圖層_1-2" data-name="圖層 1">
                <path class="cls-1" d="m20,0C8.95,0,0,8.95,0,20s8.95,20,20,20,20-8.95,20-20S31.05,0,20,0Zm2.67,28.94c0,1.47-1.19,2.67-2.67,2.67s-2.67-1.19-2.67-2.67v-10.64c0-1.47,1.19-2.67,2.67-2.67s2.67,1.19,2.67,2.67v10.64Zm-2.67-15.21c-1.47,0-2.67-1.19-2.67-2.67s1.19-2.67,2.67-2.67,2.67,1.19,2.67,2.67-1.19,2.67-2.67,2.67Z"/>
            </g>
            </svg>
        `;
    }

    warningIcon() {
        return html`
            <?xml version="1.0" encoding="UTF-8"?>
            <svg id="_圖層_2" data-name="圖層 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
            <defs>
                <style>
                .cls-1 {
                    fill: #bcaf86;
                }

                .cls-2 {
                    fill: none;
                }
                </style>
            </defs>
            <g id="_圖層_1-2" data-name="圖層 1">
                <g>
                <path class="cls-1" d="m43.76,33.53c-.34-1.17-1.05-2.2-1.64-3.27-.99-1.79-2.04-3.55-3.06-5.32-1.68-2.89-3.37-5.77-5.04-8.67-1.11-1.92-2.18-3.85-3.29-5.77-1.11-1.92-2.18-3.85-3.37-5.71-.93-1.45-2.34-2.26-4.04-2.6-1.53-.31-2.98-.11-4.35.58-1.22.61-2.09,1.6-2.77,2.78-1.32,2.31-2.67,4.6-4,6.9-.99,1.72-1.96,3.46-2.96,5.19-1.56,2.7-3.15,5.38-4.71,8.08-1.31,2.28-2.61,4.57-3.87,6.87-.69,1.26-.78,2.65-.51,4.04.27,1.42.97,2.63,2.04,3.62.91.84,1.99,1.37,3.2,1.59.47.09.96.1,1.44.1,10.13,0,20.26,0,30.38.01,1.95,0,3.57-.68,4.93-2.02.92-.91,1.44-2.06,1.76-3.31.16-.62.16-2.09-.13-3.09Zm-21.77,2.48c-1.3.02-2.42-1.12-2.44-2.41-.02-1.17.97-2.57,2.66-2.44.9.07,2.33,1.04,2.14,2.42,0,1.43-.97,2.4-2.37,2.42Zm2.45-19.39c-.06,1.16-.11,2.32-.17,3.48-.05.93-.12,1.86-.17,2.79-.09,1.64-.15,3.28-.27,4.92-.06.88-1.02,1.53-1.7,1.59-1.24.1-1.99-.97-2.01-2.03-.02-1.24-.16-2.48-.24-3.72-.04-.58-.06-1.16-.09-1.74-.03-.79-.03-1.59-.09-2.39-.06-.97-.21-1.93-.25-2.9-.05-1.17.8-2.8,2.38-2.83,1.19-.02,2.33.74,2.53,1.9.05.3.07.62.1.92,0,0-.02,0-.03,0Z"/>
                <rect class="cls-2" width="44" height="44"/>
                </g>
            </g>
            </svg>
        `;
    }

    errorIcon() {
        return html`
            <?xml version="1.0" encoding="UTF-8"?>
            <svg id="_圖層_2" data-name="圖層 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40.02">
            <defs>
                <style>
                .cls-1 {
                    fill: #ed7676;
                }
                </style>
            </defs>
            <g id="_圖層_1-2" data-name="圖層 1">
                <path class="cls-1" d="m19.06,0c6.21,0,10.92,1.85,14.82,5.58,3.49,3.34,5.53,7.47,6,12.29.59,6.01-1.15,11.31-5.25,15.75-3.46,3.74-7.8,5.84-12.86,6.3-5.7.52-10.73-1.19-15.01-4.96C2.84,31.52.61,27.13.1,21.95c-.56-5.83,1.18-10.96,5.06-15.37C8.9,2.33,14.65-.1,19.06,0Zm3.33,19.97c.23-.15.37-.21.47-.31,1.62-1.62,3.24-3.23,4.85-4.85.44-.45.63-.95.52-1.61-.13-.71-.54-1.16-1.17-1.37-.67-.23-1.34-.14-1.88.4-1.63,1.63-3.26,3.25-4.88,4.89-.25.26-.39.25-.64,0-1.61-1.63-3.23-3.24-4.85-4.86-.56-.56-1.43-.72-2.1-.34-1.1.61-1.33,2.03-.41,2.94,1.6,1.61,3.21,3.22,4.82,4.83.1.1.19.2.31.33-.12.11-.23.2-.33.3-1.59,1.59-3.18,3.17-4.76,4.77-.35.36-.58.79-.57,1.29,0,.76.39,1.34,1.04,1.68.81.42,1.51.15,2.04-.38,1.62-1.6,3.23-3.21,4.82-4.83.25-.26.39-.24.64,0,1.61,1.63,3.23,3.24,4.85,4.86.77.78,1.84.72,2.6,0,.7-.66.71-1.82-.04-2.56-1.63-1.61-3.24-3.24-4.86-4.85-.1-.1-.23-.16-.47-.33Z"/>
            </g>
            </svg>
        `;
    }

    bgColor() {
        switch (this.type) {
            case 'success':
                return 'bg-[#D6F8F5]';
            case 'info':
                return 'bg-[#DAEFFF]';
            case 'warning':
                return 'bg-[#FFF6DA]';
            case 'error':
                return 'bg-[#FFCEC8]';
            default:
                return 'bg-[#D6F8F5]';
        }
    }

    dispatchCloseEvent() {
        const options = {
            detail: {},
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent('onClick', options));
    }

    closeToast() {
        this.dispatchCloseEvent();
    }


    updated() {
        if (this.show) {
            setTimeout(() => {
                this.dispatchCloseEvent();
            }, Number(this.closeTimeout));
        }
    }

    render() {
        return html`
            <style>
                ${this.customizeStyle}
            </style>
            <div class="${this.show ? 'flex' : 'hidden'} ${this.bgColor()} rounded-[10px] fixed top-[60px] left-[50%] z-[2000]
                min-w-[300px] max-w-[350px] md:max-w-[450px] p-[16px] items-center translate-x-[-50%]
                shadow-[0px_3px_20px_0px_#00000021]">
                <div class="w-[20px] h-[20px]">
                    ${choose(this.type, [
            ['success', () => this.successIcon()],
            ['info', () => this.infoIcon()],
            ['warning', () => this.warningIcon()],
            ['error', () => this.errorIcon()],
        ],
            () => this.successIcon())}
                </div>
                <div class="flex-1 px-[16px]">
                    <p class="break-all">${this.message}</p>
                </div>
                <button class="text-[#B7C9C7]" type="button" @click=${this.closeToast}>
                    X
                </button>
            </div>
            `;
    }

}

customElements.define('wb-toast', ToastComponent);
