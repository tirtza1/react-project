import React from 'react'
import  './home.css'
import people from '../../assets/images/circle.png'
import BigTree from '../../assets/images/BigTree.png'
import Calendar from '../../assets/images/Calendar.png'
import Gallery from '../../assets/images/Gallery.png'
import pink from '../../assets/images/pink.PNG'
import phone from '../../assets/images/phone.png'
import mail from '../../assets/images/mail.png'

class Home extends React.Component{

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
                <div id="linkme">
                        <h style={{fontSize:"50px"}}>LINK ME</h><br/>
                        <h style={{fontSize:"25px"}}>ברוכים הבאים לאתר המשפחתי</h>
                 </div>
                <div id="tree">
                     <img src={BigTree} alt={"BigTree"} id="BigTree"/>
                     <h id="ilan">אילן</h>
                     <h id="yuhasin">יוחסין</h>
                     <p id="TreeText" style={{direction:"rtl"}}>בניית אילן יוחסין<br/>
                                    ... בקלות ובמהירות<br/>
                                    תוכלו להוסיף כל קרוב משפחה<br/>
                                    שתרצו לאילן שתבנו ולהזמין אותו<br/>
                                     להשתתף באתר ולהנות מהאילן משפחתי 
                     </p>
                     <button id="b1" btnType="Success" clicked={this.handleClick}>התחל</button>
                </div>
                <div id="calander">
                    <img src={Calendar} alt={"Calendar"} id="CalendarPic"/>
                     <h id="luch">לוח</h>
                     <h id="event">אירועים</h>
                     <p id="CalendarText">לוח אירועים<br/>
                                      בו תוכל להוסיף <br/>  
                                      כל ארוע משפחתי<br/>
                                     שרק תחפוץ והאתר<br/>
                             יתזכר לך על אירועי היום
                                    
                     </p>
                     <button id="b2">הוסף אירוע</button>
                </div>
                <div id="Gallery">
                <img src={Gallery} alt={"Gallery"} id="GalleryPic"/>
                     <h id="gal">גל</h>
                     <h id="ery">ריה</h>
                     <p id="GalleryText">ניתן להוסיף<br/>
                                        תמונות משפחתיות<br/>
                            מכל מיני אירועים ולפרסם אותן<br/>
                                ועל ידי כך תוכלו להתעדכן <br/> 
                                ...בכל הנעשה במשפחתכן המורחבת     
                     </p>
                     <button id="b3">הוסף תמונה</button>
                </div>
                {/* <div id="pink">
                     <img src={pink} alt={"pink"} id="pinkPic"/>
                     <p id="pinkP">הצטרפו אלינו לחויה משפחתית <br/>שטרם הכרתם</p>
                     <button id="b4">הירשם</button>
                </div> */}
                <div id="black">
                    <p id="blackP">רשומים? נהדר!<br/>
                       הכניסו פרטים למעבר<br/>
                        לאיזור האישי שלכם</p>
                    {/* <input>מייל</input>
                    <input>סיסמא</input> */}
                    <button id="b5">התחבר</button>
                    <img src={phone} alt={"phone"} id="phone"/>
                    <label id="l1">Tel: +972 504124407</label>
                    <img src={mail} alt={"mail"} id="mail"/>
                    <label id="l2">info@familink.com</label>
                </div>
                <p id="end" >&copy 2021 by TirTza Barzilay & Hani Abu</p>
                <br/>
                <br/>

            </div>
        );
    }
}

export default Home