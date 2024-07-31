import { css } from "lit";

export default css`
    :host {
        display: flex;
        flex-direction: column;
        container-type: inline-size;
    }

    article {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: stretch;
    }

    .card-graphic {
        display: none;
        position: relative;
    }

    .graphic .card-graphic {
        display: block;
        min-height: 80px;
    }

    .force-ratio .card-graphic {
        aspect-ratio: var(--ilw-card--aspect-ratio);
        width: 100%;
    }

    .force-ratio .card-graphic ::slotted([slot="image"]) {
        aspect-ratio: var(--ilw-card--aspect-ratio);
        width: 100%;
        object-fit: cover;
    }

    .card-icon {
        position: absolute;
        top: var(--ilw-card--content-padding-top);
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-content {
        font-size: var(--ilw-card--font-size);
        padding: var(--ilw-card--content-padding-top) var(--ilw-card--content-padding-right) 0 var(--ilw-card--content-padding-left);

        flex: 1;
    }

    .card-footer {
        padding: 0 var(--ilw-card--content-padding-right) var(--ilw-card--content-padding-bottom) var(--ilw-card--content-padding-left);
    }
`;
