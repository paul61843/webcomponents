import { LitElement, html } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';
import { choose } from 'lit/directives/choose.js';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class HeaderComponent extends withTwind(LitElement) {

    desktopTemplate = ``;
    mobileTemplate = ``;

    static properties = {
        hostName: { type: String },
        S3Path: { type: String },

        // 使用者相關
        name: { type: String },
        gender: { type: String },
        id: { type: String },
        identity: { type: String },
        photo: { type: String },

        userLoginFn: { type: Function },
        companyLoginFn: { type: Function },

        showMoebileDropMenu: { type: Boolean },
        ShowMobileCompanyBtn: { type: Boolean },
    };

    get customizeStyle() {
        return html`
            <style>
            .dropdown {
                position: relative;
            }

            .dropdown-content {
                display: none;
                position: absolute;
            }

            .dropdown:hover .dropdown-content {
                display: block;
            }
            </style>
        `;
    }

    constructor() {
        super();
        this.showMoebileDropMenu = false;
        this.dataTime = new Date().getTime();
    }

    userHeadShotError($event) {
        const elem = $event.target;
        const gender = this.gender === 0 ? 'female' : 'male';
        elem.src = `${this.S3Path}user/default/${gender}.svg?v=${this.dataTime}`;
    }

    toggleMobleDorpMenu() {
        this.showMoebileDropMenu = !this.showMoebileDropMenu;
    }

    userLogout() {
        window.localStorage.removeItem('token');
        window.location = '/logout';
    }

    companyLogout() {
        window.localStorage.removeItem('token');
        window.location = '/logout';
    }

    adminLogout() {
        window.localStorage.removeItem('token');
        window.location = '/logout';
    }

    noIdentityTemplate() {
        return html`
            <!-- Desktop menu button -->
            <div class="flex">
                <a onclick="${this.companyLoginFn}"
                    class="${this.ShowMobileCompanyBtn ? 'inline-flex' : 'hidden'}
                        md:inline-flex border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] items-center px-2 mx-4 text-base font-bold cursor-pointer">
                    企業刊登
                </a>
                <a onclick="${this.userLoginFn}"
                    class="border-transparent text-white bg-[#56C7BB] rounded-lg inline-flex items-center p-2 text-base font-bold cursor-pointer">
                    求職會員
                </a>
            </div>

            <!-- Mobile menu button -->
            <div class="flex items-center md:hidden ml-4">
                <button id="mobile-btn" class="inline-flex items-center justify-center rounded-md text-gray-400"
                    aria-expanded="false"
                    @click="${this.toggleMobleDorpMenu}">

                <svg id="icon-hamburger" style=${styleMap({ display: this.showMoebileDropMenu ? 'none' : 'block' })} class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg id="icon-close" style=${styleMap({ display: this.showMoebileDropMenu ? 'block' : 'none' })} class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
        `;
    }

    noIdentityMobileTemplate() {
        return html`
            <div>
                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=6&&wh=&&re=&&el=&&fe=全職"
                    class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                    全職
                </a>
                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=6&&wh=&&re=&&el=&&fe=高階"
                    class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                    高階
                </a>
                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=6&&wh=&&re=&&el=&&fe=兼職"
                    class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                    兼職
                </a>
                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=6&&wh=&&re=&&el=&&fe=派遣"
                    class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                    派遣
                </a>
            </div>
        `;
    }

    userTemplate() {
        return html`
            <div class="md:flex-shrink-0 flex md:items-center">
                <div class="relative dropdown">
                    <div id="drop-btn">
                        <a href="#"
                            class="text-gray-800 hover:text-primary-hover inline-flex items-center p-1 text-base font-bold"
                            id="user-menu" aria-haspopup="true">
                            <div class="rounded-full mr-2">
                                <img class="w-8 h-8 object-contain" id="user-avatar"
                                    src="${this.S3Path}user/headshot/${this.photo}" alt="user-avatar"
                                    loading="lazy" />
                            </div>
                            <span class="text-[#5D5D5D]">
                                ${this.name}
                            </span>
                            <i class="pl-2 fa-solid fa-chevron-down text-[#9A9A9A]"></i>
                        </a>
                    </div>

                    <div id="drop-menu"
                        class="px-3 py-2 dropdown-content origin-top-right absolute right-0 mt-0 w-40 rounded-xl py-1 bg-white z-[100]"
                            style="box-shadow: 0px 3px 4px #00000029;" role="menu" aria-orientation="vertical"
                            aria-labelledby="user-menu">
                        <a href="${this.hostName}/user/index" class="block text-base font-bold text-gray-700 py-2" role="menuitem">
                            <i class="pr-2 fa-solid fa-user text-[#9A9A9A]"></i> 會員中心
                        </a>
                        <a href="${this.hostName}/user/my-resume" class="block text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-file text-[#9A9A9A]"></i> 我的履歷
                        </a>
                        <a href="${this.hostName}/user/message-notification" class="block text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-comment-dots text-[#9A9A9A]"></i> 訊息中心
                        </a>
                        <a href="${this.hostName}/user/application-record" class="block text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-briefcase text-[#9A9A9A]"></i> 應徵紀錄
                        </a>
                        <a href="${this.hostName}/user/favorites-job" class="block text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-heart text-[#9A9A9A]"></i> 我的收藏
                        </a>
                        <a href="${this.hostName}/user/edit-member" class="block text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-gear text-[#9A9A9A]"></i> 帳號設定
                        </a>
                        <a @click="${this.userLogout}" class="cursor-pointer block text-base font-bold text-gray-700 py-2" role="menuitem">
                            <i class="pr-2 fa-solid fa-right-from-bracket text-[#9A9A9A]"></i> 登出
                        </a>
                    </div>
                </div>
            </div>
        `;
    }


    userMobileTemplate() {
        return html`
        <div class="flex items-center px-4 sm:px-6">
            <div>
                <div class="text-base font-bold text-gray-800">
                    Hi ${this.name}
                </div>
                <a href="/user/center/index">→會員中心</a>
            </div>
        </div>
        <div>
            <a href="/user/index"
                class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                求職者會員中心
            </a>
            <a @click="${this.userLogout}"
                class="cursor-pointer py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                登出
            </a>
        </div>
        `;
    }

    companyTemplate() {

        return html`
            <div class="md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div class="relative dropdown">
                    <div id="drop-btn">
                        <a href="#"
                        class="text-gray-800 hover:text-primary-hover inline-flex items-center p-1 text-base font-bold"
                        id="user-menu" aria-haspopup="true">
                        <div class="rounded-full mr-2">
                            <img class="w-8 h-8 object-contain" id="company-avatar"
                                src="${this.S3Path}company/logo/${this.id}.png" alt="company-avatar"
                                loading="lazy"/>
                        </div>
                        <span class="text-[#5D5D5D]">
                            ${this.name}
                        </span>
                        <i class="pl-2 fa-solid fa-chevron-down text-[#9A9A9A]"></i>
                        </a>
                    </div>
                    <div id="drop-menu"
                        class="px-3 py-2 dropdown-content origin-top-right absolute right-0 mt-0 w-40 rounded-xl py-1 bg-white z-[100]"
                        style="box-shadow: 0px 3px 4px #00000029;" role="menu" aria-orientation="vertical"
                        aria-labelledby="user-menu">
                        <a href="/com-center" class="block text-base font-bold text-gray-700 py-2" role="menuitem">
                        <i class="pr-2 fa-solid fa-user"></i> 企業會員中心
                        </a>
                        <a @click="${this.companyLogout}" class="cursor-pointer block text-base font-bold text-gray-700 py-2" role="menuitem">
                        <i class="pr-2 fa-solid fa-right-from-bracket"></i> 登出
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    companyMobileTemplate() {
        return html`
            <div class="flex items-center px-4 sm:px-6">
            <div>
                <div class="text-base font-bold text-gray-800">
                    Hi ${this.name}
                </div>
            </div>
            </div>
            <div>
            <a href="/com-center"
                class="py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                企業會員中心</a>
            <a @click="${this.companyLogout}"
                class="cursor-pointer py-4 px-8 block py-2 text-base font-medium text-gray-500 hover:text-[#56C7BB] hover:bg-[#F8F7F7]">
                登出</a>
            </div>
        `;
    }

    adminTemplate() {
        return html`
            <div class="md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                <div class="relative dropdown">
                <div id="drop-btn">
                    <a href="#"
                    class="text-gray-800 hover:text-primary-hover inline-flex items-center p-1 text-base font-bold"
                    id="user-menu" aria-haspopup="true">
                    <span class="text-[#5D5D5D]">
                        ${this.name}
                    </span>
                    <i class="pl-2 fa-solid fa-chevron-down text-[#9A9A9A]"></i>
                    </a>
                </div>
                <div id="drop-menu"
                    class="px-3 py-2 dropdown-content origin-top-right absolute right-0 mt-0 w-40 rounded-xl py-1 bg-white z-[100]"
                    style="box-shadow: 0px 3px 4px #00000029;" role="menu" aria-orientation="vertical"
                    aria-labelledby="user-menu">
                    <a href="/admin" class="block text-base font-bold text-gray-700 py-2" role="menuitem"><i
                        class="pr-2 fa-solid fa-user"></i> 後台中心</a>
                    <a @click="${this.adminLogout}" class="cursor-pointer block text-base font-bold text-gray-700 py-2" role="menuitem"><i
                        class="pr-2 fa-solid fa-right-from-bracket"></i> 登出</a>
                </div>
                </div>
            </div>
        `;
    }

    backPrevPage() {
        if (window.history.length === 1) {
            alert('無上一頁可返回');
        } else {
            window.history.back();
        }
    }

    render() {
        return html`
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            </head>
            ${this.customizeStyle}
            <div class="block md:hidden bg-white relative ">
                <i class="text-[#56C7BB] absolute fa-solid fa-angle-left px-[14px] py-[10px] top-[50%] translate-y-[-50%] left-[12px] rounded-full bg-[#F6F2F2]"
                    @click="${this.backPrevPage}"></i>
                <h2 class="text-[#636363] text-[18px] font-bold py-[10px] text-center"> W101人力銀行 </h2>
            </div>
            <nav class="bg-white border-gray-300">
                <div class="max-w-7xl mx-auto px-4 md:py-0 py-2">
                <div class="flex justify-between">
                    <div class="flex">
                    <div class="flex-shrink-0 flex items-center">
                        <h1>
                            <a href="${this.hostName}/">
                                <img class="h-9" src="${this.hostName}/images/home/w101logo.svg" alt="logo" loading="lazy" />
                            </a>
                        </h1>
                    </div>
                    <div class="hidden md:ml-10 md:flex">
                        <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=全職"
                            class="border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] inline-flex items-center px-2 m-4 text-base font-bold">
                            全職
                        </a>
                        <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=高階"
                            class="border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] inline-flex items-center px-2 m-4 text-base font-bold">
                            高階
                        </a>
                        <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=兼職"
                            class="border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] inline-flex items-center px-2 m-4 text-base font-bold">
                            兼職
                        </a>
                        <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=派遣"
                            class="border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] inline-flex items-center px-2 m-4 text-base font-bold">
                            派遣
                        </a>
                    </div>
                    </div>
                    <div class="flex items-center">
                        ${choose(Number(this.identity), [
            [0, () => this.noIdentityTemplate()],
            [1, () => this.userTemplate()],
            [2, () => this.companyTemplate()],
            [3, () => this.companyTemplate()],
            [4, () => this.adminTemplate()],
            [5, () => this.adminTemplate()],
        ],
            () => this.noIdentityTemplate())}
                    </div>
                </div>
                </div>
            </nav>
            <div class="bg-white" id="mobile-menu" style=${styleMap({ display: this.showMoebileDropMenu ? 'block' : 'none' })}>
                ${choose(Number(this.identity), [
                [0, () => this.noIdentityMobileTemplate()],
                [1, () => this.userMobileTemplate()],
                [2, () => this.companyMobileTemplate()],
                [3, () => this.companyMobileTemplate()],
                [4, () => html``],
                [5, () => html``],
            ],
                () => this.noIdentityMobileTemplate())}
            </div>
        `;
    }

}

customElements.define('wb-header', HeaderComponent);