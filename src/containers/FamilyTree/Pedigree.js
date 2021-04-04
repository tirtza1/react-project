import React, {Component } from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from "react-d3-tree/lib/Tree/types";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Node from './node';
import {data} from './data';
import classes from './Pedigree.module.css';
import plusUser from '../../assets/images/user-plus.png'

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
    setFirstName('');
    setLastName('');
    setBirth('');
    setDeath('');
    setEmail('');
    setAlive(false);

    setShowList(!showList);
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
    document.getElementById('deathId').disabled = true;
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
    >
      <ModalHeader style={{textAlign:"center"}}>
        {'name'}
      </ModalHeader>
      <ModalBody>
        <img src={'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340'} alt={'name'} className={classes.ImageUser}/>
        <br/>
        <br/>
        <button onClick={addNewNode} id="buttonPlusUser" className={classes.buttonPlusUser}>
          <img src={plusUser} alt="plususer" id="plusUser" className={classes.plusUser}/>
        </button>
          <datalist id="family" style={{ width: '100px', height: '100px', zIndex: '99' }}>
            <option value="father">אבא</option>
            <option value="mother">אמא</option>
            <option value="brother">אח</option>
            <option value="sister">אחות</option>
            <option value="daughter">בת</option>
            <option value="son">בן</option>
            <option value="Partner">בן זוג</option>
          </datalist>
        <br/>
        {
          <form >
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
            <label style={{marginLeft:'635px'}} className={classes.LablePedigree}>תאריך לידה: </label>
            <br/>
            <input type="date" className={classes.InputPedigree} onChange={onBirthChange}/>
            <br/>
            <br/>
            <label style={{marginLeft:'620px'}} className={classes.LablePedigree}>תאריך פטירה: </label>
            <br/>
            <input  id="deathId" disabled={false} type="date" className={classes.InputPedigree} onChange={onDeathChange}/>
            <br/>
            <br/> 
            <input style={{marginLeft:'10px'}} type="checkbox" id="mycheck" onChange={onAliveChange} />
            <label className={classes.LablePedigree} style={{marginLeft:'670px'}}>חי</label>
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