import React, { useState} from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';

function TicketControl() {
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainTicketList, setMainTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editing, setEditing] = useState(false);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formVisibleOnPage: false,
  //     mainTicketList: [],
  //     selectedTicket: null,
  //     editing: false
  //   };
  // }

  const handleClick = () => {
    if (selectedTicket != null) {
      setFormVisibleOnPage(false);
      setSelectedTicket(null);
      setEditing(false);
      // this.setState({
      //   // formVisibleOnPage: false,
      //   // selectedTicket: null,
      //   editing: false
      // });
    } else {
      // this.setState(prevState => ({
      //   formVisibleOnPage: !prevState.formVisibleOnPage,
      // }));
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleDeletingTicket = (id) => {
    // const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    const newMainTicketList = mainTicketList.filter(ticket => ticket.id !== id);
    setMainTicketList(newMainTicketList);
    setSelectedTicket(null);
    // this.setState({
    //   // mainTicketList: newMainTicketList,
    //   selectedTicket: null
    // });
  }

  const handleEditClick = () => {
    setEditing(true);
    // this.setState({editing: true});
  }

  const handleEditingTicketInList = (ticketToEdit) => {
    // const editedMainTicketList = this.state.mainTicketList
    //   .filter(ticket => ticket.id !== this.state.selectedTicket.id)
    //   .concat(ticketToEdit);
    const editedMainTicketList = mainTicketList.filter(ticket => ticket.id !== selectedTicket.id).concat(ticketToEdit);
    setMainTicketList(editedMainTicketList);
    setSelectedTicket(null);
    setEditing(false);
    // this.setState({
    //   // mainTicketList: editedMainTicketList,
    //   editing: false,
    //   // selectedTicket: null
    // });
  }

  const handleAddingNewTicketToList = (newTicket) => {
    // const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    const newMainTicketList = mainTicketList.concat(newTicket);
    setMainTicketList(newMainTicketList);
    // this.setState({mainTicketList: newMainTicketList});
    // this.setState({formVisibleOnPage: false});
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedTicket = (id) => {
    // const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    const targetTicket = mainTicketList.filter(ticket => ticket.id === id)[0];
    setSelectedTicket(targetTicket);
    // this.setState({ selectedTicket: selectedTicket });
  }

  //  mainTicketList = [{3}, {4}, {6}];
  //  mainTicketList = [{3}];


  let currentlyVisibleState = null;
  let buttonText = null; 

  if (editing) {      
    currentlyVisibleState = <EditTicketForm ticket = {selectedTicket} onEditTicket = {handleEditingTicketInList} />
    buttonText = "Return to Ticket List";
  } else if (selectedTicket != null) {
    currentlyVisibleState = <TicketDetail 
    ticket={selectedTicket} 
    onClickingDelete={handleDeletingTicket}
    onClickingEdit = {handleEditClick} />
    buttonText = "Return to Ticket List";
  } else if (formVisibleOnPage) {
    currentlyVisibleState = <NewTicketForm onNewTicketCreation={handleAddingNewTicketToList}/>;
    buttonText = "Return to Ticket List"; 
  } else {
    currentlyVisibleState = <TicketList onTicketSelection={handleChangingSelectedTicket} ticketList={mainTicketList} />;
    buttonText = "Add Ticket"; 
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick={handleClick}>{buttonText}</button> 
    </React.Fragment>
  );
}

export default TicketControl;

