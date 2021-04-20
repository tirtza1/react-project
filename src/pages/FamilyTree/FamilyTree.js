import React from 'react'
import Tree from 'react-d3-tree'
import swalReact from '@sweetalert/with-react'
import swal from 'sweetalert2'
import classes from './Pedigree.module.css'
import './node.css'
import { useHistory } from 'react-router-dom'
import data from './data'

/*
Things to fix:
- in the photos take just the ones that don't start with tree
- put the right photo in the node
- check why it dosent update
*/

function FamilyTree(props) {

    const initialTree = {
        id: 1, 
        name: 'טוען נתונים', 
        attributes: {
            gender: 'male'
        }
    };
    const [treeData, setTreeData] = React.useState(initialTree);
    const [group, setGroup] = React.useState(3);
    const history = useHistory();

    React.useEffect(() => {
        if (treeData === initialTree) {
            fetch(`http://localhost:3003/pedigree/${group}`)
            .then(data => data.json())
            .then(tree => {
                if (tree.length === 0) {
                    swalReact({
                        title: 'יצירת אילן יוחסין',
                        text: 'הכנס את הפרטים שלך',
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
                            createFirstNode(name, gender, birth, death, email);
                        }
                    })
                } else {
                    console.log(tree[0].tree);
                    setTreeData(JSON.parse(tree[0].tree));
                }
            })
            .catch(err => console.log(err))
        }
        
    })

    React.useEffect(() => { 
        fetch(`http://localhost:3003/pedigree`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                tree: JSON.stringify(treeData),
                group: group
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        history.push('/')
        history.push('/pedigree')
    }, [treeData])

    const createFirstNode = (name, gender, birth, death, email) => {
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
        fetch(`http://localhost:3003/createPedigree`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                tree: JSON.stringify(node),
                group: group
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        setTreeData(node);
    }

    //pushes the node changes to treeData
    const editNode = (id, name, gender, birth, death, email, data) => {
        
        if (data.id === id) {
            data.name = name;
            data.attributes.gender = gender;
            data.attributes.birth = birth;
            data.attributes.death = death;
            return data;
        }
        if (data.attributes.spouse && data.attributes.spouse.id === id) {
            data.attributes.spouse.name = name;
            data.attributes.spouse.attributes.gender = gender;
            data.attributes.spouse.attributes.birth = birth;
            data.attributes.spouse.attributes.death = death;
            return data;
        }
        if (data.children === undefined || data.children === null)
            return data;
        for (let i = 0; i < data.children.length; i++) {
            if (data.children[i].id === id) {
                data.children[i].name = name;
                data.children[i].attributes.gender = gender;
                data.children[i].attributes.birth = birth;
                data.children[i].attributes.death = death;
                return data;
            } else {
                editNode(id, name, gender, birth, death, email, data.children[i])
            }
        }
    };

    const addDescendant = (node, data, id) => {
        if (data.id === id || data.attributes.spouse.id === id) {
            data.children.push(node);
            console.log(data);
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
              'accept': 'image/jpeg'
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
        <form className={classes.contentModule}>
            <label className={classes.LabelPedigree}>:שם </label>
            <input 
                id='name' 
                className={classes.InputPedigree} 
                defaultValue={nodeDatum.name}
            />
            <br/>
            <label className={classes.LabelPedigree}>:מגדר</label>
            <br/>
            {
                nodeDatum.attributes.gender === 'male' ?
                <select id='gender' className={classes.select}>
                    <option selected>זכר</option>
                    <option>נקבה</option>
                </select>
                :
                <select id='gender' className={classes.select}>
                    <option>זכר</option>
                    <option selected>נקבה</option>
                </select>
            }
            <br/>
            <br/>
            <label className={classes.LabelPedigree}>:תאריך לידה</label>
            <input 
                type='date' 
                className={classes.InputPedigree} 
                id='birth'
                defaultValue={nodeDatum.attributes.birth}
            />
            <br/>
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
            <br/>
            <label className={classes.LabelPedigree}>:אמייל</label>
            <input 
                type='email' 
                className={classes.InputPedigree} 
                id='email'
                defaultValue={nodeDatum.attributes.email}
            />
            <br/>
        </form>
    );

    //add person form
    const AddModule = () => (
        <form className={classes.contentModule}>
            <label className={classes.LabelPedigree}>:שם</label>
            <input 
                id='name' 
                className={classes.InputPedigree}
            />
            <br/>
            <label className={classes.LabelPedigree}>:מגדר</label>
            <br/>
            <select id='gender' className={classes.select}>
                <option disabled selected>בחר</option>
                <option>זכר</option>
                <option>נקבה</option>
            </select>
            <br/>
            <br/>
            <label className={classes.LabelPedigree}>:תאריך לידה</label>
            <input 
                type='date' 
                className={classes.InputPedigree} 
                id='birth'
            />
             <br/>
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
             <br/>
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
            confirmButtonText: 'בחר',
            showCancelButton: true,
            cancelButtonText: 'ביטול',
            reverseButtons: true,
            confirmButtonColor: '#ef9c83'
        })
        .then((choosen) => {
            if (choosen.value === 'edit') {
                swalReact({
                    title: 'עריכת פרטים',
                    content: 
                    <EditModule nodeDatum={nodeDatum} />,
                    buttons: {
                        cancel: "ביטול",
                        catch: "שמור",
                        
                    },
                    confirmButtonColor: '#ef9c83'
                })
                .then((clicked) => {
                    if (clicked === 'catch') {
                        const name = document.getElementById('name').value;
                        const gender = document.getElementById('gender').value;
                        const birth = document.getElementById('birth').value;
                        const death = document.getElementById('death').value;
                        const email = document.getElementById('email').value;
                        setTreeData(editNode(nodeDatum.id, name, gender, birth, death, email, treeData));
                    }
                })
            }
            if (choosen.value === 'photo') {
                swal.fire({
                    title: 'בחר תמונה חדשה',
                    input: 'file',
                    inputAttributes: {
                      'accept': 'image/jpeg'
                    },
                    confirmButtonText: 'בחר',
                    showCancelButton: true,
                    cancelButtonText: 'ביטול',
                    reverseButtons: true,
                    confirmButtonColor: '#ef9c83'
                })
                .then((choosen) => {
                    if (choosen.isConfirmed) {
                        const img = choosen.value;
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
                        .then(data => window.alert(data))
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
                    confirmButtonText: 'בחר',
                    showCancelButton: true,
                    cancelButtonText: 'ביטול',
                    reverseButtons: true,
                    confirmButtonColor: '#ef9c83'
                })
                .then((add) => {
                    if (add.isConfirmed) {
                        swalReact({
                            title: 'הוספת אדם',
                            content: <AddModule/>,
                            buttons: {
                                cancel: "ביטול",
                                catch: "הוספה",
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
                    }
                })
            }
        })  
    };

    return (
        <div style={{ width: '300vw', height: '200vh' }}>
            {
                treeData ?
                <Tree
                    data={treeData}
                    orientation='vertical'
                    pathFunc='step'
                    zoom='1'
                    zoomable={true}
                  
                    renderCustomNodeElement={(props) => 
                        <g id='con'>
                            <foreignObject width={250} height={250} x={-102} y={-40} >
                                <div>
                                   
                                    <p className={props.nodeDatum.attributes.gender} onClick={() => onNodeClick(props.nodeDatum)}>
                                        {props.nodeDatum.name}
                                        {/* {<img className={classes.image} src={`http://localhost:3003/tree-${props.nodeDatum.id}.jpeg`}/>} */}
                                        </p>
                                    
                                    {
                                        props.nodeDatum.attributes.spouse
                                        ? <p className={props.nodeDatum.attributes.spouse.attributes.gender} onClick={() => onNodeClick(props.nodeDatum.attributes.spouse)}>{props.nodeDatum.attributes.spouse.name}</p>
                                        : null
                                        
                                    }
                                   
                                </div>
                            </foreignObject>
                        </g>
                    }
                />
                : null
            }
        </div>
    );

}

export default FamilyTree;  