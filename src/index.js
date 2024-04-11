import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use( edgehandles );

// Graph
var cy = cytoscape({

  container: document.getElementById('screen'), // container to render in
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        width: 25,
        height: 25,
        'background-color': 'black',
        'label': 'data(id)', 
        color: 'black',
        
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
      }
    },

    // some style for the extension

    {
      selector: '.eh-handle',
      style: {
        'background-color': 'red',
        'width': 12,
        'height': 12,
        'shape': 'ellipse',
        'overlay-opacity': 0,
        'border-width': 12, // makes the handle easier to hit
        'border-opacity': 0
      }
    },

    {
      selector: '.eh-hover',
      style: {
        'background-color': 'red'
      }
    },

    {
      selector: '.eh-source',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },
    {
      selector: '.eh-target',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },

    {
      selector: '.eh-preview, .eh-ghost-edge',
      style: {
        'background-color': 'red',
        'line-color': 'red',
        'target-arrow-color': 'red',
        'source-arrow-color': 'red'
      }
    },

    {
      selector: '.eh-ghost-edge.eh-preview-active',
      style: {
        'opacity': 0
      }
    }
  ],

  layout: {
    name: 'circle',
  }
});

// the default values of each option are outlined below:
let defaults = {
  canConnect: function( sourceNode, targetNode ){
    // whether an edge can be created between source and target
    return !sourceNode.same(targetNode); // e.g. disallow loops
  },
  edgeParams: function( sourceNode, targetNode ){
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    return {};
  },
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
};

// JSON to send
let info = {}

// Setting up edgehandles
let eh = cy.edgehandles( defaults );

window.addEventListener('resize', function(event){
  cy.center();
});

let width = document.getElementById('screen').offsetWidth;
let height = document.getElementById('screen').offsetHeight;

window.addEventListener('resize', function(event){
  width = document.getElementById('screen').offsetWidth;
  document.getElementById('screen').offsetHeight;
})

const vertex = document.getElementById('vertex')

vertex.addEventListener('click', function(){
  console.log("APPEARRED")
  let id = cy.nodes().length + 1;
  cy.add({
    data: {id: `${id}`},
    position: {x: width / 2 , y: height / 2}
  })
  info[id] = '';
})

// Edge
const edge = document.getElementById('edge');
edge.addEventListener('click', function(){
  if (edge.style.backgroundColor == 'red'){
    edge.style.backgroundColor = 'green';
    eh.enableDrawMode();
  }
  else if (edge.style.backgroundColor == 'green'){
    edge.style.backgroundColor = 'red';
    eh.disableDrawMode()
  }
  else{
    edge.style.backgroundColor = 'green';
    eh.enableDrawMode()
  }
});

cy.on("ehcomplete", function(event, sourceNode, targetNode, addedEdge){
  let x = sourceNode.id()
  let y = targetNode.id()
  if (info[x].length == 0){
    info[x] = `${y}`;
  }
  else{
    info[x] = info[x] + `,${y}`;
  }
  if (info[y].length == 0){
    info[y] = `${x}`;
  }
  else{
  info[y] = info[y] + `,${x}`;
  }
  console.log(info);
});


// Reset the graph
const reset = document.getElementById('reset');
reset.addEventListener('click', function(){
  let nodes = cy.nodes();
  cy.remove(nodes);
  info = {};
})


// FETCH TO THE SERVER
const btn_solve = document.getElementById('solve');
btn_solve.addEventListener('click', function(e){
  e.preventDefault();
  for (let key of Object.keys(info)){
    if (typeof info[key] === "string")
    {
    info[key] = info[key].split(",");
    info[key].sort();
    }
  }
  console.log(info)
})
