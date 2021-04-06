import React, {Component } from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from "react-d3-tree/lib/Tree/types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Node from './node';
import {data} from './data';
import classes from './Pedigree.module.css';
import plusUser from '../../assets/images/user-plus.png'
import camera from '../../assets/images/camera.jpg';

function Pedigree(props) {

  const [treeData, setTreeData] = React.useState(data);
  const [firstName, setFirstName] = React.useState('first name');
  const [lastName, setLastName] = React.useState('last name');
  const [birth, setBirth] = React.useState('birth');
  const [death, setDeath] = React.useState('death');
  const [email, setEmail] = React.useState('email');
  const [alive, setAlive] = React.useState(false);
  const [newPerson, setNewPerson] = React.useState('newPerson');
  const [showList, setShowList] = React.useState(false);
  const [dataListValue, setDataListValue] = React.useState('');
  const [count, setCount] = React.useState(0);

  const addPerson = () => {
    const node = {
      id: count,
      name: firstName + " " + lastName,
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

  const addNewNode = (event) => {
    console.log(event)
    console.log(firstName)
    setFirstName('');
    setLastName('');
    setBirth('');
    setDeath('');
    setEmail('');
    setAlive(false);
  }

  const onFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }
  const onLastNameChange = (event) => {
    setLastName(event.target.value);
  }
  const onBirthChange = (event) => {
    setBirth(event.target.value);
  }
  const onDeathChange = (event) => {
    setDeath(event.target.value);
  }
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const onAliveChange = (event) => {
    if(document.getElementById("myCheck").checked === true)
       document.getElementById('deathId').disabled = true;
    else
       document.getElementById('deathId').disabled = false;
  }

 const handleFileInputClick = () =>  {
    const clickOn = document.getElementById("inputFile");
    clickOn.click();
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
      style={{direction:'rtl'}}
      className={classes.contentModal}
    >
      <ModalHeader style={{textAlign:"center"}}>
        {'name'}
      </ModalHeader>
      <ModalBody >
        <div>
          <input 
              type="file" 
              id="inputFile" 
              accept="image/x-png,image/gif,image/jpeg" 
              className={classes.inputFile}
          />
          <button onClick={handleFileInputClick} id="button-camera" className={classes.buttonCamera}>
              <img src={camera} alt="camera" id="camera" className={classes.camera}/>
          </button>
        </div>
        <img src={'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'} alt={'name'} className={classes.ImageUser}/>
        <br/>
        <br/>
       
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

        <br/>
        {
          <form style={{direction:'rtl'}}>
            <label style={{marginLeft:'650px'}} className={classes.LablePedigree}>שם פרטי: </label>
            <br/>
            <input  type="text" id="firstName" className={classes.InputPedigree} onChange={onFirstNameChange}/>
            <br/>
            <br/> 
            <label style={{marginLeft:'630px'}} className={classes.LablePedigree}>שם משפחה: </label>
            <br/>
            <input type="text" className={classes.InputPedigree} onChange={onLastNameChange}/>
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
            <input type="date" className={classes.InputPedigree} onChange={onBirthChange}/>
            <br/>
           
            <br/> 
            <input style={{marginLeft:'10px'}} type="checkbox" id="myCheck" onChange={onAliveChange} />
            <label className={classes.LablePedigree} style={{marginLeft:'670px'}}>חי</label>
            <br/>
            <br/>
            <label style={{marginLeft:'620px'}} className={classes.LablePedigree}>תאריך פטירה: </label>
            <br/>
            <input  id="deathId" disabled={false} type="date" className={classes.InputPedigree} onChange={onDeathChange}/>
            <br/>
            <br/>
            <label style={{marginLeft:'665px'}} className={classes.LablePedigree}>אימייל:</label>
            <br/>
            <input type="email" className={classes.InputPedigree} onChange={onEmailChange}/>     
            <br/>        
        </form> 
        }
        
      </ModalBody>
      <ModalFooter>

        <Button color="primary" >
          שמור
        </Button>
        <Button color="secondary" >
          סגור
        </Button>
      </ModalFooter>
    </Modal>
    </div>
  );
}

export default Pedigree;