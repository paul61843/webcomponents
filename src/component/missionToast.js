import { LitElement, html } from 'lit';

import { choose } from 'lit/directives/choose.js';

import install from '@twind/with-web-components';
import config from '../../twind.config';


const withTwind = install(config);

class ToastComponent extends withTwind(LitElement) {

    static properties = {
        show: { type: Boolean },
        message: { type: String },
        type: { type: String },
        closeTimeout: { type: Number },
        missionName: { type: String },
        missionPoint: { type: Number },
        iconType: { type: String },
        confirmText: { type: String }
    };

    get customizeStyle() {
        return html``;
    }

    constructor() {
        super();
    }



    coinIcon() {
        return html`
        <?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1"></path>
                    <path d="M12 6v2m0 8v2"></path>
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

    failIcon() {
        return html`
            <img src="/images/exchange/status_fail.png" class="m-auto ">
        `;
    }

    shortageIcon() {
        return html`
            <img src="/images/exchange/status_shortage.png" class="m-auto ">
        `;
    }

    successIcon() {
        return html`
        <img src="/images/exchange/status_success.png" class="m-auto ">
        `;
    }

    birthdayIcon() {
        return html`
            <img src="/images/exchange/mission_birthday.png" class="m-auto ">
        `;
    }

    mission_SignIn_Success() {
        return html`
            <img src="/images/exchange/mission_signIn_success.png" class="m-auto ">
        `;
    }

    disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // 恢復滾動
    enableScroll() {
        document.body.style.overflow = 'auto';
    }


    dispatchCloseEvent() {
        const options = {
            detail: {},
            bubbles: true,
            composed: true,
        };
        if (this.confirmText === '前往審查') {
            location.href = '/exchange/exchange-center/exchange-record';
        }
        this.dispatchEvent(new CustomEvent('onClick', options));
    }

    closeToast() {
        this.dispatchCloseEvent();
    }


    updated() {
        if (this.show) {
            if (this.type == "message") {
                setTimeout(() => {
                    this.dispatchCloseEvent();
                }, Number(this.closeTimeout));
            }
        }
    }

    renderDialog() {
        return html`
            <div class="flex-1 bg-[#ffffff] rounded-[20px] md:max-w-[504px] m-[5px] md:m-auto md:w-[504px] h-[367px] p-[16px] flex items-center align-center justify-center">
                <div class="flex flex-col items-center w-full h-[100%]">
                    <div class="w-full h-[50%] relative">
                        <div class="absolute bottom-0 w-full">
                        ${choose(
            this.iconType,
            [
                ['birthday', () => this.birthdayIcon()],
                ['fail', () => this.failIcon()],
                ['success', () => this.successIcon()],
                ['shortage', () => this.shortageIcon()]
            ],
            () => this.mission_SignIn_Success()
        )}
                        </div>
                    </div>
                    <div class="flex flex-col items-center align-center w-full h-[50%] md:px-[64px] justify-around">
                        <div class="flex items-center align-center text-[23px] font-bold" >
                            <p class="break-all">${this.missionName}</p>
                        </div>
                        <p class="break-all">${this.message}</p>
                        <div class="flex items-center align-center gap-[6px] ${this.missionPoint ? 'flex' : 'hidden'}">
                            <div class="w-[22px] h-[22px] flex items-center">
                                <img src="/images/exchange/gcoin.png" />
                            </div>
                            <p class=" text-[#FA9E28]">${this.missionPoint}</p>
                        </div>
                        <button class="text-[#FFFFFF] p-[10px] w-full  bg-[#56c7bb] rounded-[6px]" type="button" @click=${this.closeToast}>${this.confirmText}</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderMessage() {
        return html`
            <div class="flex-1 px-[16px] py-[16px] max-w-[300px] rounded-[14px] m-auto md:mr-[6%] flex items-center align-center bg-[#FFF9E1] relative message-toast">
                <div class="w-[45px] h-[45px] flex items-center left-[-23px] absolute">
                    <img src="/images/exchange/gcoin.png" />
                </div>
                <div class="flex justify-between w-full ml-[20px]">
                    <div class="flex items-center align-center" >
                        <p class="break-all">${this.message}</p>
                        <p class="break-all">${this.missionName}</p>
                    </div>
                    <div class="flex items-center align-center text-[#FA9E28]">
                        <p class="">+${this.missionPoint}</p>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <style>
                ${this.customizeStyle}
                .center-container {
                    position: fixed;
                    top: 50%; /* 垂直居中 */
                    left: 50%; /* 水平居中 */
                    transform: translate(-50%, -50%); /* 使用transform将元素居中 */
                }

                /* 遮罩层样式 */
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
                    z-index: 1000; /* 设置一个较高的 z-index */
                }

                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }

                .message-toast {
                    animation: slideInFromRight 0.3s ease-out;
                }
            </style>

            <div class="overlay ${this.type === "message" ? 'hidden' : ''}" ?hidden=${!this.show}></div>

            <div class="${this.show ? 'flex' : 'hidden'} z-[2000]
                w-full items-center
                ${this.type === "message" ? "fixed top-[20%] md:top-[20%]" : "center-container"} text-base">
                ${choose(this.type, [['message', () => this.renderMessage()], ['dialog', () => this.renderDialog()]])}
                </div>
            </div>
            `;
    }

}

customElements.define('wb-mission-toast', ToastComponent);
