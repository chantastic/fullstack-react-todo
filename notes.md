## 1. Markup

- `main` regioon of main content (assessible as landmark)
- `li` list item (works with a wrapper)
- `ul` unordered list (bestows meaning to the list-items) (show `ol`, which we will learn later and nod to `dl`, which is used for lists of key-value pairs)
- `button[type="button"]`

  - start with text "edit" and "delete"
  - use emoji but wrap
    - `span` is useful for an piece of text (inline, meaning there is no line-break)
      - attr `role="img"` (the role of the span)
      - attr `aria-label="Delet"` move the readable text into an aria-label
        - aria attributes help assistive technologies — like screenreaders — how to read this visual element as text
        - https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
        - can also be used to wrap our todo item text

- `input[type="text"]` (others can be checkbox, number , radio, which we'll explore later)
  - inputs require labels for accessibility. can click on either label or input
  - wrap with label
  - `for` attribute. this is a little funky in React because React uses the DOM attribute name: `htmlFor`
    - Now the label is linked by `id` and markup can change
  - `autofocus/autoFocus` attribute
    - can use no value (truthy)
    - can use JS values that evaluate to truthy (using braces)
    - attributes name is camelCased
- `button`
  - type `button|submit|reset` (most buttons are buttons but we're in a form so this will be a `submit`)
- `form` how you wrap up an entire form
  - `onSubmit` (remember what we learned about camelCased attributes with more than one word?)
    - takes a function (remember what we leraned about javascript-y attributes?)
- Because we used semantic markup, forms work like forms. I can tab around, I can submit with enter, anything i want

## 2 JavaScript

- fixing and utilizing the form
  - `event.preventDefault` (don't submit the form with a page refresh)
  - `event.currentTarget` (the form)
  - `event.currentTarget[{id}]` get form element by id
  - `event.currentTarget[{id}].value` get form element by id
  - `event.currentTarget.reset()` reset the form
- extract a normal function to handle the event
- add some form of validation (can't submit empty items?)
- point-free event handling
- we can alse use JavaScript to eleminate duplication
  - let's create an array of these elements
  - use our curlies (remember above) to interpolate those values into the `ul` item with JavaScript
- we can remove the duplication by mapping over text values and applying the duplication
  - this is just an Array, so we can call map on it with no change. `todoItemsElements = [...].map()`
  - now we can split the part that is different from the part that is the same:
    - `["Learn React", "Join Lunch Dev Discord", ...]`
    - `item => <li>...</li>`
- `key` — anything guaranteed to be unique
  - let's add an item id

## 3 React state management

Now that we have these items stripped out as JavaScript data, let's put them in a mutable object.

- `React.useState` "hook"

  - needs to be at the top of the component function definition
    - just move the state in
  - `import * as React from "react"` imports all of the named and and default exports from the "react" npm modules. This import includes the types (if you're using typescript)
  - `[todoItems]` destructure the returned value
  - `[todoItems, updateToDos]` — a single updater function for the state
    - anything we put in here will obliterate the state with whatever we put in there
    - add a button that just calls the function with single todo
  - add `addTodoItem(title)` function and call it when form is submitted
  - now clear out our hard-coded state

- hook up `deleteTodoItemWithId` function

  - add functioncall to button component, using id
    - now that we're using this value twice, we can can use object destructuring to help us remove the duplication

- hook up `editTodoItemWithId` function

  - add a peice of state to indicate editing
  - use conditional in component to reveal editing

- add `cancelEditingTodoItemWithId` function
  - make edit buttion conditionally show "check" or "cancel"
    - any tim you return multiple elements, you need `React.Fragment`

- add `completeEditingTodoItemWithId` function
  - add conditionally displayed `form` (this will actually split the render function "because sometimes it makes more sense to split the whole rendering than piecmeal it all together")
  - how to visually hide label???
  - crap, now i want a whole item object again. let's NOT destructure it earlier on in the lesson
