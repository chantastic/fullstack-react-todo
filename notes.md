## 1. Markup

- `main` regioon of main content (assessible as landmark)
- `header` - for the
- `li` list item (works with a wrapper)
- `ul` unordered list (bestows meaning to the list-items) (show `ol`, which we will learn later and nod to `dl`, which is used for lists of key-value pairs)
- `style` is weird in JSX. uses `{}`
  - multi-words are camelCased
  - values in quotes (strings)
  - logical padding values
- `button[type="button"]`

  - start with text "edit" and "delete"
  - use emoji but wrap
    - `span` is useful for an piece of text (inline, meaning there is no line-break)
      - attr `role="img"` (the role of the span)
      - attr `aria-label="delete"` move the readable text into an aria-label
        - aria attributes help assistive technologies — like screenreaders — how to read this visual element as text
        - https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
        - can also be used to wrap our todo item text

- `input[type="text"]` (others can be checkbox, number , radio, which we'll explore later)
  - inputs require labels for accessibility. can click on either label or input
  - wrap with label
  - `for` attribute. this is a little funky in React because React uses the DOM attribute name: `htmlFor`
    - Now the label is linked by `id` and markup can change
    - (a trick here is to use camelCase and/or underscores because they're easire to reference in the JS form object. show it both ways)
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
  - add `window.confirm` pre-condition

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
  - `handleEditingSubmit` passing along both the event and the item

- tidy things up a bit by moving editing into a different state (editing only one at a time. but re-thinking it first)

  - don't love that we're manipulating the objects and having to reset them. this will introduce some bizarre code to block on editing one at a time.
  - (my goal wasn't to show you a wrong way to do it but show you what happens if you focus too much on mutating data instead of creating more state.)
  - `[editing, editId] = React.useState(-1)`
  - remove `editTodoItemWithId` because we now have that as our updater function
  - leave `cancelEditingTodo` as a implementation convenience — is a weird API to reset `(-1)`
  - update `updateTodoItemWithId` to call `concludeEditing`
  - now you can only edit one at a time

## Providing an equivalent user experince to users of assistive technologies like screenreaders

We have a problem. Right now srcreen users are the only ones that get feedback when a todo is created, updated or deleted.
As web developers we provide an equivalent experince for users of assistive technologies like screen readers. We can achieve this with an additional state hook.

- add an live region `<div role="status" aria-live="polite">{announcement}</div>`
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
- add state
- visually hide it, using a pre-made visually hidden style
  - adapt it to object syntax
  - https://www.a11yproject.com/posts/2013-01-11-how-to-hide-content/
  - address that psuedo-selectors can't be used with inline CSS and will require a library or CSS integration
  - if we want to ensure that things get red, they need to be unique. we can solve this in a few ways
    - append the text `Todo added: ${text}`
    - add element with hidden `Date.now()`
- create an intermediate `announce` function to add the `Date.now()` call
  - can still be text or elements

## Organization APIs group logical state and actions with `useReducer`

Our component is already a but unruly, even with just a few features. We have state, we have functions to manipulate, and components to display it all inside a single component. And they _have_ to be that way because they all reference the same local state. In this next section, we're going to utilize React APIs that make colocating these concerns about state, and sharing it across components, much easier. We'll also remove a good ammount of the required namespacing and make these functions much more isolated and navigable.

- use useReducer for editing state and state manipulation

  -

- …`useContext`, "controller components", `modularization`
