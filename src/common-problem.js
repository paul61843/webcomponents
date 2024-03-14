import { LitElement, html, css } from 'https://unpkg.com/lit-element@3.3.3/lit-element.js?module';
import { create, cssomSheet } from 'https://cdn.skypack.dev/twind';

import install from '@twind/with-web-components';
import config from '../twind.config';

const withTwind = install(config);
const jobSeekerFAQ = {
    title: '求職者常見問題',
    icon: 'qa_1.svg',
    items: [
        {
            question: '使用W101人力銀行求職服務需要收費嗎?',
            answer: '註冊成為會員W101人力銀行，並且透過平台刊登履歷、投遞職缺、或使用其他求職服務，都是免費的。\n<a onclick="showLoginModal(\'user\', \'registion\')">立即註冊</a>',
            isOpen: false
        },
        {
            question: '如何註冊成為W101人力銀行求職者會員?',
            answer: '請先至W101人力銀行首頁，點擊右上角「求職會員」選擇「註冊」，輸入個人基本資料、電子信箱及密碼，輸入完畢後您須至電子信箱內收取電子信箱驗證信，驗證成功後即會員註冊完成。',
            isOpen: false
        },
        {
            question: '如何修改會員資料?',
            answer: '若要修改會員資料，請先登入會員中心，點擊「編輯會員資料」即可修改「姓名」、「電子信箱」、「手機號碼」、「市內電話」、「通訊地址」。\n*「生日」需聯繫客服人員，由專人核對身分後協助變更。',
            isOpen: false
        },
        {
            question: '為什麼驗證信無法點選驗證連結？',
            answer: '1.請先確認信件是否在垃圾信箱內，並設定為非垃圾信件後再進行點選。\n2.複製信內連結，再至瀏覽器貼上開啟。',
            isOpen: false
        },
        {
            question: '沒有收到驗證信怎麼辦?',
            answer: '請直接登入會員，會跳出信箱驗尚未通過提醒，點擊重新寄送驗證信。\n*驗證碼需等待5分鐘後才能重新發送。',
            isOpen: false
        },
        {
            question: '註冊時候的Email打錯了，可以更改嗎？',
            answer: '註冊時輸入的Email是無法做更改的，請直接聯繫客服專員為您提供協助。',
            isOpen: false
        },
        {
            question: '已完成會員註冊後，可以再修改Email嗎?',
            answer: '您可以至會員中心內的帳號資料設定，進行修改驗證信箱。',
            isOpen: false
        },
        {
            question: '為什麼一直收不到驗證信？',
            answer: '1.可能是您填寫的Email帳號無效或輸入時錯誤，請確認您註冊信箱是否輸入正確。\n2.可能是您的Email服務商判斷驗證信為垃圾信，建議您至垃圾郵件匣中讀取，並將它設定為非垃圾郵件。\n3.可能是您的Email服務商之安全機制阻擋驗證信，建議您可聯絡您的Email服務商或是使用其他的Email帳號重新註冊。\n4.若您使用公司Email註冊，請確認貴公司之資訊安全政策不會擋信。\n5.若非以上情形，仍一直無法收到信件，請至意見反應向我們反應。',
            isOpen: false
        },
        {
            question: '忘記密碼如何重設密碼？',
            answer: '您可至求職會員登入畫面點擊「忘記密碼」，輸入註冊時所填寫的身分證字號、電子信箱，系統將自動發送重設密碼信件至您的電子信箱內，點擊重設密碼後即可使用新設定密碼重新登入求職者會員。',
            isOpen: false
        },
        {
            question: '如何刪除帳號?',
            answer: '登入求職者會員 > 帳號設定 > 線上回報 > 選擇反應類別 「申請使用者帳號刪除」，確認送出後等待客服人員審核，即可完成刪除帳號申請。',
            isOpen: false
        },
    ],
};

const companyFAQ = {
    title: '企業常見問題',
    icon: 'qa_2.svg',
    items: [
        {
            question: '企業如何加入徵才會員?',
            answer: '請先至W101人力銀行首頁，點擊右上角「企業刊登」選擇「註冊」，輸入公司基本資料、電子信箱、聯絡人等資料，輸入完畢後系統將會自動發送 網路徵才廣告刊登合約書 至您註冊的信箱內，同時您也可以登入企業帳號瀏覽企業招募平台功能。 完成網路徵才廣告刊登合約書填寫後，請上傳至企業招募平台「公司」-「公司審核」至並提供最新版公司相關文件(如公司設立登記表、商業登記抄本、各政府單位核准公函、公司變更登記表)，文件經客服人員核對資料審核無誤，即完成『企業審核』，可開始使用徵才服務。',
            isOpen: false
        },
        {
            question: '如何修改公司基本資料?',
            answer: '若要修改公司基本資料，請先登入企業招募平台，點擊「公司」-「公司資料」右方編修改鍵，即可修改公司基本資料。 建議企業可上傳公司 Logo 及填寫更多關於公司簡介、服務項目、福利制度等，有效提升招募活動的效果，還能夠讓潛在的求職者更深入了解貴公司，從而增加他們投遞履歷的意願！',
            isOpen: false
        },
        {
            question: '企業帳號忘記密碼怎麼辦?',
            answer: '您可至企業刊登畫面點擊「忘記密碼」，輸入註冊時所填寫的電子信箱，系統將自動發送重設密碼信件至您的電子信箱內，點擊重設密碼後即可使用新設定密碼重新登入企業招募平台。',
            isOpen: false
        },
        {
            question: '如何刊登職缺資訊?',
            answer: '請先登入企業招募平台，點擊「職務」-「職務管理」選擇「新增職缺」，編輯職務說明內的*號為必填項目，填完資料點選「更新職缺」，即可回到職務管理頁面將建立完成的職缺刊登。',
            isOpen: false
        },
        {
            question: '上傳的圖檔大小或規格有什麼限制嗎?',
            answer: '目前僅提供公司Logo圖檔上傳，照片大小最大不能超過1MB，格式目前只有「JPG」、「JPEG」、「PNG」三種格式可以上傳。',
            isOpen: false
        },
        {
            question: '如何新增企業子帳號？',
            answer: '1. 登入企業會員中心，點選「設定-帳號管理」。\n2. 在下方子帳號列表點選「新增帳號」。\n3. 輸入新增子帳號所需資料(子帳號登入信箱、姓名、密碼)，填寫完畢後按下「新增」。\n4. 新增成功後，請繼續完成子帳號使用權限設定，設定完畢後請按下「確定修改」。\n5. 子帳號新增完後，同仁即可直接登入使用。',
            isOpen: false
        },
    ],
};
const platformRulesAndReporting = {
    title: '平台使用規則&檢舉',
    icon: 'qa_3.svg',
    items: [
        {
            question: 'W101人力銀行刊登職缺規則',
            answer: '<a href="/guest/professional-profile-regulations">W101人力銀行刊登職缺規則</a>',
            isOpen: false
        },
        {
            question: 'W101人力銀行刊登履歷規則',
            answer: '<a href="/guest/career-opportunity-standards">W101人力銀行刊登履歷規則</a>',
            isOpen: false
        },
    ],
};

const aboutTheMall = {
    title: '關於商城',
    icon: 'qa_4.svg',
    items: [
        {
            question: '呱幣是什麼?',
            answer: 'W101人力銀行為了能與求職者有更多互動，我們推出了累積呱幣活動，只要在站內完成相關任務，就可以累積呱幣，呱幣可至商城內兌換商品，我們將不定期的上架及更新商品。\n\n歡迎你加入W101人力銀行，找到你理想的好工作。',
            isOpen: false
        },
        {
            question: '如何獲得呱幣?',
            answer: '完成指定任務即可獲得呱幣，任務會不定期新增，敬請期待！',
            isOpen: false
        },
        {
            question: '如何查看呱幣明細?',
            answer: '請先登入求職者會員，點選右上方會員中心，就會顯示您目前的呱幣。\n若想查尋呱幣明細，可點選呱幣右方的「」至我的呱幣頁面，即可查詢呱幣明細及兌換紀錄。',
            isOpen: false
        },
        {
            question: '呱幣使用期限?',
            answer: '每年獲得的呱幣將於「後年12月31日」到期失效。\n例： 2023/2/18～2023/11/15 獲得的呱幣， 使用期限皆到 2024/12/31 23:59 為止。',
            isOpen: false
        },
        {
            question: '呱幣注意事項?',
            answer: '1.呱幣使用規則由 W101人力銀行保留最終決定與調整的權利，屆時將以本頁面公佈辦法為準。\n2.目前不開放直接購買或儲值呱幣及商城內商品。\n3.目前呱幣無以任何形式法轉贈至其他帳號。\n4.呱幣須於有效期間內使用完畢，若逾期未使用完畢，呱幣將會歸零，怒無法展延或轉讓。\n5.呱幣兌換後，無法提供退換貨服務。\n5.若經發現以不法手段或不正當行為獲取呱幣，本公司有權追回獎品、呱幣，並終止帳號之使用權利。\n6.想了解更多問題，歡迎透過「<a href="/guest/contact-us">聯繫我們</a>」與我們聯繫。\n',
            isOpen: false
        }
    ],
};

const customerServiceContact = {
    title: '客服聯繫方式',
    icon: 'qa_5.svg',
    items: [
        {
            question: '客服聯繫方式',
            answer: '服務時間：週一 ~ 週五 09:00 ~ 18:00\n服務信箱：contact@w101.com.tw\n意見反應表單：<a href="/guest/contact-us">填寫意見表單</a>',
            isOpen: false
        }
    ],
};

const sideBarList = [
    jobSeekerFAQ,
    companyFAQ,
    platformRulesAndReporting,
    aboutTheMall,
    customerServiceContact,
];
class DesktopContent extends withTwind(LitElement) {

    get myStyles() {
        return html`
            <style>
                .active {
                    background: #F9F9F9;
                }
                .accordion-content {
                    margin:0;
                    max-height: 0;
                    overflow: hidden;
                    transition:0.5s; /* 這裡的 0.3s 是動畫時間，你可以根據需要調整 */
                }
                .accordion-content:not(.active) {
                }
                .accordion-content.active {
                    margin-top: 1rem;
                    max-height: max-content; /* 這裡的值應該足夠大，以確保內容完全展開 */
                }
                .content {
                    white-space: pre-line;
                    color:#000000;
                    font-size: 0.875rem; /* 14px */
                    line-height: 1.25rem; /* 20px */
                }
                .content a{
                    color:rgba(86,199,187);
                    cursor: pointer;
                }
            </style>
        `;
    }

    constructor() {
        super();
        this.selectItem = sideBarList[0];
        this.selectItem.isActive = true;
    }


    static properties = {
        dict: {},
        selectItem: {}
    };

    toggleAccordion(e) {
        e.isOpen = !e.isOpen;
        this.requestUpdate();
    }

    getItem() {
        return this.dict[this.selectItem.value];
    }

    selectTab(select) {
        for (let tab of sideBarList) {
            {
                tab.isActive = false;

            }
        }
        select.isActive = true;
        this.selectItem = select;
        this.requestUpdate();
    }

    renderHeader() {
        return html`
                ${this.myStyles}
                <h2 class="font-bold text-[#9A9A9A] text-2xl pt-10 pb-5 tracking-wider content-center flex justify-center items-center">
                    常見問題
                </h2>
            `;
    }

    renderSideBar() {
        return sideBarList.map((sidebarItem) => html`
                <div class="block text-[#000000] tracking-[0.8px] h-10">
                    <span @click="${(e) => this.selectTab(sidebarItem)}" class="h-10 px-[30px] flex gap-[6px] items-center cursor-pointer ${sidebarItem.isActive ? "active" : ""}" >
                        <i class="w-[22px] h-[22px]">
                            <img src="/images/icon/qa/${sidebarItem.icon}" />
                        </i>
                        <p>${sidebarItem.title}</p>
                    </span>
                </div>
            `);
    }

    renderAccordion() {
        return this.selectItem.items.map((item) => html`
                <div class="accordion-item flex flex-col bg-white rounded-lg shadow-md">
                    <div @click="${(e) => this.toggleAccordion(item)}" class="accordion-title p-4 w-full h-auto text-left cursor-pointer">
                        <div class="flex justify-between w-auto items-center">
                            <h2 class="font-bold text-[#000000] text-lg">${item.question}</h2>
                            <span class="transform text-[#B5B5B5] float-right ${!item.isOpen ? 'rotate-180 transition-delay-300' : 'rotate-0 transition-delay-300'}">
                                <i class="fas fa-angle-up"></i>
                            </span>
                        </div>

                    </div>
                    <div class="flex flex-col accordion-content bg-transparent  px-4 ${item.isOpen ? 'active pb-4' : ''}">
                        ${this.renderAccordionText(item)}
                    </div>
                </div >
    `);
    }

    renderAccordionText(item) {

        // 创建一个包含 HTML 片段的 div 元素
        const div = document.createElement('p');
        div.classList.add('content'); // 添加样式类
        div.innerHTML = item.answer;

        // 使用 lit-html 的 html 函数将 div 内容转换为 HTML 片段
        const formattedText = html`${div} `;

        return html`
            <div class="align-middle" >
                ${formattedText}
            </div>`;
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
                <div class="max-w-7xl mx-auto py-4 md:py-0 px-4">
                    ${this.renderHeader()}
                    <div class="flex flex-col w-full">
                        <p class="pb-4 content-center flex justify-end text-[#56C7BB] font-bold"><a href="/guest/contact-us">聯繫我們</a></p>
                        <div class="flex flex-col md:flex-row">
                            <div class="flex-[0_0_auto]">
                                <div class="md:w-max lg:w-[290px] mb-[16px] md:mr-[16px]">
                                    <nav class="py-1 bg-white h-auto border rounded-lg shadow-md" aria-label="Sidebar">
                                        <div class="py-2">
                                            ${this.renderSideBar()}
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div class="flex-[1_1_auto] md:w-9/12 pb-4">
                                <div class="accordion flex flex-col gap-[10px]">
                                    ${this.renderAccordion()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}

customElements.define('wb-common-problem', DesktopContent);
