import React from 'react'
import people from '../../assets/images/circle.png'
import './home.css'
import image from '../../assets/images/home-image.png'
import tree from '../../assets/images/home-tree.png'
import calendar from '../../assets/images/home-calendar.png'
class Home extends React.Component{
    render() {
        return(
            <div>
                <div id="pink">
                    <p id="people2">
                        <h1 id="family-name">משפחת ברזילי</h1>
                    </p>
                </div>
                <div id="boxes">
                    <span id="pink-Square">
                       <img src={calendar} alt={'calendar'} id="image-box"/>
                        <div class="overlay">
                            <div class="text">הוסף אירוע </div>
                        </div> 
                        
                    </span>

                    <span id="blue-Square"> 
                    <img src={tree} alt={'tree'} id="image-box"/>
                        <div class="overlay">
                            <div class="text">צור אילן יוחסין</div>
                        </div> 
                       
                    </span>

                    <span id="purple-Square">
                        <img src={image} alt={'image'} id="image-box"/>
                        <div class="overlay">
                            <div class="text">הוסף תמונה</div>
                        </div> 
                    </span>

                </div>
            </div>
          
        )
    }
}

export default Home
