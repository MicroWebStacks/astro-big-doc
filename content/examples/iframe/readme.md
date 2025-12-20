---
title: Iframe Directive
order: 25
---

# Iframe Directive

The iframe directive allows you to embed external content like YouTube videos, maps, or other embeddable content directly in your markdown.

## YouTube Video

Using the iframe directive, you can embed YouTube videos. The directive automatically converts YouTube watch URLs and short URLs to the embed format.

### Syntax

```markdown
:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="YouTube Video"}
```

### Example

:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="YouTube Video"}

## Customization Options

You can customize the iframe with additional attributes:

### Custom Size

```markdown
:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="Custom Size" width=640 height=360}
```

:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="Custom Size" width=640 height=360}

### Centered

```markdown
:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="Centered Video" center}
```

:iframe[]{src="https://youtu.be/TfBXTf1QenI?si=EfH58ygENIzL1Ytq" title="Centered Video" center}

## Available Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| src | The URL of the content to embed (required) | - |
| title | Title for accessibility | "" |
| width | Width of the iframe in pixels | 560 |
| height | Height of the iframe in pixels | 315 |
| center | Center the iframe (no value needed) | - |
