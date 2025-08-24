import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-card";

const content = html`
    <ilw-card>
        <h3>Plain Card</h3>
        <p>A minimal card with a <a href="#">link to something</a>.</p>
        <div slot="footer">Footer content</div>
    </ilw-card>
`;

test("footer content should be displayed", async () => {
    const screen = render(content);
    const element = screen.getByText("Footer content");
    await expect.element(element).toBeInTheDocument();
});
