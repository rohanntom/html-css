# **n-app**

## **Description**

**n-app** is a Vue.js application framework developed by Nivin Joseph.

## **Prerequisites**

<!-- TODO: n-app webpack.config loader -->
- Vue.js
- Node.js
- Typescript (Recommended)
- SCSS (Recommended)

## **Installation**

Via npm

```bash
npm i @nivin-joseph/n-app --save
```

## **Documentation**

### **Content**

- [What is n-app?](#what-is-n-app)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
- [Convention & File Structure](#convention-and-file-structure)
- [Structure of Pages & Individual Page](#structure-of-pages-and-individual-page)
  - [Pages](#pages)
  - [Individual Page](#individual-page)
    - [Page's Lifecycle Methods](#page's-lifecycle-methods)
      - [onCreate](#onCreate)
      - [onMount](#onMount)
      - [onDismount](#onDismount)
      - [onEnter](#onEnter)
      - [onLeave](#onLeave)
      - [onDestroy](#onDestroy)
    - [Persisted Pages](#persisted-pages)
    - [Interaction between View & View-Model](#interaction-between-view-and-view-model)
      - [Click Handler](#click-handler)
      - [Page v-bind](#page-v-bind)
      - [Page v-model](#page-v-model)
- [Structure of Components & Individual Component](#structure-of-components-and-individual-component)
  - [Components](#components)
    - [Top-level Components](#top-level-components)
    - [Page-level Components](#page-level-components)
  - [Individual Component](#individual-component)
    - [Component v-bind](#component-v-bind)
    - [Component v-model](#component-v-model)
    - [Events](#events)
- [Putting it all Together](#putting-it-all-together)
  - [client.ts](#client-ts)
- [Services](#services)
  - [Dialog Service](#dialog-service)
  - [Event Aggregator](#event-aggregator)
  - [Navigation Service](#navigation-service)
- [Examples](#examples)
  - [Simple Counter](#simple-counter)
  - [n-app-todo](#n-app-todo)

<a id="what-is-n-app"></a>

## **What is n-app?**

<a id="introduction"></a>

### **Introduction**

**n-app** is a **opinionated framework** that is built upon Vue.js and it comes with **renowned patterns and practices** out of the box.

<a id="getting-started"></a>

### **Getting Started**

#### **Hello World**

Let's set up the web-app: 

Create an `index.html` file
```html
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello world</title>
</head>

<body>
    
    <!-- this id will be used wen bootstrapping the we-app -->
    <div id="app"></div>

</body>

</html>
```

<br>

Create a Shell Component with a `router-view`. This will be our **Root Component** for the web-app.

Template: `shell-view.html`
```html
<div class="shell-view">
    <div class="container is-fluid">
        <router-view></router-view>
    </div>
</div>
```

Styles: `shell-view.scss`
```scss
.shell-view { }
```

ViewModel: `shell-view-model.ts`
```typescript
import { ComponentViewModel, template, element } from "@nivinjoseph/n-app";
import "./shell-view.scss";


@template(require("./shell-view.html"))
@element("shell")
export class ShellViewModel extends ComponentViewModel
{

}
```

<br>


Now here's how to create a Hello World Page using **n-app**.


```html
<div class="hello-page">
    {{ message }}
</div>
```

```scss
.hello-page {  }
```

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "../routes";
import "./hello-page-view.scss";

@template(require("./hello-page-view.html"))
@route("/hello-page")
export class Page1ViewModel extends PageViewModel 
{
    public get message(): string { return "Hello, World!" }
}
```

Now Register the created page in `client.ts` file. This will be our entry file.

```typescript
import { ClientApp } from "@nivinjoseph/n-app";
import { ShellViewModel } from "./components/shell-view-model";
import { Page1ViewModel } from "./pages/page1-view-model"; 

const client = new ClientApp("#app", "shell") // Element Id from index.html and Root component 
    .registerComponents(ShellViewModel) // registering all your app components
    .registerPages(Page1ViewModel)  // registering all your app pages
    .useAsInitialRoute("/hello-page")
    .useAsUnknownRoute("/hello-page")
    .useHistoryModeRouting();

client.bootstrap();
```

We've create our very first application that uses **Vue's** binding, with separation of concern between the **view** and **view-model** and while maintaining readability, and scalability.

This is just the very start of what **n-app** has to offer.

<a id="convention-and-file-structure"></a>

## **Convention & File Structure**

**n-app** follows a generalized structure and architecture for creating **enterprise-level** web applications. It enforces a **good architecture** within the web application.

**n-app** also allows for Vue operations with the DOM with **separation of concern**. Instead of writing the methods, data and template inside one file, you are able to separate it into a template file (**HTML**), and a **view-model** file (**TypeScript**).

The following is an example of how a web application using `n-app` should be structured.

```bash
n-test-app
    |-- client
        |-- components
            |-- component-1
                |-- # component-1 view and view-models
            |-- component-2
                |-- # component-2 view and view-models
            ...
            |-- index.ts
        |-- pages
            |-- page-1
                |-- components
                    |-- page-1-component
                        |-- # page-1-component view and view-models
                    ...
                |-- # page-1 view and view-models
            |-- page-2
                |-- # page-2 view and view-models
            ...
            |-- routes.ts
            |-- index.ts
        |-- client.ts
```

Similar to **Vue**, **n-app** follows the MVVM architectural pattern.

<a id="structure-of-pages-and-individual-page"></a>

## **Structure of Pages & Individual Page**

<a id="pages"></a>

### **Pages**

We highly recommend that the creation of pages should follow this generalized structure.

Within the `pages` folder, it should contain all the page's view and view-model separated into individual folder for each page.

```bash
pages
    |-- page-1
        |-- page-1-view-model.ts
        |-- page-1-view.html
        |-- page-1-view.scss
    |-- page-2
        |-- page-2-view-model.ts
        |-- page-2-view.html
        |-- page-2-view.scss
    |-- index.ts
    |-- routes.ts
```

We also recommend to setup our **page routes** in a separate file `routes.ts`, as the following:

```typescript
export class Routes
{
    public static readonly page1 = "/page1";
    public static readonly page2 = "/page2";
    
    public static readonly default = Routes.page1;
}
```

**Note:** We can also set default path which is redirected to when the address has a path of `/`.

<a id="individual-page"></a>

### **Individual Page**

Now we have setup the routes for the pages, we now need to link it to the corresponding **view-models**.

Before we can do this, we need to understand how each individual pages is structured.

Inside the `page-1` folder, it consist of 3 main parts, the **HTML**, **SCSS** and **TypeScript** files. The HTML and the SCSS files are responsible for the **view** of the page while the TypeScript file handles the **view-model**.

Inside, the `page-1` folder, we have `page-1-view.html`, `page-1-view.scss` and `page-1-view-model.ts`.

The `page-1-view.html` and all **html** pages should follow this structure. It'll have a top level `div` element with the class name as the page.

```html
<div class="page-1">
    <!-- Page Content -->
</div>
```

The `page-1-view.scss` and all **SCSS** for pages should follow this structure. It'll have a top level class with the same name as the div from the **HTML** file.

```scss
.page-1
{
    // Styles
}
```

And finally, the `page-1-view-model.ts` should follow this structure. It should contain the **view-model's** class which inherits from the `PageViewModel` class given by the **n-app** framework. The **view-model** should also import the corresponding **SCSS** file and have multiple decorators to determine the **template** and the **route**; this is all provided by the **n-app** framework.

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
import { Routes } from "../routes"; // Import all the possible Routes
import "./page-1-view.scss"; // Importing the Styles

@template(require("./page-1-view.html")) // Linking the Template to this View-Model
@route(Routes.page1) // Assigning a route for this page
export class Page1ViewModel extends PageViewModel // Inheriting the PageViewModel class
{
    // View-Model Logic
}
```

**Note:** Keep in mind that for the `@route`, we are importing it from the routes file we have defined above.

Now, we've successfully create and routed a page. This page is now **accessible** to the user.

<a id="page's-lifecycle-methods"></a>

### **Page's Lifecycle Methods**

**Note:** The following methods are inherited from the `PageViewModel` class

**Note:** Page lifecycle methods can be `Overridden`.

<a id="onCreate"></a>

#### **onCreate**

This method is executed when the **view-model** is created, but when the template is not yet mounted to the **DOM**.

```typescript
protected onCreate(): void
{
    super.onCreate();
    
    // Method Body
}
```

<a id="onMount"></a>

#### **onMount**

This method is executed when the page template is mounted on the **DOM**, you'll get the HTML element as a parameter here to manipulate it. 
*Note:* You can also access the `HTMLElement` for the page/component using the `domElement` class variable.

```typescript
protected onMount(element: HTMLElement): void
{
    super.onMount(element);
    
    // Method Body + Manipulation of the HTML element
}
```

<a id="onDismount"></a>

#### **onDismount**

This method is executed when the page template is disMounted from the **DOM**.

```typescript
protected onDismount(): void
{
    super.onDismount();
    
    // Method Body
}
```

<a id="onEnter"></a>

#### **onEnter**

This method is executed when the page has appeared and is usually used to fetch data to show on the page. The parameters for this function would be any **query/path params** of the url defined in the **route**.

```typescript
protected onEnter(...params): void
{
    super.onEnter();
    
    // Method Body
}
```

**Note:** The order of the query parameters passed in are in the order defined on the route.

**Example:** Given a route `/foo?id=bar`.

We can fetch the query parameter using...

```typescript
protected onEnter(id: string): void
{
    super.onEnter();
    
    // Do something with id...
}
```

<a id="onLeave"></a>

#### **onLeave**

This method is executed when the user is about to **leave** the page.

```typescript
protected onLeave(): void
{
    super.onLeave();
    
    // Method Body
}
```

<a id="onDestroy"></a>

#### **onDestroy**

This method is executed when the page is **removed** from the **DOM**.

```typescript
protected onDestroy(): void
{
    super.onDestroy();
    
    // Method Body
}
```

<a id="persisted-pages"></a>

### **Persisted Pages**

**n-app** allows you to have persisted pages which is means the VM is not disposed and the state is preserved.

Using the `@persist` decorator on top of the **view-model** will make the page persistence.

```typescript
@persist
```

**Note:** Persisted pages calls two lifecycle methods when entering a page and leaving a page, **onMount** and **onDismount**, respectively.

**Note:** If a page is persisted, then **components** are also persisted.

<a id="interaction-between-view-and-view-model"></a>

### **Interaction between View and View-Model**

<a id="click-handler"></a>

#### **Click Handler**

Inside your **HTML** file:

```html
<button @click="foo()">Click Me</button>
```

Inside your **TypeScript** view-model file and inside the class, you'll create a public method:

```typescript
public foo(): void
{
    // Method Body
}
```

Now whenever you click the button, it'll call the method `foo`.

<a id="page-v-bind"></a>

#### **Page v-bind**

Data binding using **n-app** is similar to **Vue**:

Inside your **TypeScript view-model** file and inside the class, you'll create a public getter for the property:

```typescript
public get foo(): string { return "bar"; }
```

Inside your **HTML** file:

```html
<div>{{ foo }}</div>
```


That's it! Now we've exposed `foo` data to the **view**.


<a id="page-v-model"></a>

#### **Page v-model**

You can easily incorporate **Vue's** two-way data binding like this:

Inside your **HTML** file:

```html
<input v-model="message" >
```

Now inside your **TypeScript view-model** file, you can create a public setter and a getter to dynamically two-way bind the data.

```typescript
private _message: string = "";

public get message(): string { return this._message; }
public set message(value: string) { this._message = value; }
```

Now when the message in the input updates, it'll update the _message property inside the **view-model** class.

<a id="structure-of-components-and-individual-component"></a>

## **Structure of Components & Individual Component**

<a id="components"></a>

### **Components**

For components, we recommend using a similar file structure to pages.

There are two cases to incorporate components into your pages.

- **Top-level** Components (Components that are visible to all pages).
- **Page-level** Components (Components that are visible to a certain pages).

<a id="top-level-components"></a>

#### **Top-level Components**

To create a **top-level** component, you could create a `components` folder on the same level as pages.

```bash
client
    |-- components
        |-- component-1
            |-- component-1-view-model.ts
            |-- component-1-view.html
            |-- component-1-view.scss
    |-- pages
```


```bash
components
    |-- component-1
        |-- component-1-view-model.ts
        |-- component-1-view.html
        |-- component-1-view.scss
    |-- index.ts
```

In order to register **top-level** components you have to register them directly with the `ClientApp` in the `client.ts` 

```typescript
import { ClientApp } from "@nivinjoseph/n-app";
import { Component1 } from "./components/component-1-view-model";

const client = new ClientApp("#app", "shell") 
    .registerComponents(Component1) // registering all your app's top-level components
    ...
client.bootstrap();
```

Now, we've created and registered our **top-level** component.

<a id="page-level-components"></a>

#### **Page-level Components**

To create a **page-level** component, you could create a `components` folder on the individual page.

```bash
client
    |-- pages
        |-- page-1
            |-- components
                |-- component-1
                    |-- component-1-view-model.ts
                    |-- component-1-view.html
                    |-- component-1-view.scss
            |-- # page-1 view and view-model
```

To register our component we'll use `@components` decorator inside our page **view-model** and register the component's **view-model**. 

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app"; 
import { Routes } from "../routes"; 
import "./page-1-view.scss"; 
import { Component1ViewModel } from "./components/component-1/component-1-view-model"; // Importing the Component's View Model

@template(require("./page-1-view.html")) 
@route(Routes.page1) 
@components(Component1ViewModel)
export class Page1ViewModel extends PageViewModel 
{
    // View-Model Logic
}
```

Now, our component has been registered.

<a id="individual-component"></a>

### **Individual Component**

Let's look into the structure of each individual components.

Just like the how the **pages** are structured, **components** uses a very similar structuring as pages minus the route.

Inside, the `components` folder we'll make a component and each of these component will contain a **view** and **view-model**.

```bash
components
    |-- component-1
        |-- component-1-view-model.ts
        |-- component-1-view.html
        |-- component-1-view.scss
```

The component-1's **views** follow the same format as pages. Though it's **view-model** is a little bit different.

Components inherits from the `ComponentViewModel` class and removes the concept of routes which is replaced by a decorator, `@element`, which contains the name of the component (the **element name** exposed to the DOM).

```typescript
import { ComponentViewModel, element, template } from "@nivinjoseph/n-app";
import "./component-1-view.scss";

@template(require("./component-1-view.html"))
@element("component-1")
export class Component1ViewModel extends ComponentViewModel
{
    
}
```

With creating the **view and view-model** and registering it, we've created a component and it's ready to be used.

If we've registered the component top-level then it's available to be used anywhere by using the name inside the component's `@element` decorator. Inside the page's **HTML**,

```html
<component-1></component-1>
```

The same process applies for **page-level** components, But the are only available in side a page.

<a id="component-v-bind"></a>

#### **Component v-bind**

Suppose we want to expose data from the page as a prop to our child component. First we'll create a getter for this object inside the page's **view-model**. Inside the **page's view-model**,

```typescript
public get data(): string { return "foo"; }
```

For our component to accept props, we'll use **n-app's** @bind decorator on top of the component's **view-model** class.

```typescript
@bind("propA")
```

Let's bind our `data` object to the `propA` prop inside the component. In our page **HTML** file which is using the component we'll bind it using `v-bind`.

```html
<component-1 :prop-a="data"></component-1>
```

**Note:** Since **HTML** uses **Kebab Case** the prop name inside the **HTML** must be **Kebab Case** but the `@bind` uses **Camel Case** so all the props inside the decorator must be in **Camel Case**; **n-app** handles the conversion.

Now, we can use the prop inside our component using a getter which returns using the `getBound` method. Inside our component's **view-model**,

```typescript
public get prop(): string { return this.getBound<string>("propA"); }
```

Now, we've retrieve data using **v-bind** from the parent and it can be used inside the child component.

<a id="component-v-model"></a>

#### **Component v-model**

Vue supports two-way binding using `v-model`. We can incorporate this using **n-app**.

Suppose, inside our **page** we're trying to use v-model for `messageA` which will be retrieved from our child component.

```html
<component-1 v-model="messageA"></component-1>
<h1>{{ messageA }}</h1>
```

Inside our component's **view-model**, we'll bind `value` keyword using the `@bind` decorator and retrieve it using a **getter** and **setter** with `getBoundModel` and `setBoundModel`, respectively.

```typescript
public set message(value: string) { this.setBoundModel(value); }
public get message(): string { return this.getBoundModel<string>(); }
```


Now, we can dynamically change the `message` and it'll be reflected on both the parent and child component using **Vue's** `v-model`.

<a id="events"></a>

#### **Events**

Similar to **Vue's** `$emit`, we can also implement a way to emit events from the component to it's parent.

We can do this as following: 

```typescript
@events("event1") // register the event-name
export class Component1ViewModel extends ComponentViewModel
{
    public click(): void
    {
        this.emit("event1"); // emit the event.
    }
}
```

**Note:** the `emit` method also supports event arguments. i.e. `this.emit(event: string, ...eventArgs: any[])`.

Now, once the click method is invoked it'll emit the `event1` event to it's parent.

In our parent, we'll use a component with a listener for event.

```html
<component-1 @event-1="onEvent1()"></component-1>
```

Now, once the event is emitted from the child component, it'll execute the `onEvent1` method inside the parent component.
<a id="putting-it-all-together"></a>

## **Putting it all Together**

Let's put everything together, to do this we need to create a `client.ts`. This file is the entry file for the app.


<a id="client-ts"></a>

### **client.ts**

Let's start looking into the `client.ts` file.

We'll first create the file inside our `client` folder.

```bash
|-- client
    |-- components
    |-- pages
    |-- client.ts
```

Now that we have the file, let's dive into it's content.

First let's import the base dependencies for our application...

```typescript
import "@nivinjoseph/n-ext"; // JavaScript Type Extension Library.
import "./styles/main.scss"; // A Main Styling File.
import { ClientApp } from "@nivinjoseph/n-app"; // Required for setting up the Vue application.
import { pages } from "./pages/index"; // Import all Pages to Register Them.
import { components } from "./components/index"; // Import all Components to Register Them.
import { ComponentInstaller, Registry } from "@nivinjoseph/n-ject"; // Adding Dependency Inversion Library into the Project.
import { given } from "@nivinjoseph/n-defensive"; // Defensive programming Library.
```

Now that we got all our dependencies, we now have to set up our **Dependency Injection** IOC container.

Inside our `client.ts`, let's add...

```typescript
class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();
        
        // Here's where you can register your dependencies.
        // Learn more about our dependency injection library @ https://github.com/nivinjoseph/n-ject.
    }
}
```

Lastly we can create a new instance of a Client App. This will register everything together.

```typescript
const client = new ClientApp("#app", "shell")
    .useInstaller(new Installer())
    .registerComponents(...components) // Registering all the Components.
    .registerPages(...pages) // Registering all the Pages.
    .useAsInitialRoute(Routes.default) // The initial route to your application.
    .useAsUnknownRoute(Routes.default); // When a user goes onto a unknown route, they'll be redirected here.
    
client.bootstrap();
```

Now notice that the ClientApp constructor requires to parameter, `appElementId` and `rootComponentElement`. 
The `appElementId` is the id for the element in the `index.html` where the app should be rendered. 
The `rootComponentElement` is name of the component which wraps over everything and will have our base `router-view`.

Let's start creating the `shell` component...

We'll add this shell component as a **top-level** component. We'll create the **view** and the **view-model**.

Inside `shell-view.html`, we'll add the `router-view` element.

```html
<div class="shell-view">
    <router-view></router-view>
</div>
```

Inside the `shell-view.scss`, we'll make an empty class.

```scss
.shell-view 
{
    
}
```

We'll set up the **view model** normally and name the element `shell`. So inside the `shell-view-model.ts`,

```typescript
import { ComponentViewModel, template, element } from "@nivinjoseph/n-app";
import "./shell-view.scss";


@template(require("./shell-view.html"))
@element("shell")
export class ShellViewModel extends ComponentViewModel
{

}
```

There we have it! After completing this your app is ready to use.

Here's an example of a completed `client.ts`.

```typescript
import "@babel/polyfill";
import "@nivinjoseph/n-ext";
import "./styles/main.scss";
import { ClientApp } from "@nivinjoseph/n-app";
import * as Routes from "./pages/routes";
import { pages } from "./pages/pages";
import { components } from "./components/components";
import { ComponentInstaller, Registry } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";


class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();
    }
}


const client = new ClientApp("#app", "shell")
    .useInstaller(new Installer())
    .registerComponents(...components)
    .registerPages(...pages)
    .useAsInitialRoute(Routes.default)
    .useAsUnknownRoute(Routes.default);

client.bootstrap();
```

<a id="services"></a>

## **Services**

**n-app** offers many useful services. In the following examples, I am going to use another dependencies [**n-ject**](https://github.com/nivinjoseph/n-ject) which is a inversion of control library. This works perfectly with n-app.

<a id="dialog-service"></a>

### **Dialog Service**

Dialog service has many useful method that is capable of **Logical UI changes**.

Here's how to include it:

You'll add the `inject` decorator, This is where we can specify names of all our dependencies. These dependencies will be injected in the ViewModel.

```typescript
@inject("DialogService")
export class ExamplePageViewModel extends PageViewModel
{
    private _dialogService: DialogService;
    
    public constructor(dialogService: DialogService)
    {
        this._dialogService = dialogService;
    }
}
```

`showLoadingScreen` is a method that shows a loading screen. It is useful while starting an asynchronous call where you want to prevent any user interaction.

```typescript
showLoadingScreen(): void;
```

`hideLoadingScreen` is a method that hides the loading screen.

```typescript
hideLoadingScreen(): void;
```

`showMessage` is a method that is used to show **general** message.

```typescript
showMessage(message: string, title?: string): void;
```

`showSuccessMessage` is a method that is used to show a message. This method should be used to show a **success**.

```typescript
showSuccessMessage(message: string, title?: string): void;
```

`showWarningMessage` is a method that is used to show a message. This method should be used to show a **warning**.

```typescript
showWarningMessage(message: string, title?: string): void;
```

`showErrorMessage` is a method that is used to show a message. This method should be used to show an **error**.

```typescript
showErrorMessage(message: string, title?: string): void;
```

`clearMessages` is a method that is used to clear all messages in the message stack.

```typescript
clearMessages(): void;
```

<a id="event-aggregator"></a>

### **Event Aggregator**

The Event Aggregator allows you to **publish** an events and **subscribe** to those events.
This can be used to facilitate communication between components/pages, that can't be done easily by passing down props or emitting events. 

Here's how to include it:

You'll add the `inject` decorator, and inside your constructor assign it the instance.

```typescript
@inject("EventAggregator")
export class ExamplePageViewModel extends PageViewModel
{
    private _eventAggregator: EventAggregator;
    
    public constructor(eventAggregator: EventAggregator)
    {
        this._eventAggregator = eventAggregator;
    }
}
```

You can `publish` and event as follows: 
```typescript
this._eventAggregator.publish("MyEvent", "some arg");
```


Now to subscribe to that event: 
```typescript
const eventSub = this._eventAggregator.subscribe("MyEvent", (eventArg) => console.log(eventArg));
```

`subscribe` method returns an `EventSubscription` object, that can be used to unsubscribe from the event.

**Note:** It is **extremely** important to `unsubscribe` from any `EventSubscription` once you've finished using it, this is to prevent any **memory leaks**.


<a id="navigation-service"></a>

### **Navigation Service**

Navigation service allows you to navigate between different pages.

Here's how to include it:

You'll add the `inject` decorator, and inside your constructor assign it the instance.

```typescript
@inject("NavigationService")
export class ExamplePageViewModel extends PageViewModel
{
    private _navigationService: NavigationService;
    
    public constructor(navigationService: NavigationService)
    {
        this._navigationService = navigationService;
    }
}
```

`currentRoutePath` is a property that contains the **current route path**.

```typescript
currentRoutePath: string;
```

`currentHashPath` is a property that contains the **current hash path**.

```typescript
currentHashPath: string;
```

`navigate` is a method that given a `route` (which is obtained from the `routes.ts` file), **redirects** you to that specific page. Optionally, it can take in `params` and you can specify if it replaces the history using `replaceHistory`.

```typescript
navigate(route: string, params?: object | null, replaceHistory?: boolean): void;;
```

`navigateBack` is a method that **navigates back**.

```typescript
navigateBack(): void;
```

`navigateForward` is a method that **navigates forward**.

```typescript
navigateForward(): void;
```

`navigateSiteSameTab` is a method that given a `url`, it'll **navigate** to that site on the **same tab**. Optionally, you can specify if it replaces the history using `replaceHistory`.

```typescript
navigateSiteSameTab(url: string, replaceHistory?: boolean): void;
```

`navigateSiteSameTab` is a method that given a `url`, it'll **navigate** to that site on a **new tab**.

```typescript
navigateSiteNewTab(url: string): void;
```

`navigateSitePostSameTab` is a method that given a `url`, it'll **navigate** to that site on the **same tab**. It'll also take in an `value` and does a `POST` on that site.

```typescript
navigateSitePostSameTab(url: string, value: object): void;
```

`navigateSitePostNewTab` is a method that given a `url`, it'll **navigate** to that site on the **new tab**. It'll also take in an `value` and does a `POST` on that site.

```typescript
navigateSitePostNewTab(url: string, value: object): void;
```

`getSiteQueryParam` is a method that given a `key`, returns the **query parameter** for the site.

```typescript
getSiteQueryParam(key: string): string;
```

<a id="examples"></a>

## **Examples**

<a id="simple-counter"></a>

### **Simple Counter**

Here's an example of an simple counter.  

Let's create a UI for our Simple Counter. Start by creating a HTML **view** file by naming `counter-view.html` and adding a button which a click event that calls `incrementByOne` method and display it inside a `p` tag:

```html
<div class="counter">
    <button @click="incrementByOne">Add One</button>
    <p class="is-blue">{{ count }}</p>
</div>
```

Now let's make the `p` tag blue by creating a SCSS **view** file naming it `counter-view.scss`:

```scss
.counter
{
    .is-blue
    {
        color: blue;
    }
}
```

We need some functionality. Let's create a TypeScript **view-model** file naming it `counter-view-model.ts` and importing **n-app** into our application and making our view-model class a **subclass** of the `PageViewModel`. We'll also route our page and add a method called `incrementByOne` that increments a private number property called `_count` by 1 and we'll expose that property using a **getter** which will then be displayed to the **view**:

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "../routes";
import "./counter-view.scss";

@template(require("./counter-view.html")) 
@route(Routes.counter)
export class CounterViewModel extends PageViewModel 
{
    private _count = 0;

    public get count(): number { return this._count; }

    public incrementByOne(): void
    {
        this._count++;
    }
}
```

Now let's link our previous **route** by creating a `Routes` class which contains the `counter` route. Let's name this file `routes.ts`:

```typescript
export class Routes
{
    public static readonly counter = "/counter";

    public static readonly default = Routes.counter;
}
```

Now in our `index.ts`, we'll import our **View-Model**:

```typescript
import { CounterViewModel } from "./counter-view-model.ts";

export const pages = [
    CounterViewModel
];
```

Referring to the creation of `client.ts` [here](#client-ts) and implementing it and we're done!

Running the page with the path `/counter` (without the path will work because we've set it as the `default` path) will bring up our simple counter application.

<a id="n-app-todo"></a>

### **n-app-todo**

Here's an example of a fully built **todo** application built with the **n-app** framework.

Link to the repo [here](https://github.com/shreymahendru/n-app-todo)
