---
title: Code Diagrams Meta
order: 5
---

# Code block meta data
This code block has language `blockdiag` and first code-block param of `astro-is-awesome`
````
```blockdiag astro-is-awesome
blockdiag {
  Astro -> is -> Awesome;
}
```
````

when adding a meta data file `astro-is-awesome.yaml` with this content
```yaml
links:
  - label: Astro
    link: https://docs.astro.build/
```

will generates an SVG diagram with links

```blockdiag astro-is-awesome
blockdiag {
  Astro -> is -> Awesome;
}
```

# Code link meta data
This is a link to a diagram code file 
```md
[Work Breakout](./work-breakout.puml)
```
when adding a meta data file `work-breakout.yaml` with this content
```yaml
links:
  - label: Business Process Modelling WBS
    link: https://plantuml.com/wbs-diagram
```

will also generate an SVG diagram with links

[Work Breakout](./work-breakout.puml)

