# How to use Cytoscape

## Intialization
The easiest way is to use Cytoscape from CDN.
Include the link below into your javascript

``` html
<script href="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.28.1/cytoscape.min.js"></script>
```

Since Cytoscape use the dimensions of HTML container for layout, remember to put your CSS stylesheet in the head of your HTML doc to avoid undesired behaviours.

## Graph manipulation

### Create an instance
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
### Node manipulation
