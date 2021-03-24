import React, {Component } from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from "react-d3-tree/lib/Tree/types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Node from './node';
import {data} from './data';

function Pedigree(props) {

  const [treeData, setTreeData] = React.useState(data);
  const [firstName, setFirstName] = React.useState('first name');
  const [lastName, setLastName] = React.useState('last name');
  const [birth, setBirth] = React.useState('birth');
  const [death, setDeath] = React.useState('death');
  const [email, setEmail] = React.useState('email');
  const [alive, seAlive] = React.useState(false);
  const [newPerson, setNewPerson] = React.useState('newPerson');
  const [showList, setShowList] = React.useState(false);
  const [dataListValue, setDataListValue] = React.useState('');

  const addNewNode = (event) => {
    setFirstName('');
    //set all of the states to empty
    setShowList(!showList);
    switch(dataListValue) {
      case 'father': 
        setTreeData();
        break;
      case 'mother': 
    }
  }

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} >
      <Tree
        data={data}
        depthFactor={130}
        orientation='vertical'
        pathFunc="step"
        renderCustomNodeElement={(props) => Node({...props})}
        onNodeClick={null}
      />

    <Modal
      isOpen={true}
      //toggle={this.toggle}
      size='lg'
      centered
    >
      <ModalHeader style={{textAlign:"center"}}>
        {'name'}
      </ModalHeader>
      <ModalBody>
        <img src={'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'} width="30" height="30" alt={'name'} />
        {
          <form>
            <label htmlFor="fromDate">שם פרטי: </label>
            <input type="text" id="firstName" onChange={onFirstNameChange}/>
      
            <label htmlFor="fromDate">שם משפחה: </label>
            <input type="text"/>
          
            <label htmlFor="toDate">תאריך לידה: </label>
            <input type="date"/>

            <label htmlFor="eventName">תאריך פטירה: </label>
            <input type="date"/>
            
            <input type="checkbox"/>

            <label htmlFor="fromDate">אמייל</label>
            <input type="email"/>             
        </form> 
        }
        <button onClick={addNewNode}>הוסף בן אדם חדש</button>
        <datalist id="ice-cream-flavors" >
          <option value="Chocolate"/>
          <option value="Coconut"/>
          <option value="Mint"/>
          <option value="Strawberry"/>
          <option value="Vanilla"/>
        </datalist>
      </ModalBody>
      <ModalFooter>

        <Button color="primary" onClick={console.log('save')}>
          שמור
        </Button>
        <Button color="secondary" onClick={console.log('close')}>
          סגור
        </Button>
      </ModalFooter>
    </Modal>
    </div>
  );
}

export default Pedigree;