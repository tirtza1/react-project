import React, {Component } from 'react';
import Tree from 'react-d3-tree';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './Pedigree.module.css';
import './node.css';
import {data} from './data';
import plusUser from '../../assets/images/user-plus.png';
import camera from '../../assets/images/camera.jpg';
import Swal from '@sweetalert/with-react';


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
    Swal({
      content:
      <div>
        <div>
          <input 
            type="file" 
            id="inputFile" 
            accept="image/x-png,image/gif,image/jpeg" 
            className={classes.inputFile}
          />
          <button 
            onClick={() => console.log('abc')} 
            id="button-camera" 
            className={classes.buttonCamera}
          >
            <img src={camera} alt="camera" id="camera" className={classes.camera}/>
          </button>
        </div>
        <img 
          src={'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'} 
          alt={'name'} 
          className={classes.ImageUser}
        />
        <div className={classes.dropdown}>
          <button id="button-Plus-User" className={classes.buttonPlusUser}>
            <img src={plusUser} alt="plususer" id="plusUser" className={classes.plusUser}/>
          </button>
          <div className={classes.dropdownContent}>
            <button onClick={addNewNode} id="father">אבא</button>
            <button onClick={addNewNode} id="mother">אמא</button>
            <button onClick={addNewNode} id="brother">אח</button>
            <button onClick={addNewNode} id="sister">אחות</button>
            <button onClick={addNewNode} id="son">ילד </button>
            <button onClick={addNewNode} id="daughter">ילדה</button>
            <button onClick={addNewNode} id="husband">בעל</button>
            <button onClick={addNewNode} id="wife">אישה</button>
          </div>
        </div>
        <form style={{direction:'rtl'}}>
          <label style={{marginLeft:'650px'}} className={classes.LablePedigree}>שם : </label>
          <br/>
          <input  type="text" id="name" className={classes.InputPedigree} placeholder={nodeDatum.name} onChange={onNameChange}/>
          <br/>
          <br/>
          <label style={{marginLeft:'675px'}} className={classes.LablePedigree}>מגדר: </label>
          <br/>
          <input  type="radio"  id="male" name="gender" value="male"/>
          <label  className={classes.LablePedigree}>זכר </label>
          <input type="radio"  id="female" name="gender" value="female"/>
          <label className={classes.LablePedigree}>נקבה </label>
          <br/>
          <br/>
          <label style={{marginLeft:'635px'}} className={classes.LablePedigree}>תאריך לידה: </label>
          <br/>
          <input type="date" className={classes.InputPedigree} />
          <br/>
          <br/> 
          <input style={{marginLeft:'10px'}} type="checkbox" id="myCheck" />
          <label className={classes.LablePedigree} style={{marginLeft:'670px'}}>חי</label>
          <br/>
          <br/>
          <label style={{marginLeft:'620px'}} className={classes.LablePedigree}>תאריך פטירה: </label>
          <br/>
          <input  id="deathId" disabled={false} type="date" className={classes.InputPedigree} />
          <br/>
          <br/>
          <label style={{marginLeft:'665px'}} className={classes.LablePedigree}>אימייל:</label>
          <br/>
          <input type="email" className={classes.InputPedigree} />     
          <br/>        
        </form>
      </div>,
      buttons: true,
    });
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
  const addNewNode = (event) => {
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

  //change the gender state
  const onGenderChange = (event) => {
    setGender(event.target.value);
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