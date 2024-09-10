import { fixture, html } from "@open-wc/testing";

export function fix(renderable) {
    const parentNode = document.createElement("div");
    const styleNode = document.createElement("div");

    styleNode.appendChild(html`    <link rel="stylesheet" href="https://cdn.brand.illinois.edu/illinois.css">
    <link rel="stylesheet" href="https://dev.toolkit.illinois.edu/ilw-global/3.0.0-alpha/ilw-global.css">`)
    styleNode.appendChild(parentNode);


    return fixture(renderable, {parentNode})
}