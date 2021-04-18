import React ,{Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction'
import classes from './Calendar.module.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
    count: 0
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleDateClick = ({ event, el }) => {
    this.toggle();
    this.setState({ event });
  };

  //מוחק אירוע כשלוחצים עליו
  handleEventClick= (event) => { 
    if(window.confirm("Are you sure you want to remove the event date?")) {
      const id = event.event.id;
      const updatedEvents = this.state.CalendarEvent.filter(function(event) {
        return event.id != id
      });
      this.setState({CalendarEvent: updatedEvents});
   }
  };
 
  //מעביר את המיקום של האירוע כשגוררים אותו
  handleEventDrop = (info) => {
      console.log(info.event.start)
      let events = [...this.state.CalendarEvent];
      let eventToChange = {...events[info.event.id]};
      eventToChange.start = info.event.start;
      eventToChange.end = info.event.end;events[info.event.id] = eventToChange;
      this.setState({CalendarEvent: events});
  }

   //כאשר משנים את האינפוט
   inputChange = (event) => {
      this.setState({[`${event.target.id}`]: event.target.value})
   }

   //מוסיף אירוע ומעדכן אותו בלוח השנה
   AddEventHandle=(count)=>{
    this.setState(prevState => ({
      CalendarEvent: [...prevState.CalendarEvent, {
        id:Date.now(),
        title: this.state.eventName,
        start: this.state.fromDate,
        end: this.state.toDate
      }]
    }))

    this.toggle();
    this.setState({ count: this.state.count + 1});
   }
  
  render() {
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
            </form> 
          }
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