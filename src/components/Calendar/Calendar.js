import React ,{Component}from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'
import classes from './Calendar.module.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from '../UI/Input/Input'

//דברים שאפשר להוסיף
//כשלוחצים על תאריך בלוח זה אוטומטית שם בתאריך התחלה את התאריך שלחצו עליו
//לשנות את הצבעים של הלוח שיתאימו לאתר
export default class Calendar extends Component {
 
  calendarComponentRef = React.createRef();

    state = {
      modal: false,
      calendarWeekends: true,
      eventName:'',
      fromDate:'',
      toDate:'',
      CalendarEvent:[],
      count: 0,
      goToPast:''
     };
 
  onDatePastChange=(input) => (e) => {
    e.preventDefault();
    this.setState({ [input]: e.target.value });
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  //פונקציה המופעלת בזמן לחיצה על תאריך מסוים ופותחת את המודל
  handleDateClick = (eventClickInfo) => {
    this.toggle();
    this.setState(eventClickInfo.event);
    const newdate=( eventClickInfo.date.getFullYear()+"-"+((eventClickInfo.date.getMonth() > 8) ? (eventClickInfo.date.getMonth() + 1) : ('0' + (eventClickInfo.date.getMonth() + 1))) +"-"+ ((eventClickInfo.date.getDate() > 9) ? eventClickInfo.date.getDate() : ('0' + eventClickInfo.date.getDate())));
    this.state.fromDate=newdate;
    document.getElementById('fromDate').placeholder=newdate;
  
  };

  
 
  handleEventClick= (event) => {
    if(window.confirm("Are you sure you want to remove the event date?")) {
      const id = event.event.id;
      let eventsToUpdate = [...this.state.CalendarEvent];
      eventsToUpdate.splice(eventsToUpdate.findIndex(a =>  a.id === event.event.id) ,1 );
      this.setState({CalendarEvent: eventsToUpdate});
    }
  }


  //מוחק אירוע כשלוחצים עליו
  handleEventClick= (eventClickInfo) => { 
    if(window.confirm("Are you sure you want to remove the event date?")) {
      const id = eventClickInfo.event.id;
      let updatedEvents=[...this.state.CalendarEvent]
      for(var i = 0;i < updatedEvents.length; i ++)
      {
        if(updatedEvents[i].id==id)
        {
          updatedEvents.splice(i, 1);
          break;
        }
      }
      this.setState({CalendarEvent: updatedEvents});
  };
}
 
  //מעביר את המיקום של האירוע כשגוררים אותו
  handleEventDrop = (info) => {
   
      //של האירוע id
      const id=info.event.id
      //העתקה של המערך
      let events = [...this.state.CalendarEvent];
      //מציאת אינקס לשינוי תאריך התחלה
      const index= events.findIndex(item => item.id==id)
      //העתקה של האובייקט לשינוי
      let eventToChange = {...events[index]};
     
      const newdate=( info.event.start.getFullYear()+"-"+((info.event.start.getMonth() > 8) ? (info.event.start.getMonth() + 1) : ('0' + (info.event.start.getMonth() + 1))) +"-"+ ((info.event.start.getDate() > 9) ? info.event.start.getDate() : ('0' +info.event.start.getDate())));
      //עדכון תאריך התחלה
      eventToChange.start = newdate;
     //עדכון האובייקט
      events[index] = eventToChange;
      //עדכון של המערך
      this.setState({CalendarEvent: events});
  }

   //כאשר משנים את האינפוט
   inputChange = (event) => {
      this.setState({[`${event.target.id}`]: event.target.value})
   }

   //מוסיף אירוע ומעדכן אותו בלוח השנה
   AddEventHandle=()=>{
     console.log('add event')
    this.setState(prevState => ({
      CalendarEvent: [...prevState.CalendarEvent, {
        id:Date.now(),
        title: this.state.eventName,
        start: this.state.fromDate
      }]
    }))

    this.toggle();
    this.setState({eventName:''})
    this.setState({ count: this.state.count + 1});
   }


   checkValidity=()=>{
     if(this.state.eventName==='')
     {
       alert("שם אירוע זהו שדה חובה")
     }
     else 
     this.AddEventHandle()
   }

   //פונקציה שעוברת לתאריך ברצוי
   gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(this.state.goToPast); // call a method on the Calendar object
  };

 
  render() { 

    return (
      <div className={classes.calendarContent}>
          <input
            type='date'
            name='goToPast'
            value={this.state.goToPast}
            onChange={this.onDatePastChange('goToPast')}
            className={classes.InputDatePast}
            />
          <label className={classes.label}>בחר תאריך:</label> 
          <br/><br/><br/>
          <button onClick={this.gotoPast} className={classes.button}>עבור </button>
          <br/> <br/> 
          <FullCalendar
          height={'860px'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            ref={this.calendarComponentRef}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            
            }}
            customButtons={{
              custom: {
                text: 'custom 1',
                click() {
                  this.gotoPast();
                },
              },
            }}
            editable={true}
            eventBackgroundColor={"#EF9C83"}
            eventBorderColor={"#EF9C83"}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            droppable= {true}
            weekends={this.state.calendarWeekends}
            dateClick={this.handleDateClick}
            eventDrop={this.handleEventDrop}
            eventClick={this.handleEventClick}
            events={this.state.CalendarEvent}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
          />
         <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              size='lg'
              centered
            
            >
              <ModalHeader toggle={this.toggle} style={{ fontWeight:'bold', fontSize:'large',marginLeft:'590px'}} >
                :הוסף אירוע 
              </ModalHeader>
             <hr/>
              <ModalBody>
               {
                  <form className={classes.form}>
                          <label className={classes.LableCalendar}  htmlFor="eventName"  >:שם אירוע</label>
                           <br/>
                          <input className={classes.InputCalendar} type="text"  placeholder="שם אירוע"  name="eventName"  onChange={this.inputChange}  id="eventName" required/>
                          <br/>
                          <br/>
                          <label className={classes.LableCalendar}  htmlFor="fromDate">:תאריך </label>
                          <br/>
                          <input className={classes.InputCalendar} type="text" placeholder="Enter from date" name="fromDate" onChange={this.inputChange} id="fromDate" />
                          <br/>
                </form> }
  
              </ModalBody>
              <ModalFooter style={{marginRight:'280px'}}>
          
                <button  onClick={this.checkValidity} className={classes.button}>
                   הוסף
                </button>
                <button  onClick={this.toggle} className={classes.button}>
                 סגור
                </button>
              </ModalFooter>
        </Modal>
      </div>
    )
    
  }
  
}
