import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import React, {useState} from "react"
import ReactDOM from 'react-dom/client';
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { TrashIcon } from "@primer/octicons-react"; 
import { AiOutlineNodeIndex } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";

cytoscape.use( edgehandles );


// Graph instance
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

let width = document.getElementById('screen').offsetWidth;
let height = document.getElementById('screen').offsetHeight;

window.addEventListener('resize', function(event){
  cy.center();
  width = document.getElementById('screen').offsetWidth;
  document.getElementById('screen').offsetHeight;
})


// Button for vertex
function AddVertex(){
  console.log("APPEARRED")
  let id = cy.nodes().length + 1;
  cy.add({
    data: {id: `${id}`},
    position: {x: width / 2 , y: height / 2}
  })
  info[id] = '';
  console.log("Success")
  console.log(`Vertex: ${id}`)
}



// Need to make some changes here
let i = 0
// Button for Edge
function AddEdge(){
  /*if (edge.style.backgroundColor == 'red'){
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
  }*/
  if (i === 0){
    eh.enableDrawMode();
    i = 1;
    console.log(i)
  }
  else if (i === 1) {
    eh.disableDrawMode();
    i = 0;
    console.log(i)
  }
}

// Button for resetting
function Reset(){
  let nodes = cy.nodes();
  cy.remove(nodes);
  info = {};
}

function GraphButtons(){
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => {
    if (isToggled){
      eh.disableDrawMode();
    }
    else if (!isToggled){
      eh.enableDrawMode();
    }
    setIsToggled(prevState => !prevState)};
  return (
  <div className="row pt-2 pb-3">
      <div className='col-sm-4 d-flex justify-content-center'><AwesomeButton onPress={AddVertex} style={{fontSize: '16px', width: '30vh'}}><FaCircle/>&nbsp;Add Vertex<p id="nv"></p></AwesomeButton></div>
      <div className='col-sm-4 d-flex justify-content-center'><AwesomeButton onPress={toggle} style={{fontSize: '16px', width: '30vh'}}><AiOutlineNodeIndex/>&nbsp;Add Edge: {isToggled ? 'ON': 'OFF'}</AwesomeButton></div>
      <div className='col-sm-4 d-flex justify-content-center'><AwesomeButton cssModule={AwesomeButtonStyles}  onPress={Reset} type="danger" style={{fontSize: '16px', width: '30vh'}}><TrashIcon/>&nbsp;Reset</AwesomeButton></div>
  </div>
  )
}

ReactDOM.createRoot(document.getElementById('G')).render(<GraphButtons/>);


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


// Fetch with Asyn and Promises
async function Solve(event){
  for (let key of Object.keys(info)){
    if (typeof info[key] === "string")
    {
    info[key] = info[key].split(",");
    info[key].sort();
    }
  }
  console.log(info)
}

// Change the first button Solving - Consider adding fetching
function ButtonSolve(){
  return (
  // Fetch to the server and render if there is a solution
  <form action="#">
    <AwesomeButtonProgress type="secondary" onPress={Solve()} style={{fontSize: '16px', width: '30vh'}}>SOLVE</AwesomeButtonProgress> 
  </form>
  )
}
ReactDOM.createRoot(document.getElementById('solve')).render(<ButtonSolve/>);


// How to access the property of a component in React
