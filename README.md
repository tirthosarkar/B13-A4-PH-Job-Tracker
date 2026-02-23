# DOM Manipulation - Assignment

## 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

### 1️⃣ getElementById()

getElementById() selects a single HTML element using its unique id.
It returns the element as an object.

We use it when:
- The element has a unique id
- We need to access or change one specific element

Since an id is unique on a page, this method always returns only one element.

**Example:**

```html
<h1 id="title">Hello World</h1>
```

```js
const heading = document.getElementById("title");
```

---

### 2️⃣ getElementsByClassName()

getElementsByClassName() selects elements using their class name.
It returns an HTMLCollection, which is like an array but not exactly an array.

We use it when:
- Many elements have the same class
- We want to access all of them

To get a specific element, we can use its index, like [0] for the first element.

**Example:**

```html
<p class="text">One</p>
<p class="text">Two</p>
```

```js
const items = document.getElementsByClassName("text");
items[0]; // access first element
```

---

### 3️⃣ querySelector()

querySelector() selects the first HTML element that matches a CSS selector.
It returns the element as an object.

We use it when:
- We need only one element
- We want to select elements using CSS selectors, like an id (#id), a class (.class), or a tag name (div, p, etc.)

It always selects the first matching element.

**Example:**

```html
<p class="text">Two</p>
```

```js
const firstText = document.querySelector(".text");
```

---

### 4️⃣ querySelectorAll()

querySelectorAll() selects all HTML elements that match a CSS selector.
It gives a NodeList, which is similar to an array but not exactly an array.

We use it when:
- Many elements match the same selector
- We want to work with all of them

We can loop through them using forEach() or get a specific element using an index, like [0].

**Example:**

```html
<p class="text">One</p>
<p class="text">Two</p>
```

```js
const items = document.querySelectorAll(".text");
items.forEach(item => console.log(item.innerText));
```

---

### ✅ Summary

==> All of these methods help JavaScript find and manipulate elements in the HTML.  
==> They let us select specific elements or multiple elements so we can change content, style, or behavior.

---

## 2. How do you create and insert a new element into the DOM?

### 2️⃣ How We create and insert a new element into the DOM:

To create and insert a new element in the DOM, first of all we use document.createElement("tag") to create the element in memory. At this stage, it is not visible on the page. Next, we add some content to the element using innerText or set attributes like className. Once the element is ready, we can insert it into the page using different methods like: appendChild() to add it as the last child of a parent, prepend() to add it as the first child, insertBefore() to place it before a specific element, before() and after() to insert relative to another element, insertAdjacentElement() or insertAdjacentHTML() to insert at a specific position, and replaceChild() to swap an existing element with the new one. This process allows JavaScript to dynamically add, insert, or replace content and elements on a webpage.

**Example:**

```js
const newDiv = document.createElement("div");
newDiv.innerText = "I replaced the old element";
document.body.replaceChild(newDiv, ref);

const p = document.createElement("p");
p.innerText = "Last child";
document.body.appendChild(p);
```

---

## 3. What is Event Bubbling? And how does it work?

### 3️⃣ Event Bubbling

Event Bubbling is when an event in the DOM starts from the innermost element and moves up to the outer elements.
For example, if we click on an element, the event happens on that element first, then goes to its parent, then the parent's parent, and so on, up to the `<html>` element.
This means both the element you clicked and its parents can respond to the same event.

**Example:**

```html
<div id="parent" style="padding:20px; background-color:lightblue;">
  Parent Div
  <button id="child">Click Me</button>
</div>
```

```js
const parent = document.getElementById("parent");
const child = document.getElementById("child");

child.addEventListener("click", () => {
  console.log("Button clicked");
});

parent.addEventListener("click", () => {
  console.log("Parent Div clicked");
});
```

---

## 4. What is Event Delegation in JavaScript? Why is it useful?

### 4️⃣ Event Delegation in JavaScript and its usefulness:

Event Delegation is a technique where we attach a single event listener to a parent element instead of adding separate listeners to multiple child elements.
The parent listens for events on its children, and we can use the event object to figure out which child triggered the event.

**Why it's useful:**
- We don't have to add many event listeners to each child element.
- It works even if new child elements are added dynamically.
- It improves performance and makes code simpler.

**Example:**

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```js
const list = document.getElementById("list");
list.addEventListener("click", (event) => {
  console.log("Clicked:", event.target.innerText);
});
```

---

## 5. What is the difference between preventDefault() and stopPropagation() methods?

### 5️⃣ Difference between preventDefault() and stopPropagation():

#### preventDefault()

Stops the normal behavior of an element from happening.
Example: a link won't open, or a form won't submit when clicked.

**Example:**

```html
<a href="https://example.com" id="link">Go to Example</a>
```

```js
const link = document.getElementById("link");
link.addEventListener("click", (e) => {
  e.preventDefault(); // stops link from opening
  console.log("Link click prevented!");
});
```

---

#### stopPropagation()

Stops an event from moving up (bubbling) or down (capturing) the DOM.
Example: clicking a button inside a div triggers only the button's event, not the div's.

**Example:**

```html
<div id="box" style="padding:20px; background-color:lightblue;">
  Parent Div
  <button id="btn">Click Me</button>
</div>
```

```js
const box = document.getElementById("box");
const btn = document.getElementById("btn");

box.addEventListener("click", () => {
  console.log("Div clicked!");
});

btn.addEventListener("click", (e) => {
  e.stopPropagation(); // stops div from reacting
  console.log("Button clicked!");
});
```