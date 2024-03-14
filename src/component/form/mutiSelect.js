import { LitElement, html } from 'lit'

import install from '@twind/with-web-components'
import config from '../../../twind.config.js'

const withTwind = install(config)

class MutiSelectComponent extends withTwind(LitElement) {

    static properties = {
        inputName: { type: String },
        inputClass: { type: String },
        options: { type: Array },
        value: { type: Array },
    };

    get customizeStyle() {
        return html`
            <style>
                input {
                    background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 0.5rem center;
                    background-size: 1.5em 1.5em;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }

                input:focus + ul {
                    display: block;
                }

                ul:hover {
                    display: block;
                }
            </style>
        `;
    }

    constructor() {
        super();
    }

    addValue(value) {
        if (!this.value.includes(value)) {
            this.value = [...this.value, value];
        } else {
            this.value = this.value.filter((item) => item !== value);
        }

        const options = {
            detail: {
                value: this.value,
            },
            bubbles: true,
            composed: true,
          };
        this.dispatchEvent(new CustomEvent('onClick', options));
    }

    inputOptions() {
        return html`
        <ul class="hidden absolute top-[38px] left-[0] w-full border-[1px] border-solid border-[#D7D7D7] z-[1] rounded-[8px]">
            ${this.options.map((option) => 
                html`
                <li 
                    class="flex justify-between w-full bg-white px-[12px] py-[2px] hover:bg-[#F8F7F7] cusor-pointer" 
                    value="${option.value}" 
                    @click="${(e) => { this.addValue(option.value) }}"
                >
                    ${option.name}
                    <i class="${ this.value.includes(option.name) ? 'block' : 'hidden' } text-[#56C7BB] fa-solid fa-check"></i>
                </li>`)
            }
        </ul>
        `
    }

    render() {
        return html`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
            ${this.customizeStyle} 
            </style>
            <div class="relative">
                <input 
                    class=${this.inputClass} 
                    type="text" 
                    name="${this.inputName}" 
                    .value="${this.value.join(',')}" 
                    readonly 
                />
                ${this.inputOptions()}
            </div>
            `;
    }

}

customElements.define('wb-muti-select', MutiSelectComponent);
