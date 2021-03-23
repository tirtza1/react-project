import React from 'react';
import './node.css';

function Node({nodeDatum, toggleNode}) {

  return (
    <g id="con">
      <foreignObject width={250} height={250} x={-102} y={-40} >
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
