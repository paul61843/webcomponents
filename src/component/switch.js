import { LitElement, html } from 'lit'

import install from '@twind/with-web-components'
import config from '../../twind.config'

const withTwind = install(config)

class SwitchComponent extends withTwind(LitElement) {

    static get properties () {
        return {
            checked: {
                type: String,
                attribute: true,
            },
            disabled: {
                type: String,
                attribute: false,
            }
        }
      }

    get customizeStyle() {
        return html`
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #B5B5B5;
                -webkit-transition: .4s;
                transition: .4s;
            }
            
            .slider:before {
                position: absolute;
                content: "關閉";
                height: 100%;
                width: 56px;
                right: 0.5px;
                bottom: 0px;
                background-color: #F9F9F9;
                -webkit-transition: .4s;
                transition: .4s;
                border: 2px solid #B5B5B5;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #B5B5B5;
            }
            
            input:checked + .slider {
                background-color: #56C7BB;
            }
            
            input:checked + .slider:before {
                content: "開放";
                -webkit-transform: translateX(-28px);
                -ms-transform: translateX(-28px);
                transform: translateX(-28px);
                border: 2px solid #56C7BB;
                background-color: #F1FBFA;
                color: #56C7BB;
            }

            .disabled .slider {
                background-color: #D7D7D7;
            }

            .disabled .slider:before {
                border: 2px solid #D7D7D7;
                background-color: #F9F9F9;
                color: #B5B5B5;
            }
            
          `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <style>
                ${this.customizeStyle} 
            </style>
            <label class="relative inline-block w-[85px] h-[30px] ${this.disabled ? 'disabled' : ''}">
                <input class="opacity-0 w-0 h-0" type="checkbox" 
                    .checked="${ this.checked }" 
                    .disabled="${ this.disabled }" 
                    @click=${ this.updateValue }>
                <span class="rounded-[18px] slider"></span>
            </label>
            `;
    }

    updateValue(e) {
        if (this.disabled) return;
        this.checked = !this.checked;
        const options = {
            detail: { checked: this.checked},
            bubbles: true,
            composed: true,
          };
        this.dispatchEvent(new CustomEvent('onClick', options));
    }

}

customElements.define('wb-switch', SwitchComponent);
