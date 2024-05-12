---
title: Code Diagrams
order: 2
---
# Block Diagram

```blockdiag
blockdiag {
  Kroki -> is -> Awesome;
}
```
# Plantuml
## Sequence Diagram
```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle
skinparam monochrome true
actor customer
actor clerk
rectangle checkout {
  customer -- (checkout)
  (checkout) .> (payment) : include
  (help) .> (checkout) : extends
  (checkout) -- clerk
}
@enduml
```

## Mind Map

```plantuml my-mind-map
@startmindmap
skinparam monochrome true
+ OS
++ Ubuntu
+++ Linux Mint
+++ Kubuntu
+++ Lubuntu
+++ KDE Neon
++ LMDE
++ SolydXK
++ SteamOS
++ Raspbian
-- Windows 95
-- Windows 98
-- Windows NT
--- Windows 8
--- Windows 10
@endmindmap
```

## Work Breakout
Diagrams can also be linked from a separate file like this

```md
[Work Breakout](./work-breakout.puml)
```
Which will generate the same view as if it was embedded in a code block

[Work Breakout](./work-breakout.puml)

# Mermaid

```mermaid
graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
  C --> E[ Sharing ideas ]
  C --> F[ Advocating ]
```
