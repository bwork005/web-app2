# HTML5 Standards and Validation Rules

## Overview
This document outlines the HTML5 standards for the web application.

### Document Type Declaration
- Must use HTML5 DOCTYPE
- Must be the first line of every HTML document
```html
<!DOCTYPE html>
```

### Document Encoding
- All files must use UTF-8 encoding
- Must include charset meta tag:
```html
<meta charset="UTF-8">
```

### Document Structure
Required elements in order:
```html
<html>
<head>
    <!-- Meta tags and title -->
</head>
<body>
    <!-- Content -->
</body>
</html>
```

### Meta Tags
Required meta tags:
```html
<meta charset="UTF-8">
<meta name="robots" content="index, follow">
<meta name="description" content="Page description">
```

### Element Rules
- All element names must be lowercase
- All attribute names must be lowercase
- All elements must be properly nested
- All elements must be properly closed
- Attribute values must be quoted

### Required Attributes
- `alt` for `<img>` elements
- `type` for `<script>` elements
- `type` for `<style>` elements
- `title` for the document

### Banned Elements
- Deprecated HTML elements
- Presentational elements
- Frame elements

### Allowed Elements
Common elements include:
- Block elements: `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`, `<li>`, `<table>`, `<form>`
- Inline elements: `<span>`, `<a>`, `<img>`, `<input>`, `<strong>`, `<em>`
- Head elements: `<title>`, `<meta>`, `<style>`, `<script>`

### Tables
- Must include `<thead>`, `<tbody>`, and optional `<tfoot>`
- Must use `<th>` for header cells
- Must not use tables for layout

### Forms
- All form controls must have labels
- All form fields must have `name` attributes
- Submit buttons must have `value` attributes

### CSS and JavaScript
- Must be inline (no external files)
- Must include type attributes:
```html
<style type="text/css">
<script type="text/javascript">
```

## Examples

### Valid HTML Document Structure
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <style type="text/css">
        /* CSS content */
    </style>
    <script type="text/javascript">
        "use strict";
        /* JavaScript content */
    </script>
</head>
<body>
    <h1>Main Heading</h1>
    <p>Paragraph content.</p>
    <div>
        <table>
            <thead>
                <tr><th>Header</th></tr>
            </thead>
            <tbody>
                <tr><td>Data</td></tr>
            </tbody>
        </table>
    </div>
</body>
</html>
```

### Invalid HTML Examples
```html
<!-- Invalid: Missing DOCTYPE -->
<html>
    <head><title>Invalid</title></head>
    <body></body>
</html>

<!-- Invalid: Wrong encoding -->
<meta charset="ISO-8859-1">

<!-- Invalid: Unclosed elements -->
<p>Unclosed paragraph
<div>Unclosed div

<!-- Invalid: Deprecated elements -->
<font>
<center>
<strike>

<!-- Invalid: Unquoted attributes -->
<img src=image.gif>
<div class=main>
