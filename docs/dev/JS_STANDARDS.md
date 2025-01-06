# ECMAScript 2018 (ES9) Standards

## Overview
This document outlines the ES9 standards for JavaScript in the web application.

## Requirements

### Document Encoding
- All files must use UTF-8 encoding
- Scripts can be external or inline
- Use `type="module"` for ES modules

### JavaScript Features
Allowed ES9 features:
- Async iteration
- Rest/spread properties
- Regular expression features
- Promise.prototype.finally()
- Template literals
- Arrow functions
- Destructuring
- Classes and modules
- Async/await
- Map/Set/WeakMap/WeakSet
- Modern array methods
- Modern string methods
- Object methods

## Examples

### Valid JavaScript
```javascript
"use strict";

// Variable declarations
let count = 0;
const name = "John";
let isValid = true;

// Functions
const calculateTotal = (price, quantity) => {
    return price * quantity;
};

// Object creation
const person = {
    name: "John",
    age: 30,
    sayHello() {
        return `Hello, ${this.name}`;
    }
};

// DOM manipulation
const element = document.getElementById("myElement");
if (element) {
    element.style.display = "none";
}

// Event handling
const handleClick = (event) => {
    alert("Clicked!");
};
element.onclick = handleClick;

// Error handling
try {
    // risky code
} catch (error) {
    alert(`An error occurred: ${error.message}`);
}
```

### Invalid JavaScript
```javascript
// Old features - NOT allowed
var name = "John";
var age = 30;

// Function declarations - NOT allowed
function greet() {
    console.log("Hello");
}

// String concatenation - NOT allowed
var message = "Hello " + name;

// No destructuring - NOT allowed
var firstName = person.firstName;
var lastName = person.lastName;

// Old array methods - NOT allowed
for (var i = 0; i < array.length; i++) {
    console.log(array[i]);
}

// No classes - NOT allowed
function Person(name) {
    this.name = name;
}

// No Promises - NOT allowed
function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/data", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

// No async/await - NOT allowed
function getData() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/data", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error("Request failed"));
            }
        };
        xhr.send();
    });
}
