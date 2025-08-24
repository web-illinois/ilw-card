import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-card";

const content = html`
    <ilw-card>
        <h3>Plain Card</h3>
        <p>A minimal card with a <a href="#">link to something</a>.</p>
    </ilw-card>
`;

test("renders slotted heading", async () => {
    const screen = render(content);
    const element = screen.getByText("Plain Card");
    await expect.element(element).toBeInTheDocument();
});

test("renders slotted paragraph", async () => {
    let screen = render(content);
    const element = screen.getByText("A minimal card");
    await expect.element(element).toBeInTheDocument();
});
