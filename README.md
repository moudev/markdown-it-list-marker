# markdown-it-list-marker

markdown-it plugin to create list with custom markers. The item list can be divided by a string or an array of strings.

Check `test/index.test.js` to see examples of the plugin configuration.

**Set list style (important)**

The style can be copied from the `index.css` and adds it directly to the style of your project. The second option is to add a `<link>` tag in the `<head>` of the `index.html` and set the `src` attribute with `https://cdn.jsdelivr.net/npm/markdown-it-list-marker/index.css`

## Prerequisites

- [`yarn`](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Project setup

### 1. Install dependencies

```bash
yarn install
```

### 2. Config Git hooks (required)

```bash
yarn prepare
```

## Development

```bash
yarn dev
```

## Build

```bash
yarn build
```
