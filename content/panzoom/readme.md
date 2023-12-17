---
title: Panzoom
order: 2
---

# Panzoom
## Panzoom svg

this is a Panzoom Astro component. It wraps an image or svg on a frame that has open modal button. The modal adds panzoom function

```jsx
<Panzoom src="tree.svg" />
```

<Panzoom src="tree.svg" />

## Panzoom image
```jsx
<Panzoom src="github-dark.png" />
```

<Panzoom src="github-dark.png" />

## Image svg
```markdown
![Tree](./tree.svg)
```

![Tree](./tree.svg)

## Svg text in markdown

SVG Files can be used in markdown too, they'll be passed through as is.

<svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#d0d0d0" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
