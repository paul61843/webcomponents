import { LitElement, html } from 'lit';

import { styleMap } from 'lit/directives/style-map.js';
import { choose } from 'lit/directives/choose.js';

import install from '@twind/with-web-components';
import config from '../../twind.config';

const withTwind = install(config);

class BottomNavbarComponent extends withTwind(LitElement) {


    static properties = {
        hostName: { type: String },
    };

    get customizeStyle() {
        return html`
            <style>
            .tab-text{
                color:#9FAFB0;
            }

            .tab-icon {
                /* 原始图标样式 */
                width: 35px;
                height: 35px;
                transition: transform .3s;
            }
            .bounce {
                animation: bounce .5s ease infinite;
            }
            @keyframes bounce {
                70% { transform:translateY(0%); }
                80% { transform:translateY(-30%); }
                90% { transform:translateY(0%); }
                95% { transform:translateY(-14%); }
                97% { transform:translateY(0%); }
                99% { transform:translateY(-6%); }
                100% { transform:translateY(0); }
            }

            .tab-icon:hover {
                /* 悬停时的缩放效果 */
                transform: scale(1.1);
            }

            .animate-icon-color {
                /* 点击效果的动画 */
                animation: colorAnimation .3s;
            }

            .animate-text-color {
                /* 点击效果的动画 */
                animation: colorAnimation .3s;
            }

            @keyframes colorAnimation {
                0% {
                    filter: brightness(1);
                }
                100% {
                    filter: brightness(0.7);
                }
            }

            </style>
        `;
    }

    constructor() {
        super();
        this.hostName = '';
    }

    loadIconScript() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.lordicon.com/bhenfmcm.js';
        return script;
    }

    isNavigating = false;

    // 添加一个标志来表示是否悬停在图标上
    isHovered = false;

    changeIconColor(event, index) {
        if (this.isNavigating) {
            return;
        }

        const elem = event.composedPath()[0];
        const textElem = elem.nextElementSibling;

        elem.classList.add('bounce');

        textElem.classList.add('animate-text-color');

        this.isNavigating = true;

        // 使用setTimeout来等待动画完成后执行页面跳转
        setTimeout(() => {
            // 移除CSS类
            elem.classList.remove('bounce');
            textElem.classList.remove('animate-text-color');

            // 执行页面跳转
            window.location.href = this.generateIconData()[index].href;

            // 标记跳转完成
            this.isNavigating = false;
        }, 500); // 这里的300表示等待300毫秒，你可以根据你的CSS动画时长进行调整


        elem.setAttribute('colors', 'primary:#56C7BB');
        textElem.classList.add('text-[#56C7BB]');
    }
    generateIconData() {
        return [
            {
                src: `/images/icon/tab_home.svg`,
                text: '首頁',
                href: `/`,
            },
            {
                src: `/images/icon/tab_job.svg`,
                text: '找工作',
                href: `${this.hostName}/joblist`,
            },
            {
                src: `/images/icon/tab_message.svg`,
                text: '訊息',
                href: `${this.hostName}/user/message-notification`,
            },
            {
                src: `/images/icon/tab_member.svg`,
                text: '會員',
                href: `${this.hostName}/user/index`,
            },
        ];
    }

    renderIcon(icon, index) {
        return html`
            <div class="block flex flex-col flex-1 items-center text-[#BABABA] pt-[12px] pb-[16px]" href="${icon.href}"
                @mouseover=${() => this.isHovered = true}
                @mouseout=${() => this.isHovered = false}
                @click=${(e) => this.changeIconColor(e, index)}>
                <img
                    class="w-[35px] h-[35px] tab-icon"
                    src="${icon.src}"
                    trigger="click"
                    colors="primary:#BABABA"
                >
                </img>
                <p class="text-sm tab-text">${icon.text}</p>
            </div>
    `;
    }

    render() {
        const iconData = this.generateIconData();
        return html`
            ${this.loadIconScript()}
            ${this.customizeStyle}
            <div id="webview-navbar" class="flex md:hidden bg-white text-center sticky bottom-0 z-[900] bg-[#FAFAFA]"
                style="box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 10px;">
                ${iconData.map((icon, index) => this.renderIcon(icon, index))}
            </div>
        `;
    }

}

customElements.define('wb-bottom-navbar', BottomNavbarComponent);