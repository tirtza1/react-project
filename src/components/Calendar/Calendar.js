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
      CalendarEvent:[]

      /*events:{
          EventName: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'שם אירוע'
              },
              value: '',
              validation: {
                  required: true,
              },
              valid: false,
              touched: false
          },
          EventDate: {
            elementType: 'input',
            elementConfig: {
                type: 'datetime-local',
                placeholder:'תאריך'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
          },
          EventDescription: {
            elementType: 'textarea',
             elementConfig: {
                type: 'text',
                placeholder:'תיאור...'
             },
             value: '',
             valid: false,
             touched: false
          }
        },*/
     };
  
 
 

  toggle = () => {
  
    this.setState({ modal: !this.state.modal });
  };

  handleDateClick = ({ event, el }) => {
    this.toggle();
    this.setState({ event });
  };
  

  handleEventClick= ({event}) => {
    // openAppointment is a function I wrote to open a form to edit that appointment
    this.props.openAppointment(event.extendedProps)
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

   //מוסיף אירוע ומעדכן אותו בלוח השנה
   AddEventHandle=()=>{
     console.log('guyvg')
     
    this.setState(prevState => 
      ({CalendarEvent:[...prevState.CalendarEvent,this.state.CalendarEvent.push(
          {
          title: this.state.eventName,
          start: this.state.fromDate,
          end: this.state.toDate,
          } 
        ) 
       ]
  }))
  
   }
  
  /*
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

inputChangedHandler = (event1, evtName) => {
    const updatedEvent = {
        ...this.state.events,
        [ evtName]: {
            ...this.state.events[evtName],
            value: event1.target.value,
            valid: this.checkValidity(event1.target.value, this.state.events[ evtName].validation),
            touched: true
        }
    };
    this.setState({events: updatedEvent});
}
*/
  
  render() {
    /*
    const formElementsArray = [];
        for ( let key in this.state.events ) {
            formElementsArray.push( {
                id: key,
                config: this.state.events[key]
            } );
        }
         
        const form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event1 ) => this.inputChangedHandler( event1, formElement.id )} />
               
        ) );
        */
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
              <ModalHeader toggle={this.toggle} style={{textAlign:"center"}}>
                :הוסף אירוע 
              </ModalHeader>
              <ModalBody>
               {
                  <form>
                    
                          <label for="fromDate">Event Name:</label>
                          <input type="text" placeholder="Enter event" name="eventName"/>
                    
                          <label for="fromDate">From:</label>
                          <input type="date" placeholder="Enter from date" name="fromDate"/>
                        
                          <label for="toDate">To:</label>
                          <input type="date" name="toDate"/>
                
                         
                </form> }
  
              </ModalBody>
              <ModalFooter>
          
                <Button color="primary" onClick={this.AddEventHandle}
                  >
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