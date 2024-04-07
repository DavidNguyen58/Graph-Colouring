# Javascript Object Overview
[Javascript Object](https://www.w3schools.com/js/js_object_definition.asp)
- All Javascript are objects except primitive values
- An object is a collection of named values
- Use const key work:
  ``` javascript
  const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
  ```
- The named values are called properties of the object (e.g firstName, lastName)
- The value of a named value is called an attribute.
- Methods are actions that can be performed on objects.
- Objects are addressed by reference not value

## Object properties
``` javascript
objectName.property;
objectName["property"];
objectName[expression];
```
## Object methods
``` javascript
objectName.methodName()
```

# API overview
-API stands for Application Programming Interface. It's a way to interact between front-end and back-end.

-Fetch API, Promist, and AJAX


# How to use Cytoscape

## Intialization
The easiest way is to use Cytoscape from CDN.
Include the link below into your javascript

``` html
<script href="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.28.1/cytoscape.min.js"></script>
```

Since Cytoscape use the dimensions of HTML container for layout, remember to put your CSS stylesheet in the head of your HTML doc to avoid undesired behaviours.

## Graph manipulation

### Create an instance (CORE)
The instance will store all the information about the graph.
``` javascript
var cy = cytoscape({
  container: document.getElementById('cy')
});
```
### Create a node
``` javascript
cy.add({
    group: 'nodes',
    data: { weight: 75 },
    position: { x: 200, y: 200 }
});
```
### Create an edge
``` javascript
cy.add({
    group: 'edges',
    data: {id: 'e0', source: 'n0', target: 'n1'}
})
```
### SELECTOR
``` javascript
cy.getElementById('id')
cy.nodes('selector');
cy.destroy()
cy.style()
cy.style()
  // and then define new styles
  .selector('node')
      .style({'background-color':
      'magenta'})

  // ...

  .update() // indicate the end of your new stylesheet so that it can be updated on elements
;

cy.elements('node#j, edge[source = "j"]');
cy.filter('[id = "some$funky@id"]');

"#foo is equivalent to [id='foo]"
```

### STYLE
- An interactive way to connect two nodes together using the extension

### Edgehandle extension
- Event trigger
- Added it to the style
- How to add it to the object cy
- Get the id of all nodes

### Live Reloading Webpack 

- npm run build

# NodeJS and Common JS


### NODE

- JSON / Collection
- A collection is a set of nodes and edges

#### Adding nodes and edges to the graph
``` javascript
// A JS object or an array of objects
cy.add({
    group: 'nodes',
    data: { weight: 75 },
    position: { x: 200, y: 200 }
});

var eles = cy.add([
  { group: 'nodes', data: { id: 'n0' }, position: { x: 100, y: 100 } },
  { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
  { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
]);

// Selecting an element
var j = cy.$(#j) 
cy.getElementById('id')

// Getting nodes and edges

cy.nodes('selector')
cy.edges('selector')


// Event Listening
cy.on()
node.id()
```

``` javascript
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': 'red',
      'target-arrow-color': '#ccc',
      'curve-style': 'bezier',
    }
  }
```
### Style
``` javascript
cy.style('stylesheet')
.update()
cy.style()
  .fromJson([
    {
      selector: 'node',
      style: {
        'background-color': 'red'
      }
    }

    // , ...
  ])

  .update() // indicate the end of your new stylesheet so that it can be updated on elements
;

console.log( cy.$('#j').json() );
console.log( cy.elements().jsons() );
```



## Module

-A module will contain code for certain functionalities. It helps developers to organize code more logically, and reusability.

-Node.js will support two modules called CommonJS and ECMAScript modules

## CommonJSModules
- Each file is treated as a module

- The format require the use of require() to load a module
``` javascript
const var = require('./module.js');
```

- Ways to export


``` javascript
exports.object1 = object1 // Add object to export's properties
module.exports = {obj1, obj2} // Specifying which objects to export
```

- Can be renamed which objects to import

## ECMAScript Modules
-Standardized how JS modules work and how to implement it in browser

-The format requires developers to use export and import

``` javascript
import {object} from "./module_path"
```

``` javascript
export {obj1, obj2, ...}
```

- We need to use export instead of module.eport when working with ECMA

- In package.json, add 

``` javascript
{"type": "module"}
```

[ESM](https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/)

# Learn how to use Webpack

## Basic Setup

- Cofig your JSON file

- The problems of using CDN are:
  - Development purpose (which external libs are used in the projects)
  - The application will misbehave if a dependency is missing
  - Not efficient if the dependency is not used

## Webpack

```
npm install webpack webpack-cli --save-dev
```

- The structure of the code should be

- src: code we write and audit

- dist: the code will be loaded in the browser

```
  webpack-demo
  |- package.json
  |- package-lock.json
 |- /dist
   |- index.html
  |- /src
    |- index.js
```


- Using import/export ECMA statement in the index.js in the source folder

- include this script in html

``` html
<script src="main.js"></script>
```

- CLI to run

```
npx webpack
```

## Configuration

```
  webpack-demo
  |- package.json
  |- package-lock.json
 |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

``` javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

``` CLI
npx webpack --config webpack.config.js
```

## NPM Scripts

``` json
{
  "script": {
    "build": "webpack"
  }
}
```

```
npm run build
```

### Graph manipulation

## Working with Nodes and Edges

- How to find the id of a node or an edge

- A data structure to store the information about the graph

- Interactive feature for the graph (Adding Edges, Adding Nodes)

- Reset button to reset

## Things to include in my next log

- Modify from static to interactive graph manipulation

- Dynamically store the data

- Focus solely on Front-End

- Struggle (How do you struggle to import file) with importing file => Learn Webpack to transpile code. 

- Understand some problems with using CDN in development stage of my project



