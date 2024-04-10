---
description: This page is to introduce examples of use.
---

# Examples

## Set the `deviceSizes`

```js title="next.config.js"
module.exports = withExportImages({
  images: {
    deviceSizes: [640, 960, 1280, 1600, 1920],
  },
})
```

## Set the `placeholder`

```jsx
<Image src="/img.png" width={1280} height={640} alt="" placeholder="blur" />
```
