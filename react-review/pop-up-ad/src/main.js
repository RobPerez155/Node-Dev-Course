// import depencies like React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup'
import './app.scss';


// import components, if rendered in ReactDOM.render

// ReactDOM.render takes arguments
ReactDOM.render(
  <Popup mustard="KETCHUPPPPPP" ketchup="MUSTARRRRRRRRD" relish="relish"/>,
    document.getElementById('app') // will find our div with an id of 'app' in our index.html and replace the children of that element with our first argument, the React element
)