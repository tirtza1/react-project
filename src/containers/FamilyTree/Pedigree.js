import React from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from "react-d3-tree/lib/Tree/types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import Node from './node';
import {data} from './data';

function Pedigree() {
  const nodeClickHandler = customprop => nodeValue => {
    console.log('customprop, nodeValue'); 
  };
  return (
    <div style={{ width: '100vw', height: '100vh' }} >
      <Tree
        data={data}
        depthFactor={130}
        orientation='vertical'
        pathFunc="step"
        renderCustomNodeElement={(props) => Node({...props})}
        onNodeClick={nodeClickHandler}
      />
    </div>
  );
}

export default Pedigree;
