import { expect, test } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";
import "../src/ilw-card";

const content = html`
    <ilw-card>
        <h3>Icon Card</h3>
        <svg slot="icon" role="img" aria-label="A placeholder icon" width="180" height="80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <circle cx="50" cy="50" r="20" fill="#222"/>
        </svg>
        
        <p>A minimal card with a <a href="#">link to something</a>.</p>
    </ilw-card>
`;

test("image should be displayed", async () => {
    const screen = render(content);
    const element = screen.getByRole("img", { name: "A placeholder icon" });
    await expect.element(element).toBeVisible();
});
