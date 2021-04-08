import React from 'react'
import  './groupHome.css'
import people from '../../assets/images/circle.png'

class GroupHome extends React.Component{

    render() {
        return(
            <div>
                <div id="home">
                    <img src={people} alt={"people"} id="people"/>
                    <p id="people2">
                        <h1 style={{fontSize:"70px"}}>family </h1>
                        <h3 style={{fontSize:"40px"}}>is not an important thing.<br/>
                            It's everything....</h3><br/>
                        <h5 style={{fontSize:"15px"}}>Unlock Marketing Secrets That Work</h5>
                    </p>
                </div>
                <div id="tree"></div>
                <div id="calander"></div>
                <div id="gallery"></div>
            </div>
        );
    }
}

export default GroupHome
