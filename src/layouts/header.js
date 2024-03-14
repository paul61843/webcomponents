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

        point: { type: Number },
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
    dispatchUserLogFuEvent() {
        if (this.userLoginFn) {
            if (typeof this.userLoginFn === 'string') {
                // 如果 userLoginFn 是字符串，尝试将其解析为函数
                const fn = new Function(`return ${this.userLoginFn}`)();

            } else if (typeof this.userLoginFn === 'function') {
                // 如果 userLoginFn 是函数，则直接执行它
                this.userLoginFn();
            } else {
                console.error('userLoginFn 不是字符串或函数');
            }
            return;
        }

        const options = {
            detail: {},
            bubbles: true,
            composed: true,
        };
        this.dispatchEvent(new CustomEvent('userLoginFn', options));
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
        const headers = new Headers({
            'Authorization': `Bearer ${localStorage.getItem("token")}` // 使用 Bearer 认证方式
        });
        fetch('/api/function/account/user/logout', {
            method: "GET",
            headers: headers
        })
            .then((res) => res.json())
            .then((resData) => {
                window.localStorage.removeItem('token');
                window.location = "/";
            });
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
                <a href="/recruitment"
                    class="${this.ShowMobileCompanyBtn ? 'inline-flex' : 'hidden'}
                        md:inline-flex border-transparent text-[#5D5D5D] hover:text-[#4EBCB1] items-center px-2 mx-4 text-base font-bold cursor-pointer">
                    企業刊登
                </a>
                <a @click="${this.dispatchUserLogFuEvent}"
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
        <div class="bg-white w-full md:hidden">
            <div class="absolute flex flex-col bg-white w-full px-[20px] z-10">
                <div class="flex flex-col gap-2">
                    <div class="relative">
                        <div class="relative dropdown">
                            <div id="drop-btn">
                                <a href="#" class="text-gray-800 text-[#5D5D5D] hover:text-[#56C7BB] inline-flex items-center py-1 text-base font-bold w-full justify-between"
                                    id="job-menu" aria-haspopup="true">
                                    <span>找工作</span>
                                    <i class="pl-2 fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                            <div
                                class="dropdown-content relative px-[20px] text-sm text-gray-700"
                                role="menu" aria-orientation="vertical"
                                aria-labelledby="job-menu">
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=全職"
                                    class="block py-2" role="menuitem">
                                    全職
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=高階"
                                    class="block py-2" role="menuitem">
                                    高階
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=兼職"
                                    class="block py-2" role="menuitem">
                                    兼職
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=派遣"
                                    class="block py-2" role="menuitem">
                                    派遣
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <div class="relative dropdown">
                            <a href="#" id="drop-btn">
                                <div class="text-gray-800 text-[#5D5D5D] hover:text-[#56C7BB] inline-flex items-center py-1 text-base font-bold w-full justify-between"
                                    id="event-menu" aria-haspopup="true">
                                    <span>熱門活動</span>
                                    <i class="pl-2 fa-solid fa-chevron-right"></i>
                                </div>
                            </a>
                            <div class="dropdown-content relative px-[20px] text-gray-700"
                                role="menu" aria-orientation="vertical"
                                aria-labelledby="event-menu">
                                <a href="/guest/company-promote" class="block  py-2" role="menuitem">企業刊登限時免費方案-W101人力銀行</a>
                                <a href="/guest/promote/copy-resume" class="block py-2" role="menuitem">只要3步驟，快速轉W101履歷</a>
                                <a href="/exchange/mission-center" class="block py-2" role="menuitem">
                                    <div class="flex">會員獎勵任務:呱幣福利社<img src='/images/exchange/hot.svg'></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    userTemplate() {
        return html`
            <div class="md:flex-shrink-0 flex md:items-center">
                <div class="md:hidden">
                    <a href="#"
                        class="text-gray-800 hover:text-primary-hover inline-flex items-center p-1 text-base font-bold"
                        @click="${this.toggleMobleDorpMenu}">
                        <div class="rounded-full mr-2">
                            <img class="w-8 h-8 object-contain" id="user-avatar"
                                src="${this.S3Path}user/headshot/${this.photo}" alt="user-avatar"
                                loading="lazy" />
                        </div>
                        <i class="pl-2 fa-solid fa-chevron-down text-[#9A9A9A]"></i>
                    </a>
                </div>

                <div class="md:relative hidden dropdown md:block">
                    <div id="drop-btn">
                        <a href="#"
                            class="text-gray-800 hover:text-primary-hover inline-flex items-center p-1 text-base font-bold"
                            id="user-menu" aria-haspopup="true">
                            <div class="rounded-full mr-2">
                                <img class="w-8 h-8 object-contain" id="user-avatar"
                                    src="${this.S3Path}user/headshot/${this.photo}" alt="user-avatar"
                                    loading="lazy" />
                            </div>
                            <i class="pl-2 fa-solid fa-chevron-down text-[#9A9A9A]"></i>
                        </a>
                    </div>

                    <div id="drop-menu"
                        class="py-2 dropdown-content origin-top-right md:absolute right-0 mt-0 w-[13rem] rounded-b-[8px] py-1 bg-white z-[100]"
                            style="box-shadow: 0px 3px 4px #00000016;" role="menu" aria-orientation="vertical"
                            aria-labelledby="user-menu">
                        <div class="px-6 gap-[6px] py-[2px] flex flex-col justify-around">
                            <div class="">
                                <span class="text-[#5D5D5D] text-[18px] font-bold">${this.name}</span>
                            </div>
                            <a href="/exchange/exchange-center">
                                <div class="flex items-center rounded-[2px] px-[12px] py-[4px] bg-[#FFF9E1]">
                                    <img class="w-[18px] h-[18px] mr-[2px] " src="/images/icon/exchange/gcoin.svg">
                                    <div class="flex justify-between items-center w-full">
                                        <p class="">呱幣餘額</p>
                                        <p class="text-[#FA9E28] font-bold">${this.point}</p>
                                    </div>
                                </div>
                            </a>
                            <a href="/exchange">
                                <div class="flex justify-between items-center rounded-[2px] px-[12px] py-[4px] text-[#FA9E28]">
                                    <p class="text-[14px]">立即賺呱幣GO!</p>
                                    <i class="pl-2 fa-solid fa-chevron-right text-[#FA9E28]"></i>
                                </div>
                            </a>
                        </div>
                        <div class="border-b-[0.5px] border-solid">
                        </div>
                        <a href="${this.hostName}/user/index" class="block px-6 text-base font-bold text-gray-700 py-2" role="menuitem">
                            <i class="pr-2 fa-solid fa-user text-[#9A9A9A]"></i> 會員中心
                        </a>
                        <a href="${this.hostName}/user/my-resume" class="block px-6 text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-file text-[#9A9A9A]"></i> 我的履歷
                        </a>
                        <a href="${this.hostName}/user/message-notification" class="block px-6 text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-comment-dots text-[#9A9A9A]"></i> 訊息中心
                        </a>
                        <a href="${this.hostName}/user/application-record" class="block px-6 text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-briefcase text-[#9A9A9A]"></i> 應徵紀錄
                        </a>
                        <a href="${this.hostName}/user/favorites-job" class="block px-6 text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-heart text-[#9A9A9A]"></i> 我的收藏
                        </a>
                        <a href="${this.hostName}/user/edit-member" class="block px-6 text-base font-bold text-gray-700 py-2"
                            role="menuitem">
                            <i class="pr-2 fa-solid fa-gear text-[#9A9A9A]"></i> 帳號設定
                        </a>
                        <a @click="${this.userLogout}" class="cursor-pointer block px-6 text-base font-bold text-gray-700 py-2" role="menuitem">
                            <i class="pr-2 fa-solid fa-right-from-bracket text-[#9A9A9A]"></i> 登出
                        </a>
                    </div>
                </div>
            </div>
        `;
    }


    userMobileTemplate() {
        return html`
        <div class="bg-white w-full md:hidden">
            <div class="absolute flex flex-col bg-white w-full px-[20px] z-10">
                <div class="flex flex-col gap-2">
                    <div class="relative">
                        <div class="relative dropdown">
                            <div id="drop-btn">
                                <a href="#" class="text-gray-800 text-[#5D5D5D] hover:text-[#56C7BB] inline-flex items-center py-1 text-base font-bold w-full justify-between"
                                    id="job-menu" aria-haspopup="true">
                                    <span>找工作</span>
                                    <i class="pl-2 fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                            <div
                                class="dropdown-content relative px-[20px] text-sm text-gray-700"
                                role="menu" aria-orientation="vertical"
                                aria-labelledby="job-menu">
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=全職"
                                    class="block py-2" role="menuitem">
                                    全職
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=高階"
                                    class="block py-2" role="menuitem">
                                    高階
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=兼職"
                                    class="block py-2" role="menuitem">
                                    兼職
                                </a>
                                <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=派遣"
                                    class="block py-2" role="menuitem">
                                    派遣
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="relative">
                        <div class="relative dropdown">
                            <a href="#" id="drop-btn">
                                <div class="text-gray-800 text-[#5D5D5D] hover:text-[#56C7BB] inline-flex items-center py-1 text-base font-bold w-full justify-between"
                                    id="event-menu" aria-haspopup="true">
                                    <span>熱門活動</span>
                                    <i class="pl-2 fa-solid fa-chevron-right"></i>
                                </div>
                            </a>
                            <div class="dropdown-content relative px-[20px] text-gray-700"
                                role="menu" aria-orientation="vertical"
                                aria-labelledby="event-menu">
                                <a href="/guest/company-promote" class="block  py-2" role="menuitem">企業刊登限時免費方案-W101人力銀行</a>
                                <a href="/guest/promote/copy-resume" class="block py-2" role="menuitem">只要3步驟，快速轉W101履歷</a>
                                <a href="/exchange/mission-center" class="block py-2" role="menuitem">
                                    <div class="flex">會員獎勵任務:呱幣福利社<img src='/images/exchange/hot.svg'></div>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="relative border-b-1 my-1 h-0"></div>
                <div class="relative bg-white text-base pt-2">
                    <div class="flex flex-col justify-around gap-2">
                        <div class="">
                            <span class="text-[#5D5D5D]">${this.name}</span>
                        </div>
                        <a href="/exchange/exchange-center">
                            <div class="flex items-center rounded-[2px] px-[12px] py-[4px] bg-[#FFF9E1]">
                                <img class="w-[18px] h-[18px] mr-[2px] " src="/images/icon/exchange/gcoin.svg">
                                <div class="flex justify-between items-center w-full">
                                    <p class="">呱幣餘額</p>
                                    <p class="text-[#FA9E28] font-bold">${this.point}</p>
                                </div>
                            </div>
                        </a>
                        <a href="/exchange">
                            <div class="flex justify-between items-center rounded-[2px] px-[12px] py-[4px] text-[#FA9E28]">
                                <p class="text-[14px] ">立即賺呱幣GO!</p>
                                <i class="pl-2 fa-solid fa-chevron-right text-[#FA9E28]"></i>
                            </div>
                        </a>
                    </div>
                    <div class="border-b-1 my-1 h-0">
                    </div>
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

    replaceLogo() {
        const currentDate = new Date();
        const logoElement = document.getElementById('logo');

        // 取得節慶資訊
        const festivals = [
            { name: 'NewYear', start: '2024/1/22', end: '2024/2/15' },
            { name: 'DragonBoatFestival', start: '2024/6/10', end: '2024/6/10' },
            { name: 'MidAutumnFestival', start: '2024/9/17', end: '2024/9/17' },
            { name: 'NationalDay', start: '2024/10/10', end: '2024/10/10' },
            { name: 'Christmas', start: '2024/12/25', end: '2024/12/25' },
        ];

        // 根据当前日期和年份判断是否是节庆日期
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const matchingFestival = festivals.find(festival => {
            const { start, end } = festival;
            const [startYear, startMonth, startDay] = start.split('/').map(Number);
            const [endYear, endMonth, endDay] = end.split('/').map(Number);

            if (
                (currentMonth === startMonth && currentDay >= startDay) ||
                (currentMonth === endMonth && currentDay <= endDay) ||
                (currentMonth > startMonth && currentMonth < endMonth)
            ) {
                return true;
            }

            return false;
        });


        // 根据是否是节庆日期来替换 logo
        if (matchingFestival) {

            // 在这里设置替换为相应的 Logo 路径
            const logoPath = `${this.hostName}/images/home/w101logo_${matchingFestival.name.toLowerCase()}.svg`;
            return logoPath;
        } else {
            // 使用默认 Logo 路径
            return `${this.hostName}/images/home/w101logo.svg`;
        }
    }

    // 调用函数

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
                                    <img class="h-9" src="${this.replaceLogo()}" alt="logo" loading="lazy" />
                                </a>
                            </h1>
                        </div>
                        <div class="md:ml-8 md:flex-shrink-0 hidden md:flex md:items-center">
                            <div class="relative dropdown">
                                <div id="drop-btn">
                                    <a href="#" class="text-gray-800 hover:text-primary-hover inline-flex items-center p-4 text-base font-bold"
                                        id="user-menu" aria-haspopup="true">
                                        <span class="text-[#5D5D5D]">找工作</span>
                                    </a>
                                </div>
                                <div
                                    class="dropdown-content hidden origin-top-right absolute w-[147px] mt-0 rounded-b-[8px] pb-2 bg-white z-[100] text-gray-700 text-sm"
                                    style="box-shadow: 0px 3px 4px #00000016;" role="menu" aria-orientation="vertical"
                                    aria-labelledby="user-menu">
                                    <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=全職"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">全職</div>
                                    </a>
                                    <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=高階"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">高階</div>
                                    </a>
                                    <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=兼職"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">兼職</div>
                                    </a>
                                    <a href="/joblist?keyword=&&classify=&&address=&&udt=-1&&ex=-1&&wh=&&re=&&el=&&fe=派遣"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">派遣</div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="ml-[35px] md:ml-4 md:flex-shrink-0 hidden md:flex md:items-center">
                            <div class="relative dropdown">
                                <div id="drop-btn">
                                    <a href="#" class="text-gray-800 hover:text-primary-hover inline-flex items-center p-4 text-base font-bold"
                                        id="user-menu" aria-haspopup="true">
                                        <span class="text-[#5D5D5D]">熱門活動</span>
                                    </a>
                                </div>
                                <div
                                    class="dropdown-content hidden origin-top-right absolute w-[249px] mt-0 rounded-b-[8px] pb-2 bg-white z-[100] text-gray-700 text-sm"
                                    style="box-shadow: 0px 3px 4px #00000016;" role="menu" aria-orientation="vertical"
                                    aria-labelledby="user-menu">
                                    <a href="/guest/company-promote"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">企業刊登限時免費方案</div>
                                    </a>
                                    <a href="/guest/promote/copy-resume"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px]">只要3步驟，快速轉W101履歷</div>
                                    </a>
                                    <a href="/exchange/mission-center"
                                        class="block py-2 hover:bg-[#F8F7F7]" role="menuitem">
                                        <div class="px-[20px] flex">會員獎勵任務:呱幣福利社<img src='/images/exchange/hot.svg'></div>
                                    </a>
                                </div>
                            </div>
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