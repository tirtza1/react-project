import React from 'react'
import Tree from 'react-d3-tree'
import swalReact from '@sweetalert/with-react'
import swal from 'sweetalert2'
import classes from './Pedigree.module.css'
import './node.css'
import { data } from './data'
import plusUser from '../../assets/images/user-plus.png'
import camera from '../../assets/images/camera.jpg'

/*
Things to fix:
- how to start the page?
- when I click on a supouse it shows the other one
- in the photos take just the ones that don't start with tree
- put the right photo in the node
- check why it dosent update
*/

function FamilyTree(props) {

    const [treeData, setTreeData] = React.useState(data);
    const [group, setGroup] = React.useState(1);

    React.useEffect(() => {
        // fetch(`http://localhost:3003/pedigree/${group}`)
        // .then(data => data.json())
        // .then(tree => console.log(tree[0]))
        // .catch(err => console.log(err))

        fetch(`http://localhost:3003/pedigree`, {
            method: 'POST',
            body: JSON.stringify({
                tree: treeData,
                group: group
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    })

    //pushes the node changes to treeData
    const editNode = (id, name, gender, birth, death, email, data) => {
        if (data.children === undefined || data.children === null)
            return data;
        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].id === id) {
                data.children[i].name = name;
                data.children[i].attributes.gender = gender;
                data.children[i].attributes.birth = birth;
                data.children[i].attributes.death = death;
                data.children[i].attributes.email = email;
                return data;
            } else {
                editNode(id, name, gender, birth, death, email, data.children[i])
            }
        }
    };

    const addDescendant = (node, data, id) => {
        if (data.id === id || data.attributes.spouse.id === id) {
            data.children.push(node);
            return data;
        }
        
        if (data.children === undefined || data.children === null)
            return data;

        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].id === id || data.children[i].attributes.spouse.id === id) {
                data.children[i].children.push(node);
                return data;
            } else {
                addDescendant(node, data.children[i], id);
            }
        }
    }

    const addSpouse = (node, data, id) => {
        console.log(data);
        if (data.id === id) {
            if (data.attributes.spouse.length) {
                swal.fire({
                    icon: 'error',
                    text: 'אין אפשרות להוסיף',
                    confirmButtonText: 'אישור',
                    confirmButtonColor: '#ef9c83'
                });
                return;
            } 
            data.attributes.spouse = node;
            return data;
        }
        if (data.children === undefined || data.children === null) 
            return data;
        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].id === id) {
                if (data.children[i].attributes.spouse.length) {
                    swal.fire({
                        icon: 'error',
                        text: 'אין אפשרות להוסיף',
                        confirmButtonText: 'אישור',
                        confirmButtonColor: '#ef9c83'
                    });
                    return;
                }
                data.children[i].spouse = node;
                return data;
            } else {
                addSpouse(node, data.children[i], id);
            }
        }
    }

    const addSibling = (node, data, id) => {

        if (data.id === id || data.attributes.spouse && data.attributes.spouse.id === id) {
            swal.fire({
                icon: 'error',
                text: 'אין אפשרות להוסיף',
                confirmButtonText: 'אישור',
                confirmButtonColor: '#ef9c83'
            });
            return data;
        }
        
        if (data.children === undefined || data.children === null)
            return data;

        for (let i = 0; i < data.children.length; i++) {
            console.log(data.children[i].id, id);
            if (data.children[i].id === id || (data.children[i].attributes.spouse && data.children[i].attributes.spouse.id === id)) {
                data.children.push(node);
                return data;
            } else {
                addSibling(node, data.children[i], id);
            }
        }
    }

    //adds a node to data
    const addNode = (id, name, gender, birth, death, email, type) => {
        const node = {
            id: Date.now(),
            name: name,
            attributes: {
                gender: gender,
                birth: birth,
                death: death,
                email: email
            },
            children: [],
        };

        switch(type) {
            case 'parent':
                if (id === treeData.id || id === treeData.attributes.spouse.id) {
                    node['children'] = treeData;
                    setTreeData(node);
                } else {
                    swal.fire({
                        icon: 'error',
                        text: 'אין אפשרות להוסיף',
                        confirmButtonText: 'אישור',
                        confirmButtonColor: '#ef9c83'
                    });
                    return;
                }
                break;
            case 'descendant':
                setTreeData(addDescendant(node, treeData, id));
                break;
            case 'spouse':
                setTreeData(addSpouse(node, treeData, id));
                break;
            case 'sibling':
                setTreeData(addSibling(node, treeData, id));
                break;
        }
        swal.fire({
            title: 'הוספת תמונה',
            input: 'file',
            inputAttributes: {
              'accept': 'image/*'
            },
            confirmButtonColor: '#ef9c83',
            confirmButtonText: 'בחר',
            showCancelButton: true,
            cancelButtonText: 'ביטול',
            reverseButtons: true
        })
        .then((file) => {
            if (file.value) {
                const img = file.value;
                const type = img.type.split('/')[1];
                const name = `tree-${id}.${type}`;
                var formData = new FormData;
                formData.append('photo', img, name);
                fetch('http://localhost:3003/pictures', {
                method: 'POST',
                body: formData
                })
                .then(data => console.log(data))
                .catch(err => console.log(err))

                //add the picture to the pictures table
                fetch('http://localhost:3003/addpicture', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        name: name,
                        group: group
                    })
                })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(err => console.log(err))
            }
        })


    }

    //edit form that is shown when the user decides to edit a node's info
    const EditModule = ({nodeDatum}) => (
        <form style={{direction: 'rtl'}}>
            <label className={classes.LabelPedigree}>שם: </label>
            <input 
                id='name' 
                className={classes.InputPedigree} 
                defaultValue={nodeDatum.name}
            />
            <label className={classes.LabelPedigree}>מגדר</label>
            {
                nodeDatum.attributes.gender === 'male' ?
                <select id='gender'>
                    <option selected>זכר</option>
                    <option>נקבה</option>
                </select>
                :
                <select id='gender'>
                    <option>זכר</option>
                    <option selected>נקבה</option>
                </select>
            }
            <label className={classes.LabelPedigree}>:תאריך לידה</label>
            <input 
                type='date' 
                className={classes.InputPedigree} 
                id='birth'
                defaultValue={nodeDatum.attributes.birth}
            />
            {/* {<label className={classes.LabelPedigree}>?חי</label>
            <input 
                type='checkbox' 
                id='myCheck '
                onChange={() => console.log('alive was changed')}
            />} */}
            <label className={classes.LabelPedigree}>:תאריך פטירה</label>
            <input 
                id='deathId' 
                disabled={false} 
                type='date' 
                className={classes.InputPedigree} 
                id='death'
                defaultValue={nodeDatum.attributes.death}
            />
            <label className={classes.LabelPedigree}>:אמייל</label>
            <input 
                type='email' 
                className={classes.InputPedigree} 
                id='email'
                defaultValue={nodeDatum.attributes.email}
            />
        </form>
    );

    //add person form
    const AddModule = () => (
        <form style={{direction: 'rtl'}}>
            <label className={classes.LabelPedigree}>שם: </label>
            <input 
                id='name' 
                className={classes.InputPedigree}
            />
            <select id='gender'>
                <option disabled selected>:מגדר</option>
                <option>זכר</option>
                <option>נקבה</option>
            </select>
            <label className={classes.LabelPedigree}>:תאריך לידה</label>
            <input 
                type='date' 
                className={classes.InputPedigree} 
                id='birth'
            />
            {/* {<label className={classes.LabelPedigree}>?חי</label>
            <input 
                type='checkbox' 
                id='myCheck '
                onChange={() => console.log('alive was changed')}
            />} */}
            <label className={classes.LabelPedigree}>:תאריך פטירה</label>
            <input 
                id='deathId' 
                disabled={false} 
                type='date' 
                className={classes.InputPedigree} 
                id='death'
            />
            <label className={classes.LabelPedigree}>:אמייל</label>
            <input 
                type='email' 
                className={classes.InputPedigree} 
                id='email'
            />
        </form>
    );

    //node click handler
    const onNodeClick = (nodeDatum) => {

        //shows a module with action to choose
        swal.fire({
            title: 'בחר את הפעולה שברצונך לבצע',
            input: 'select',
            inputOptions: {
              'edit': 'עריכת פרטים',
              'photo': 'בחירת תמונה חדשה',
              'add': 'הוספת אדם'
            },
            confirmButtonColor: '#ef9c83',
            confirmButtonText: 'בחר',
            showCancelButton: true,
            cancelButtonText: 'ביטול',
            reverseButtons: true
        })
        .then((choosen) => {
            if (choosen.value === 'edit') {
                swalReact({
                    title: 'עריכת פרטים',
                    content: 
                    <EditModule nodeDatum={nodeDatum} />,
                    buttons: {
                        cancel: "ביטול",
                        catch: "שמור"
                    }
                })
                .then((clicked) => {
                    if (clicked === 'catch') {
                        const name = document.getElementById('name').value;
                        const gender = document.getElementById('gender').value;
                        const birth = document.getElementById('birth').value;
                        const death = document.getElementById('death').value;
                        const email = document.getElementById('email').value;
                        setTreeData(editNode(nodeDatum.id, name, gender, birth, death, email, treeData));
                        //send the information to the server and then pull it out
                    }
                })
            }
            if (choosen.value === 'photo') {
                swal.fire({
                    title: 'בחר תמונה חדשה',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/*'
                    },
                    confirmButtonColor: '#ef9c83',
                    confirmButtonText: 'בחר',
                    showCancelButton: true,
                    cancelButtonText: 'ביטול',
                    reverseButtons: true
                })
                .then((file) => {
                    if (file.value) {
                        const img = file.value;
                        const type = img.type.split('/')[1];
                        const name = `tree-${nodeDatum.id}.${type}`;
                        var formData = new FormData;
                        formData.append('photo', img, name);
                        fetch('http://localhost:3003/pictures', {
                        method: 'POST',
                        body: formData
                        })
                        .then(data => console.log(data))
                        .catch(err => console.log(err))

                        //add the picture to the pictures table
                        fetch('http://localhost:3003/addpicture', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                name: name,
                                group: group
                            })
                        })
                        .then(response => response.text())
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                    }
                })
            }
            if (choosen.value === 'add') {
                swal.fire({
                    title: '?מה תרצה להוסיף',
                    input: 'select',
                    inputOptions: {
                      'parent': 'אבא / אמא',
                      'spouse': 'בן / בת זוג',
                      'descendant': 'בן / בת',
                      'sibling': 'אח / אחות'
                    },
                    confirmButtonColor: '#ef9c83',
                    confirmButtonText: 'בחר',
                    showCancelButton: true,
                    cancelButtonText: 'ביטול',
                    reverseButtons: true
                })
                .then((add) => {
                    swalReact({
                        title: 'הוספת אדם',
                        content: <AddModule/>,
                        buttons: {
                            cancel: "ביטול",
                            catch: "הוספה"
                        }
                    })
                    .then((clicked) => {
                        if (clicked === 'catch') {
                            const name = document.getElementById('name').value;
                            const gender = document.getElementById('gender').value;
                            const birth = document.getElementById('birth').value;
                            const death = document.getElementById('death').value;
                            const email = document.getElementById('email').value;
                            addNode(nodeDatum.id, name, gender, birth, death, email, add.value);
                        }
                    })
                })
            }
        })  
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Tree
            data={treeData}
            depthFactor={130}
            orientation='vertical'
            pathFunc='step'
            renderCustomNodeElement={(props) => 
                <g id='con'>
                    <foreignObject width={250} height={250} x={-102} y={-40} onClick={() => onNodeClick(props.nodeDatum)}>
                        <div>
                            <p className={props.nodeDatum.attributes.gender}>{props.nodeDatum.name}</p>
                            {
                                props.nodeDatum.attributes.spouse
                                ? <p className={props.nodeDatum.attributes.spouse.attributes.gender}>{props.nodeDatum.attributes.spouse.name}</p>
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

export default FamilyTree;