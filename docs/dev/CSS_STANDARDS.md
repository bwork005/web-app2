# CSS3 Standards and Validation Rules

## Overview
This document outlines the CSS3 standards and validation rules for HTML documents in the web application.

## Requirements

### Document Encoding
- All files must use UTF-8 encoding

### CSS Features
Allowed modern features:
- Flexbox and Grid
- CSS Variables
- Transitions and Animations
- Transform and 3D
- Media Queries
- Custom Properties
- Gradients
- Modern Color Formats
- Web Fonts
- Box Shadow
- Border Radius
- Multiple Backgrounds

### Allowed Selectors
- Element selectors (e.g., `div`, `p`, `table`)
- Class selectors (e.g., `.header`, `.nav`)
- ID selectors (e.g., `#main`, `#footer`)
- Descendant selectors (e.g., `div p`, `.nav li`)
- Child selectors (e.g., `ul > li`)
- Adjacent sibling selectors (e.g., `h1 + p`)
- Attribute selectors (e.g., `input[type="text"]`)
- Pseudo-classes:
  - :hover
  - :active
  - :focus
  - :link
  - :visited
  - :first-child

### Disallowed Features
- calc() function

### Value Types
- Colors: #hex, rgb(), rgba(), hsla(), named colors
- Units: px, em, %, pt
- Keywords: auto, none, inherit

### Properties
Limited to CSS3 specification properties including:
- margin, padding
- border
- background
- color
- font
- text-align
- display
- position
- width, height
- float, clear
- overflow
- visibility
- z-index
- flexbox, grid
- transitions, animations
- transform, 3D
- media queries
- custom properties
- gradients
- modern color formats
- web fonts
- box shadow
- border radius
- multiple backgrounds

### Validation Rules
1. Style tags must include type attribute: `<style type="text/css">`
2. No external stylesheets
3. No @import rules
4. Valid CSS3 syntax
5. UTF-8 character encoding

## Examples

### Valid CSS
```css
/* Basic styling */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
}

/* Layout */
#header {
    width: 100%;
    height: 60px;
    background-color: #000000;
}

/* Typography */
.title {
    font-size: 16pt;
    color: #000000;
}

/* Tables */
table {
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #000000;
    padding: 4px;
}

/* Forms */
input[type="text"] {
    border: 1px solid #cccccc;
    padding: 2px;
}

/* Links */
a:hover {
    color: #ff0000;
}
```

### Invalid CSS
```css
/* Modern features - NOT allowed */
.container {
    display: flex;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    background: linear-gradient(to right, #fff, #eee);
}

@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
