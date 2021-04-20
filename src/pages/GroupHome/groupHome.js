import React from 'react'
import people from '../../assets/images/circle.png'
import './groupHome.css'
import image from '../../assets/images/home-image.png'
import tree from '../../assets/images/home-tree.png'
import calendar from '../../assets/images/home-calendar.png'
import { Link } from 'react-router-dom'
import one from '../../assets/images/1.PNG'
import two from '../../assets/images/2.PNG'
import three from '../../assets/images/3.PNG'
import Swal from 'sweetalert2'
class GroupHome extends React.Component{

    constructor() {
        super();
        this.state = {
            GroupName: null
        }
    }
 
    componentDidMount() {
        Swal.fire({
            title: 'תזכורת',
            titleText: 'היום יום הולדת לנעמה ',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
            width:600,
            heightAuto:700,
            confirmButtonColor:'#ef9c83',
            confirmButtonText:
              '<i class="fa fa-thumbs-up"></i>  תודה ',
            showCloseButton: true,

          })
        fetch(`http://localhost:3003/group/${window.location.href.split('/').pop()}`)
        .then(res => res.json())
        .then(data => this.setState({GroupName: data[0].GroupName}))
        .catch(err => console.log(err))
    }

    handleClick=()=>
    {
        Swal.fire({
            title: 'הזן כתובת מייל להצטרפות לקבוצה ',
            input: 'email',
            confirmButtonColor: '#ef9c83',
            confirmButtonText: 'שלח',
            showCancelButton: true,
            cancelButtonText: 'ביטול',
            reverseButtons: true
        }
            
        )
    }
    render() {
        return(
            <div>
                <div id="Divpink">
                    <h1 id="familyName">{this.state.GroupName}</h1> 
                    <br/>
                    <button className="button" onClick={this.handleClick}>הזמן בני משפחה</button>
                </div>
                <div>
                     <img src={one} id="one" alt="one"/>
                     <img src={two} id="two" alt="two"/>
                     <img src={three} id="three" alt="three"/>
                </div>
                <div id="boxes">
                   
                    <span id="pink-Square">
                        <Link to="/Calendar">
                            <img src={calendar} alt={'calendar'} id="image-box"/>
                            <div className="overlay">
                                <div className="text">הוסף אירוע </div>
                            </div> 
                        </Link>
                    </span>

                    <span id="blue-Square"> 
                   
                       <Link to="/Pedigree">
                            <img src={tree} alt={'tree'} id="image-box"/>
                            <div className="overlay">
                                <div className="text">צור אילן יוחסין</div>
                            </div> 
                       </Link> 
                       
                    </span>

                    <span id="purple-Square">
                        <Link to="/Photo">
                            <img src={image} alt={'image'} id="image-box"/>
                            <div className="overlay">
                                <div className="text">הוסף תמונה</div>
                            </div>
                        </Link> 
                    </span>

                </div>
                <div id="white">

                </div>
            </div>
          
        )
    }
}

export default GroupHome
