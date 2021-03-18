import React from 'react';
import Tree from 'react-d3-tree';
import Node from './node';
import {data} from './data';

function Pedigree() {
  return (
    <div style={{ width: '100vw', height: '100vh' }} >
      <Tree
        data={data}
        depthFactor={130}
        orientation='vertical'
        pathFunc="step"
        /*renderCustomNodeElement={(props) => Node({...props})}*/
        onNodeClick={console.log('gddf')}
      />
    </div>
  );
}

export default Pedigree;
