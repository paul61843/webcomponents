import { LitElement, css, html } from 'lit';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class FooterComponent extends withTwind(LitElement) {

    static properties = {
        hostName: { type: String },
    };

    get customizeStyle() {
        return html`
        <style>
            @media (min-width: 768px) {
                .row {
                  /* Desktop-specific styles */
                }
                .mobile{
                    display:none;
                }
            }

              /* Styles for mobile screens (767px and below) */
            @media (max-width: 767px) {
                .desktop{
                    display:none !important;
                }
                .mobile {
                  display: block; /* Show elements with class "mobile" on mobile */
                }
                .footer .logo{
                    display:none !important;
                }
            }
        </style>
        `;
    }

    static styles = css`

    `;

    constructor() {
        super();
    }

    render() {
        return html`
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            </head>
            ${this.customizeStyle}
            <div class="row footer bg-[#557B77] text-white">
                <div class="md:flex m-auto max-w-7xl mx-auto md:pl-8 py-[40px] md:py-[54px]">
                    <div class="flex flex-1 pl-[20px]">
                        <div class="flex-1">
                            <div class="flex-1 mb-[34px] md:mb-10 logo">
                                <img class="w-[122px]" src="${this.hostName}/images/home/w101logo.png" alt="logo" />
                            </div>
                            <p class="pb-4"><a href="${this.hostName}/guest/about-us">關於我們</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/cooperation-proposal">合作提案</a></p>
                            <p class="pb-4 mobile"><a href="${this.hostName}/guest/common-problem">常見問題</a></p>
                            <div class="flex gap-6 pt-2 mobile">
                                <a target="_blank" href="https://www.instagram.com/w101.com.tw/"><img class="w-10" src="${this.hostName}/images/icon/footer_instagram.png" alt="instagram" /></a>
                                <a target="_blank" href="https://www.facebook.com/w101jobbank"><img class="w-10" src="${this.hostName}/images/icon/footer_facebook.png" alt="facebook" /></a>
                            </div>
                        </div>
                        <div class="flex-1 pl-[20px]">
                            <h4 class="mb-4 font-bold">求職服務</h4>
                            <p class="pb-4"><a
                                href="${this.hostName}/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=&&wh=&&re=&&el=&&fe=全職">全職</a>
                            </p>
                            <p class="pb-4"><a
                                href="${this.hostName}/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=&&wh=&&re=&&el=&&fe=高階">高階</a>
                            </p>
                            <p class="pb-4"><a
                                href="${this.hostName}/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=&&wh=&&re=&&el=&&fe=兼職">兼職</a>
                            </p>
                            <p><a
                                href="${this.hostName}/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=&&wh=&&re=&&el=&&fe=派遣">派遣</a>
                            </p>
                        </div>
                        <div class="flex-1 mobile">
                            <h4 class="mb-4 font-bold">會員條款</h4>
                            <!-- NOTE: 目前不需要 暫時註解 -->
                            <!-- <p class="pb-4"><a href="#">免責聲明</a></p> -->
                            <p class="pb-4"><a href="${this.hostName}/guest/terms-service">服務條款</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/privacy-policy">隱私權聲明</a></p>
                        </div>
                    </div>
                    <div class="flex flex-1 pl-[20px] mt-[40px] md:mt-0 desktop">
                        <div class="flex-1">
                            <h4 class="mb-4 font-bold">會員條款</h4>
                            <!-- NOTE: 目前不需要 暫時註解 -->
                            <!-- <p class="pb-4"><a href="#">免責聲明</a></p> -->
                            <p class="pb-4"><a href="${this.hostName}/guest/terms-service">服務條款</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/privacy-policy">隱私權聲明</a></p>
                        </div>
                        <div class="flex-1 pl-[20px]">
                            <h4 class="mb-4 font-bold">企業服務</h4>
                            <p class="pb-4 cursor-pointer"><a href="${this.hostName}/recruitment">企業刊登</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/cooperation-proposal">廣告合作</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/company-promote">優惠方案</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/contact-us">聯繫我們</a></p>
                            <p class="pb-4"><a href="${this.hostName}/guest/common-problem">常見問題</a></p>
                        </div>
                    </div>
                </div>
                <div class="border-t py-[29px]">
                    <div class="md:flex justify-between max-w-7xl m-auto pl-4 pr-4 md:pr-16 text-center">
                        <p class="mb-4 md:mb-0">© Copyright 2023 W101. ALL Right Reserved. 112.0</p>
                        <p>熱火數碼資訊股份有限公司</p>
                    </div>
                </div>
            </div>
            `;
    }

}

customElements.define('wb-footer', FooterComponent);