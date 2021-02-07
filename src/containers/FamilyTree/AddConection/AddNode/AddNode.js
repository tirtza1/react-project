import React ,{Component} from "react";
import classes from './AddNode.module.css'
import Backdrop from '../../../../components/UI/Backdrop/Backdrop'
const addnode=()=>
{
    return(
        <Backdrop show='true'>
            <div className={classes.AddButton}>
                <button >הורה</button>
                <button>ילד/ה</button>
                <button>בן/בת זוג</button>
                <button>אח/ות</button>
            </div>
        </Backdrop>
    )

};
export default addnode;