---
layout: "@/layout/Layout.astro"
title: "Relative images"
---
# Image in Markdown
this is a relative image embed. Thanks to the `remark-rel-asset` plugin, it works in Astro same as in vscode and in github.

```markdown
![github dark](github-dark.png)
or
![github dark](./github-dark.png)
```

![github dark](./github-dark.png)

this is a relative svg embed


```markdown
![Tree](./tree.svg)
```

![Tree](./tree.svg)
