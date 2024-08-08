# ilw-card

Links: **[ilw-card in Builder](https://builder3.toolkit.illinois.edu/component/ilw-card/index.html)** | 
[Illinois Web Theme](https://webtheme.illinois.edu/) | 
[Toolkit Development](https://github.com/web-illinois/toolkit-management)

## Overview

A card component that can be used as a container for grouping information, reminiscent of a physical
note or playing card. 

By default, the card is a white box with a dark border, limited in width, showing the content inside of it. There are
several variations:

- The top of the card can have an image using `slot="image"`, or an icon using `slot="icon"`.
- The whole card can be made clickable using the attribute `clickable`.
- Text content can be centered using `align="center"`.
- Color themes for `gray`, `blue`, `orange`, `blue-gradient` and `orange-gradient`. For example, `theme="blue"`.
- The aspect ratio of the `image` and `icon` slots can be forced using `aspectRatio="16/9"`.

### Slots

| Slot            | Description                                                                                |
|-----------------|--------------------------------------------------------------------------------------------|
| `slot="image"`  | Placed full-width at the top of the card.                                                  |
| `slot="icon"`   | Centered at the top of the card with ample spacing.                                        |
| `slot="footer"` | Content remains at the bottom of the card when the card is stretched to fit a larger area. |

### Icons in clickable cards

In order for themes and hover states to color icons correctly in a clickable card, the icon needs to be colorable using
`currentColor`.

CSS to apply this to the [Illinois brand icons](https://cdn.brand.illinois.edu/icons.html) is already included,
as long as you include them as inline SVG rather than with an `<img>` tag.

With other icons, you may need to apply the change. For reference, here is the relevant CSS for the Illinois icons:

### Buttons in cards

The card component overrides certain aspects of `ilw-button` and `ilw-buttons` elements to make them match
with the chosen theme, as well as hover states. The overrides only apply if there isn't a specific theme class
added to the buttons (eg. `ilw-theme-orange`).

For clickable cards, the CSS background animation is also removed, because it doesn't really work with the card
transition.

```css
ilw-card[clickable] path.cls-1 {
    fill: currentColor;
}
```

## Code Examples

### Basic card with buttons

```html
<ilw-card>
    <h3>Student Life</h3>
    <p>Animal sciences students extend their learning and career networks beyond the classroom. </p>
    <ul class="ilw-buttons">
        <li><a href="#">Learn More <span class="ilw-sr-only">About Student Life</span></a></li>
        <li><a href="#">Contact Us</a></li>
    </ul>
</ilw-card>
```

### Card with an image

```html
<ilw-card>
    <img src="https://picsum.photos/500/297" alt="" slot="image">
    <h3>Student Life</h3>
    <p>Animal sciences students extend their learning and career networks beyond the classroom. </p>
    <p><a href="#" class="ilw-button">Learn More <span class="ilw-sr-only">About Student Life</span></a></p>
</ilw-card>
```

### Clickable card

A clickable card uses the first link found in the contents as the primary link to use for the whole
card. When using this form, do not wrap the whole contents of the card in a link, that is done automatically.

A clickable card can have additional buttons or links that function as normal. Clicking the card outside of
those will utilize the first link in the contents.

```html
<ilw-card clickable>
    <img src="https://picsum.photos/500/297" alt="" slot="image">
    <h3>
        <a href="#">Student Life</a>
    </h3>
    <p>Animal sciences students extend their learning and career networks beyond the classroom. </p>
    <p><a href="#" class="ilw-button">Contact Us</a></p>
</ilw-card>
```

## Accessibility Notes

- Make sure to use the **correct heading level** for the cards based on the rest of your page, if including a heading
  tag.
- **Images and icons** on cards should generally be decorative with an empty `alt=""` attribute. If you do need an image
  that needs to be described, consider placing it below the heading. If it's at the top with an alt text,
  it may be confusing for screen readers if it comes before the title of the card.
- **Centered text** can be harder to read, so avoid longer card text that's centered.
- Make sure **links and buttons** are descriptive, using `ilw-sr-only` if needed to add context.

## External References

- https://www.nngroup.com/articles/cards-component/
- https://inclusive-components.design/cards/
- https://design-system.w3.org/components/cards.html
