import { LitElement, html } from "lit";
import styles from "./ilw-card.styles";
import "./ilw-card.css";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

class Card extends LitElement {
    static get properties() {
        return {
            theme: {},
            clickable: { type: Boolean },
            align: {},
            aspectRatio: {},
            _hasGraphic: { state: true, type: Boolean },
        };
    }

    static get styles() {
        return styles;
    }

    constructor() {
        super();
        this.align = "left";
        this.theme = "white";
        this.aspectRatio = "";
        this.clickable = false;
        this._hasGraphic = false;

        // Make the first link in a clickable card be the whole card's link
        this.addEventListener("click", (ev) => {
            /**
             * @type {HTMLElement}
             */
            const target = ev.target;
            // Don't click the card if there's an element inside that's already clickable
            if (target.tagName !== "A" || target.tagName !== "BUTTON") {
                const link = this.querySelector("a");
                link.click();
            }
        });
    }

    /**
     * Tracks the number of graphic elements (images and icons) in the card, so we can
     * hide the graphics container if there's no graphics.
     *
     * @private
     */
    _slotsChanged() {
        const images = this.shadowRoot.querySelector("slot[name=image]");
        if (images.assignedElements().length > 0) {
            this._hasGraphic = true;
            return;
        }
        const icons = this.shadowRoot.querySelector("slot[name=icon]");
        if (icons.assignedElements().length > 0) {
            this._hasGraphic = true;
            return;
        }
        this._hasGraphic = false;
    }

    render() {
        const classes = {
            card: true,
            // Only add the force-ratio class if we are in fact forcing an aspect ratio
            "force-ratio": !!this.aspectRatio,
            graphic: this._hasGraphic,
        };
        const styles = {
            "--ilw-card--aspect-ratio": this.aspectRatio
                ? this.aspectRatio
                : null,
        };
        return html`
            <article class=${classMap(classes)} style=${styleMap(styles)}>
                <div class="card-graphic">
                    <div class="card-image">
                        <slot name="image" @slotchange=${this._slotsChanged}></slot>
                    </div>
                    <div class="card-icon">
                        <slot
                            name="icon"
                            @slotchange=${this._slotsChanged}
                        ></slot>
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

customElements.define("ilw-card", Card);
