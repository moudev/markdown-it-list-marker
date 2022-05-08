# markdown-it-list-marker

markdown-it plugin to create lists with custom markers.

## How to use it?

```javascript
const mdMarkerPlugin = require("markdown-it-list-marker")

module.exports = {
  ...,
  extendsMarkdown: (md) => {
    md.use(mdMarkerPlugin)
  },
};
```

### Configure the marker

To add the custom marker the plugin finds a pattern in the text of the markdown item. Each markdown item that matches the text pattern will have a custom marker.

`markerSeparator` is the plugin option to set. The plugin option can be a string or an array of strings, which means that the plugin can find multiple patterns. The default value of `markerSeparator` is the string `-`.

**Warning: markdown-it recognize the string ")" to add an ordered element so make sure to use a different pattern.**

### CSS style

When the list contains one item that matches the pattern a CSS class will be added to the item and the parent of the list. Also will be added a class for the marker and the text of the item.

- `<ul>` -> `md-it-list-marker__list` class
- `<li>` -> `md-it-list-marker__item` class
- `<span>` marker -> `md-it-list-marker__marker` class
- `<span>` text -> `md-it-list-marker__text` class

You can use the CSS style that you want but there is a proposal of style to simulate the markers of the default `<ul>` HTML:

```css
li.md-it-list-marker__item {
  position: relative;
}

span.md-it-list-marker__marker {
  position: absolute;
  height: 27.1875px;
  width: 8px;
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
  left: -17px;
}

span.md-it-list-marker__text {
  text-align: left;
}
```

The style can be added from the `index.css` and added directly to the style of your project. The second option is to add a `<link>` tag in the `<head>` of the `index.html` and set the `src` attribute with `https://cdn.jsdelivr.net/npm/markdown-it-list-marker/index.css`

### Example

_Config file:_

```javascript
const mdMarkerPlugin = require("markdown-it-list-marker")

module.exports = {
  ...,
  extendsMarkdown: (md) => {
    md.use(mdMarkerPlugin)
    md.set({ markerSeparator: ["_", "-", "%", "$"] }) // default value "-"
  },
};
```

_Markdown text:_

```markdown
# demo

- 11_ demo
- 12- demo
- 13% demo
- 14$ demo
```

_HTML result:_

```html
<h1>demo</h1>
<ul class="md-it-list-marker__list">
  <li class="md-it-list-marker__item">
    <span class="md-it-list-marker__marker">11_</span>
    <span class="md-it-list-marker__text">demo</span>
  </li>
  <li class="md-it-list-marker__item">
    <span class="md-it-list-marker__marker">12-</span>
    <span class="md-it-list-marker__text">demo</span>
  </li>
  <li class="md-it-list-marker__item">
    <span class="md-it-list-marker__marker">13%</span>
    <span class="md-it-list-marker__text">demo</span>
  </li>
  <li class="md-it-list-marker__item">
    <span class="md-it-list-marker__marker">14$</span>
    <span class="md-it-list-marker__text">demo</span>
  </li>
</ul>
```

**More examples:**

You can check `test/index.test.js`.

## Prerequisites for development

- [`yarn`](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Project setup for development

### 1. Install dependencies

```bash
yarn install
```

### 2. Config Git hooks (required)

```bash
yarn prepare
```

## Development mode

[`yalc`](https://www.npmjs.com/package/yalc) is used to publish the package locally and be able to test it. The command will do the build process and push the build to the local projects where the package has been added.

```bash
yarn dev:yalc
```

## Test

```bash
yarn test:run
```

## Build mode

```bash
yarn build
```
