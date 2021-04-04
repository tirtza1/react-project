import React from 'react';
import './node.css';
import clone from 'clone'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Node({nodeDatum, toggleNode, onNodeClick}) {
  onNodeClick = () => {
    console.log('abc');
  }
  return (
    <g id="con">
      <foreignObject width={250} height={250} x={-102} y={-40} onClick={onNodeClick}>
        <div >
          <p id="man">{nodeDatum.name}</p>
          {
            nodeDatum.attributes.wife 
            ? <p id="woman">{nodeDatum.attributes.wife}</p> 
            : null
          }
        </div>
      </foreignObject>
    </g>
  );
}

export default Node;