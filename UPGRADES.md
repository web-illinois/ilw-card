# WIGG Component Upgrades

## Vite 7

- Upgrade all related dev dependencies to latest
  - vite
  - vite-plugin-dts
- Change the assetFileNames function in both `vite.build.config.ts` and `vite.transpile.config.ts` to the following:

```typescript
assetFileNames: () => {
    return "[name][extname]";
}
```

## TypeScript

Copy `tsconfig.json`, `vite.build.config.ts` and `vite.transpile.config.ts` from an up-to-date component (e.g. ilw-filter) and replace all mentions of the other component to match the component being updated. For example:

```bash
sed -i 's/ilw-filter/ilw-card/g' *.ts
```

Modify package.json:

```json
### devDependencies

"typescript": "^5.9.2",
"vite": "^7.1.3",
"vite-plugin-dts": "^4.5.4"

### Change exports to point to /dist/ rather than /src/ and add stylesheet export, and main and module

"exports": {
    ".": {
        "import": "./dist/ilw-card.js",
        "require": "./dist/ilw-card.cjs",
        "default": "./dist/ilw-card.js"
    },
    "./ilw-card.css": {
        "import": "./dist/ilw-card.css"
    }
},
"main": "./dist/ilw-card.js",
"module": "./dist/ilw-card.js",

### Change build script to:

"build": "tsc --noEmit && vite build --config vite.transpile.config.ts --emptyOutDir && vite build --config vite.build.config.ts --emptyOutDir",
```

Rename all .js files to .ts

Run fastmod.sh(see WIGG Web Component Developers team).

Fix remaining issues:

- Remove the closing of the static get properties() function.
- Move the default values from the constructor to the properties. 
- Declare any state properties that hadn't bee declared yet.
- Add missing types.

## axe-core tests

1. Copy the test-axe folder, as well asplaywright.config.ts and playwright.ci.config.ts from ilw-filter to the project root.
2. Create a samples/variations.htmlwith a few sample components with unique IDs, but none of the configurable attributes.
3. Use createVariations at the bottom of the HTML file. See below for a sample.
4. Add the necessary dependencies:"@axe-core/playwright": "^4.10.2",
   1. "@playwright/test": "^1.54.1",
   2. "axe-html-reporter": "^2.2.11",
   3. "playwright": "^1.54.1",
5. Add the test scripts:
   1. "test:axe": "playwright test",
   2. "test:axe:github": "playwright test --config playwright.ci.config.ts",
6. Run npm install and npm playwright install

```html
<script type="module">
    import { createVariations } from "@illinois-toolkit/ilw-core";
    import Card from "../src/ilw-card.js";

    createVariations(document.getElementById("grid"), Card, {
        theme: ["white", "gray", "orange", "blue", "orange-gradient", "blue-gradient"],
        clickable: [true, undefined],
        align: ["left", "center"],
        aspectRatio: [undefined, "16/9", "4/3", "1/1"],
        tag: ["article", "div"],
    }, [
        "plain-card",
        "image-card",
        "footer-card",
        "icon-card"
    ]);
</script>
```

## Vitest

1. Copy vitest.config.ts from ilw-filter to the repository.
2. Add the necessary devDependencies:
   1. `"@vitest/browser": "^3.2.4",`
   2. `"vitest-browser-lit": "^0.1.0"`
3. Add the test scripts to package.json:
   1. `"test": "vitest run --browser.headless",`
   2. `"test: browser": "vitest browser --browser chromium"`
4. Create a test folder and add tests to it. You can refer to ilw-filter tests/ilw-filter.test.ts for a basic example.

## GitHub Actions with tests

1. Copy deploy.yml and test.yml from ilw-filter to .github/workflows
2. Remove publish_npm.yml
