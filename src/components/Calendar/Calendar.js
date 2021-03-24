import React ,{Component}from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'
import classes from './Calendar.module.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Input from '../UI/Input/Input'


export default class Calendar extends Component {
 
   calendarComponentRef = React.createRef();

    state = {
      modal: false,
      calendarWeekends: true,
      eventName:'',
      fromDate:'',
      toDate:'',
      CalendarEvent:[],
     

     };
  
 
 

  toggle = () => {
  
    this.setState({ modal: !this.state.modal });
  };

  handleDateClick = ({ event, el }) => {
    this.toggle();
    this.setState({ event });
  };
  

  handleEventClick= ({event}) => {
    console.log( this.state.CalendarEvent[event])
    console.log(event.id)

    if(window.confirm("Are you sure you want to remove the event date?")){
      this.state.CalendarEvent[event].remove()
      console.log('event remove!')

   
   }
  }
    handleEventDrop = (info) => {
        if(window.confirm("Are you sure you want to change the event date?")){
            console.log('change confirmed')

            // updateAppointment is another custom method
            this.updateAppointment({...info.event.extendedProps, start: info.event.start, end: info.event.end})

        } else {
            console.log('change aborted')
        }
   }

   //כאשר משנים את האינפוט
   inputChange = (event) => {
      this.setState({[`${event.target.id}`]: event.target.value})
   }



   //מוסיף אירוע ומעדכן אותו בלוח השנה
   AddEventHandle=(count)=>{
    this.setState(prevState => ({
      CalendarEvent: [...prevState.CalendarEvent, {
        id:count+1,
        title: this.state.eventName,
        start: this.state.fromDate,
        end: this.state.toDate
      }]
    }))

    this.toggle();
   }
  

  
  render() {
   let count=0;
    return (
      <div className={classes.calendarContent}>
       
         <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          ref={this.calendarComponentRef}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          editable={true}
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
              <ModalHeader toggle={this.toggle} style={{ fontWeight:'bold', fontSize:'large'}} >
                :הוסף אירוע 
              </ModalHeader>
              <ModalBody>
               {
                  <form style={{marginLeft:'300px'}}>
                          <label className={classes.LableCalendar} style={{marginLeft:'365px'}} htmlFor="eventName">:שם אירוע</label>
                           <br/>
                          <input className={classes.InputCalendar} type="text"  placeholder="שם אירוע"  name="eventName"  onChange={this.inputChange}  id="eventName"/>
                          <br/>
                          <label className={classes.LableCalendar} style={{marginLeft:'330px'}} htmlFor="fromDate">:תאריך התחלה</label>
                          <br/>
                          <input className={classes.InputCalendar} type="date" placeholder="Enter from date" name="fromDate" onChange={this.inputChange} id="fromDate"/>
                          <br/>
                          <label className={classes.LableCalendar} style={{marginLeft:'355px'}} htmlFor="toDate"> :תאריך סיום</label>
                          <br/>
                          <input className={classes.InputCalendar} type="date" name="toDate" onChange={this.inputChange} id="toDate"/>
                </form> }
  
              </ModalBody>
              <ModalFooter style={{marginRight:'630px'}}>
          
                <Button  color="primary" onClick={this.AddEventHandle}>
                   הוסף
                </Button>
                <Button color="secondary" onClick={this.toggle}>
                 סגור
                </Button>
              </ModalFooter>
            </Modal>
      </div>
    )
  }
}