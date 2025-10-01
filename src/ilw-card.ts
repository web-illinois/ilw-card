import { LitElement, unsafeCSS } from "lit";
import { html, literal } from "lit/static-html.js";
// @ts-ignore
import styles from "./ilw-card.styles.css?inline";
import "./ilw-card.css";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import { customElement, property, state } from "lit/decorators.js";

@customElement("ilw-card")
export default class Card extends LitElement {
    static get styles() {
        return unsafeCSS(styles);
    }

    @property()
    theme: "white" | "gray" | "orange" | "blue" | "orange-gradient" | "blue-gradient" = "white";
    @property()
    clickable: boolean = false;
    @property()
    align: "left" | "center" = "left";
    @property()
    aspectRatio: string = "";
    @property()
    tag: "article" | "div" = "article";
    @state()
    _hasGraphic: boolean = false;
    @state()
    _iconOnly: boolean = false;
    @state()
    _hasFooter: boolean = false;

    articleTag = literal`article`;
    divTag = literal`div`;

    constructor() {
        super();
    }

    protected _click = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        // Don't click the card if there's an element inside that's already clickable
        if (target.tagName !== "A" && target.tagName !== "BUTTON") {
            const link = this.querySelector("a");
            link?.click();
        }
    };

    /**
     * Tracks the number of graphic elements (images and icons) in the card, so we can
     * hide the graphics container if there's no graphics.
     */
    protected _slotsChanged() {
        const shadowRoot = this.shadowRoot;
        if (!shadowRoot) return;

        const footers = shadowRoot.querySelector(
            "slot[name=footer]",
        ) as HTMLSlotElement;
        this._hasFooter = footers?.assignedElements().length > 0;

        const images = shadowRoot.querySelector(
            "slot[name=image]",
        ) as HTMLSlotElement;
        if (images?.assignedElements().length > 0) {
            this._hasGraphic = true;
            return;
        }
        const icons = shadowRoot.querySelector(
            "slot[name=icon]",
        ) as HTMLSlotElement;
        if (icons?.assignedElements().length > 0) {
            this._iconOnly = true;
            this._hasGraphic = true;
            return;
        }
        this._hasGraphic = false;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        const classes: Record<string, boolean> = {
            card: true,
            // Only add the force-ratio class if we are in fact forcing an aspect ratio
            "force-ratio": !!this.aspectRatio,
            graphic: this._hasGraphic,
            "icon-only": this._iconOnly,
            "has-footer": this._hasFooter,
        };
        classes[`theme-${this.theme}`] = true;
        const styles = {
            "--ilw-card--aspect-ratio": this.aspectRatio
                ? this.aspectRatio
                : null,
        };

        let staticTag = this.tag === "div" ? this.divTag : this.articleTag;
        return html`
            <${staticTag} class=${classMap(classes)} style=${styleMap(styles)}
                         @click="${this.clickable ? this._click : null}">
                <div class="card-content">
                    <slot></slot>
                </div>
                <div class="card-graphic">
                    <div class="card-image">
                        <slot
                            name="image"
                            @slotchange=${this._slotsChanged}
                        ></slot>
                    </div>
                    <div class="card-icon">
                        <slot
                            name="icon"
                            @slotchange=${this._slotsChanged}
                        ></slot>
                    </div>
                </div>
                <div class="card-footer ${this._hasFooter ? "" : "empty"}" @slotchange=${this._slotsChanged}>
                    <slot name="footer"></slot>
                </div>
            </${staticTag}>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ilw-card": Card;
    }
}
