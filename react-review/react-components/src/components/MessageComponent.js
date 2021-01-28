import React from 'react';
const MessageComponent = props => {
  return(
    <div>
      <h1>Component Message: {props.mustard} {props.relish}</h1>
    </div>
  );
};

export default MessageComponent;
