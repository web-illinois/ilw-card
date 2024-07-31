import {LitElement, html} from 'lit';
import styles from './ilw-card.styles';
import './ilw-card.css';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';


class Card extends LitElement {

    static get properties() {
        return {
            theme: {},
            clickable: {type: Boolean},
            align: {},
            aspectRatio: {},
            _hasGraphic: {state: true, type: Boolean},
        };
    }

    static get styles() {
        return styles;
    }

    constructor() {
        super();
        this.align = 'left';
        this.theme = 'white';
        this.aspectRatio = '';
        this.clickable = false;
        this._hasGraphic = false;
    }

    _slotsChanged() {
        const images = this.shadowRoot.querySelector('slot[name=image]');
        if (images.assignedElements().length > 0) {
            this._hasGraphic = true;
            return;
        }
        const icons = this.shadowRoot.querySelector('slot[name=icon]');
        if (icons.assignedElements().length > 0) {
            this._hasGraphic = true;
            return;
        }
        this._hasGraphic = false;
    }

    render() {
        const classes = {
            graphic: this._hasGraphic,
            card: true,
            'force-ratio': !!this.aspectRatio
        }
        const styles = {
            '--ilw-card--aspect-ratio': this.aspectRatio ? this.aspectRatio : null
        }
        return html`
            <article class=${classMap(classes)} style=${styleMap(styles)}>
                <div class="card-graphic">
                    <slot name="image" @slotchange=${this._slotsChanged}></slot>
                    <div class="card-icon">
                        <slot name="icon" @slotchange=${this._slotsChanged}></slot>
                    </div>
                </div>
                <div class="card-content">
                    <slot></slot>
                </div>
                <div class="card-footer">
                    <slot name="footer"></slot>
                </div>
            </article>
        `;
    }
}

customElements.define('ilw-card', Card);