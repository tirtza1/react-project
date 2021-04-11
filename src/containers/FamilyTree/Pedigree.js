import React, {Component } from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from "react-d3-tree/lib/Tree/types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Node from './node';
import './pedigree.css';
import {data} from './data';
import plusUser from '../../assets/images/user-plus.png'
import camera from '../../assets/images/camera.jpg';
import Swal from 'sweetalert2';

const findNode = (id, data, name) => {
   
  if (data.children === undefined || data.children === null) {
    return;
  }

  for (let i = 0; i < data.children.length; i++) {
    if (data.children[i].id === id) {
      data.children[i].name = name;
      return data; 
    } else 
      findNode(id, data.children[i])
  }
}

function Pedigree(props) {

  const [treeData, setTreeData] = React.useState(data);
  const [name, setName] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [death, setDeath] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [alive, setAlive] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [dataListValue, setDataListValue] = React.useState('');
  const [count, setCount] = React.useState(0);

  //handle image click
  const handleImageClick = (event) => {
    console.log('image was clicked');
  }

  //on node click handler
  const onNodeClick = (nodeDatum) => {

    console.log('You just click on: ', nodeDatum);
    Swal.fire({
      title: nodeDatum.name,
      html:`
        <Modal
          size='lg'
          centered
          style="direction:rtl;"
        >
  
        <ModalBody>
            <div>
              <input 
                  type="file" 
                  id="inputFile" 
                  accept="image/x-png,image/gif,image/jpeg" 
                  class="inputFile"
              />
              <button onclick="handleImageClick()" id="button-camera" class="buttonCamera">
                  <img src=${camera} alt="camera" id="camera" class="camera"/>
              </button>
            </div>
            <img src='https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340' alt='name' class='ImageUser'/>
            <br/><br/>
          
            <div class="dropdown">
                <button id="button-Plus-User" class="buttonPlusUser">
                  <img src=${plusUser} alt="plususer" id="plusUser" class="plusUser"/>
                </button>
                <div class="dropdownContent">
                  <button onclick="console.log('add new node')" id="father">אבא</button>
                  <button onclick="console.log('add new node')" id="mother">אמא</button>
                  <button onclick="console.log('add new node')" id="brother">אח</button>
                  <button onclick="console.log('add new node')" id="sister">אחות</button>
                  <button onclick="console.log('add new node')" id="son">ילד </button>
                  <button onclick="console.log('add new node')" id="daughter">ילדה</button>
                  <button onclick="console.log('add new node')" id="husband">בעל</button>
                  <button onclick="console.log('add new node')" id="wife">אישה</button>
                
                </div>
              </div>
  
            <br/>
              <form style="direction:rtl;">
                <label style="margin-left:650px;" class="LablePedigree">שם : </label>
                <br/>
                <input  type="text" id="name" class="InputPedigree" placeholder=${nodeDatum.name}/>
                <br/>
                <br/>
                <label style="margin-left:675px;" class="LablePedigree">מגדר: </label>
                <br/>
                <input  type="radio"  id="male" name="gender" value="male"/>
                <label  class="LablePedigree">זכר </label>
              
                <input type="radio"  id="female" name="gender" value="female"/>
                <label class="LablePedigree">נקבה </label>
              
                <br/>
                <br/>
                <label style="margin-left:635px;" class="LablePedigree">תאריך לידה: </label>
                <br/>
                <input type="date" class="InputPedigree" />
                <br/>
              
                <br/> 
                <input style="margin-left:10px;" type="checkbox" id="myCheck" checked=${alive}/>
                <label class="LablePedigree" style="margin-left:670px;">חי</label>
                <br/>
                <br/>
                <label style="margin-left:620px;" class="LablePedigree">תאריך פטירה: </label>
                <br/>
                <input  id="deathId" disabled={false} type="date" class="InputPedigree" />
                <br/>
                <br/>
                <label style="margin-left:665px;" class="LablePedigree">אימייל:</label>
                <br/>
                <input type="email" class="InputPedigree" />     
                <br/>        
            </form>
          </ModalBody>
        </Modal>`,
      confirmButtonText: 'שמור שינויים',
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      preConfirm: function () {
          const name = document.getElementById('name').value;
          const updatedData = findNode(nodeDatum.id, data, name);
          setTreeData(updatedData);
      }
    })
  }

  //if the new node is a wife, inserts the node to the right place
  const addWife = (id, data, node) => {
   
    if (data.children.length === 0) 
      return;

    for (let i = 0; i < data.children.length - 1; i++) {
      if (data.children[i].id === id) {
        data.children[i].spouse = node;
        return; 
      } else 
        addWife(id, data.children[i])
    }
    
  }

  //creates a new node and adds it to the tree
  const addNewNode = () => {
    const node = {
      id: count,
      name: name,
      attributes: {
        gender: '',
        birth: birth,
        death: death,
        email: email
      }
    }

    setCount(count + 1);

    //do this just on submit
    switch(dataListValue) {
      case 'father': 
        node["children"] = data;
        setTreeData(node);
        break;
      case 'mother': 
        node["children"] = data;
        setTreeData(node);
        setTreeData();
        break;
      case 'wife': 
      //set in the attributes the wife
        setTreeData();
        break;
      case 'husband': 
        setTreeData();
        break;
      case 'son': 
        //create a child
        setTreeData();
        break;
      case 'daughter': 
        setTreeData();
        break;
      case 'brother': 
        //create a sibling
        setTreeData();
        break;
      case 'sister': 
        setTreeData();
        break;
    }
  }

  //change the name state
  const onNameChange = (event) => {
    setName(event.target.value);
  }

  //change the birth state
  const onBirthChange = (event) => {
    setBirth(event.target.value);
  }

  //change the death state
  const onDeathChange = (event) => {
    setDeath(event.target.value);
  }

  //change the email state
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  //change the alive state
  const onAliveChange = (event) => {
    if(document.getElementById("myCheck").checked === true) {
       document.getElementById('deathId').disabled = true;
       setAlive(true);
    } else {
       document.getElementById('deathId').disabled = false;
       setAlive(false);
    }
  }

  //add a picture to node
  const handleFileInputClick = () =>  {
      const clickOn = document.getElementById("inputFile");
      clickOn.click();
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }} >
      <Tree
        data={treeData}
        depthFactor={130}
        orientation='vertical'
        pathFunc="step"
        renderCustomNodeElement={(props) => 
        <g id="con">
          <foreignObject width={250} height={250} x={-102} y={-40} onClick={() => onNodeClick(props.nodeDatum)}>
            <div >
              <p className={props.nodeDatum.attributes.gender} >{props.nodeDatum.name}</p>
              {
                props.nodeDatum.attributes.spouse 
                ? <p className={props.nodeDatum.attributes.gender}>{props.nodeDatum.attributes.spouse.name}</p> 
                : null
              }
            </div>
          </foreignObject>
        </g>
        }
      />
    </div>
  );
}

export default Pedigree;