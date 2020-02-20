import React, { useReducer, useEffect } from 'react';
import ItemList from './ItemList-with-useReducer';
import {ItemType, ActionType, CombinedStateType} from '../TypeDefinitions'; 
import AddItem from './AddItem';
import EditItem from './EditItem';
import ViewItem from './ViewDetails';
//import Alert from './components/Alert';
import reducer from './reducers/InventoryManagerReducer';

//Let's use bootstrap
import {Alert, Button, Container, Row, Col} from 'react-bootstrap';
//import ListGroup from 'react-bootstrap/ListGroup';

//Below is type definition for our Handlers context type.
//Restricts Context type to null or Object containing functions; null is used only for initialization of context in App.
//Using Object because we have two parameters to pass and we want to carry them together within one context instead of two
//different ones.
type HandlersContextType = null | {dispatch: React.Dispatch<ActionType>,  handleDeleteItem: Function};

//create a context to be used to pass handlers like delete, edit handlers to subcomponents.
//We are also passing dispatch returned by useReducer.
export const HandlersContext = React.createContext<HandlersContextType>(null);

//Let us define type for our reducer so that we can easily pass any type of previous state and action.
//Reducer is simply a type of function that takes previous state and action and returns a new state as represented
type Reducer<S, A> = (prevState: S, action: A) => S;

const InventoryManager: React.FC = () => {
  //let us organize state, using useReducer
  //Prepare initialization
  const initialState: CombinedStateType = {items: [], onAddItem: false, onEditItem: false, onViewItem: false, itemToEdit:null, itemToView:null, alert: {show: false, message: '', type: '', bootstrapVariant: undefined}};
  //using useReducer instead of useState. Below, I am optionally explicitly indicating parameter types
  const [state, dispatch] = useReducer<Reducer<CombinedStateType, ActionType>>(reducer, initialState);

  //function that handles Create Item
  const handleCreateItem = async (itemToCreate: ItemType) => {
    //dispatch to state reducer, specifying the action type. Just a message that says 'Creating item ...'
    dispatch({type: 'BeforeCreateItem'});
    
    //let's try to write to backend
    try {
      //I have left a number of init options commented out rather than not have then at, so you can know about them
      //see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch for info on these options
      const response = await fetch('/myinventories',
      {
        method: 'POST',
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(itemToCreate) // body data type must match "Content-Type" header

      });
      if (!response.ok) throw new Error(response.statusText);//confirm that response is OK, else throw error
      //Response is ok. Proceed!
      const itemCreated: ItemType = await response.json();

      //useReducer to dispatch successful item creation, sending itemCreated as payload.
      dispatch({type: 'CreateItemSuccess', payload: {itemCreated}});
    }catch(error) {
      //dispatch error to state for display
      dispatch({type: 'CreateItemFailure', payload:{error: error}});
    }
  }

  const handleCancelCreate= () =>{
    //dispatch to state
    dispatch({type: 'HandleCancelCreate'})
  }

  const handleDeleteItem = async (id: number | string) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    dispatch({type: 'BeforeDeleteItem'});
    try{
      const response = await fetch(`/myinventories/${id}`, //note this URL
      {
        method: 'DELETE',
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *client
      });
      if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
      //Response is ok. Proceed!
      //remove item from state
     dispatch({type: 'DeleteItemSuccess', payload: {id: id}})
    }catch(error){
      //problem deleting from backend
      dispatch({type: 'DeleteItemFailure',payload: {error: error}})
    }
  }
/* No longer needed. dispatch is called directly from Item.
  //Edit Item has been flagged. Get the item to edit
  const handleEditItem = (id: number | string) => {
    //set the item to edit in the state
    dispatch({type: 'HandleEditItem', payload: {id: id}})
  }
  */

  const handleUpdateItem = async(editedItem: ItemType) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    //Of course, this alert will only flash if it takes very minimal time to create item
    dispatch({type: 'BeforeUpdateItem'})
    //let's try to write to backend
    try {
      const response = await fetch(`/myinventories/${editedItem.id}`,
      {
        method: 'PUT',//notice the method
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(editedItem) // body data type must match "Content-Type" header

      });
      if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
      //Response is ok. Proceed with setting state with itemUpdated
      const itemUpdated = await response.json();
      //dispatch to state
     dispatch({type: 'UpdateItemSuccess', payload: {itemUpdated: itemUpdated}})
    }catch(error) {
      dispatch({type: 'UpdateItemFailure', payload: {error: error}})
    }

  }

  // const handleViewItem = async(viewItem: ItemType) => {
  //   dispatch({type: 'BeforeViewItem'})
  //   //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
  //   //Of course, this alert will only flash if it takes very minimal time to create item
  //   //let's try to write to backend
  //   try {
  //     const response = await fetch(`/myinventories/${viewItem.id}`,
  //     {
  //       method: 'GET',//notice the method
  //       //mode: 'cors', // no-cors, *cors, same-origin
  //       //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //       //credentials: 'same-origin', // include, *same-origin, omit
  //       headers: {
  //         'Content-Type': 'application/json'
  //         // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     //redirect: 'follow', // manual, *follow, error
  //     //referrerPolicy: 'no-referrer', // no-referrer, *client
  //     body: JSON.stringify(viewItem) // body data type must match "Content-Type" header

  //     });
  //     if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
  //     //Response is ok. Proceed with setting state with itemUpdated
  //     const itemView = await response.json();
  //     //dispatch to state
  //    dispatch({type: 'ViewItemSuccess', payload: {itemView: itemView}})
  //   }catch(error) {
  //     dispatch({type: 'ViewItemFailure', payload: {error: error}})
  //   }

  // }

  const handleCancelUpdate = () => {
    //simply set state to make displayUpdate disappear
    dispatch({type: 'HandleCancelUpdate'});
  }
  // const handleCanceView = () => {
  //   //simply set state to make displayUpdate disappear
  //   dispatch({type: 'HandleCancelView'});
  // }

  //function to fetch data
  const fetchData = async () => {
    try {
      //const response = await fetch(`http://localhost:1337/inventories`);
      //Rather than use absolute URL above, we are using relative below because we have made a proxy entry into package.json
      //i.e. "proxy": "http://localhost:1337". In this way, our code is more like how it will be at production deployement
      //when we serve both the client react application and the backend from the same domain.
      const response = await fetch('/myinventories');
      const data = await response.json();
      //set in state  
      dispatch({type: 'FetchDataSuccess', payload: {items: data}})
    } catch (error) {
      //set state
      dispatch({type: 'FetchDataFailure', payload: {error: error}})
    }
  };

  //useEffect to be run once, hence the second parameter []. Loads data at componentDidMount life cycle stage
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleCloseAlert = () => {//This is called when handleCloseAlert props is set by Alert component.
    //setCombinedState({...combinedState, alert: {show: false, message: '', type: ''}})
    dispatch({type: 'HandleCloseAlert'});
  }

  //Time to prepare what is returned.
  //prepare to show alert or not
  let alert = null;
  if (state.alert.show) {
    /*
    alert = <Alert type={state.alert.type} message={state.alert.message} 
      handleCloseAlert={handleCloseAlert}/>
      */
     alert = (
      <Col>
        <Alert variant={state.alert.bootstrapVariant} onClick={handleCloseAlert}>
          <Button className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </Button>
          {state.alert.message}
        </Alert>
      </Col>
     )
  }
  //check if editItem should be loaded or not since it is conditional loading
  if (state.onEditItem && state.itemToEdit !== null){
    return (
      <Container>
        <Row>
          <h3>Inventory Management</h3>
        </Row>
        <Row>
          <Button variant='link' onClick={()=>{dispatch({type: 'HandleOnAddItem'})}}>+ Add Item</Button>
        </Row>
        <Row>
          <EditItem item={state.itemToEdit} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate}/>
        </Row>
        <Row>
          {alert}
        </Row>
        <Row className='mt-3'>
          <HandlersContext.Provider value={{dispatch,handleDeleteItem}}>
            <ItemList items={state.items!} />
          </HandlersContext.Provider>
        </Row>
      </Container>
    )
  }else if(state.onAddItem){//Display AddItem along with ItemList if onAddItem is true
    return(
      <Container>
        <Row>
          <h3>Inventory Management</h3>
        </Row>
        <Row>
          <AddItem handleCreateItem={handleCreateItem} handleCancelCreate={handleCancelCreate}/>
        </Row>
        <Row>
          {alert}
        </Row>
        <Row className='mt-3'>
          <HandlersContext.Provider value={{dispatch,handleDeleteItem}}>
            <ItemList items={state.items!} />
          </HandlersContext.Provider>
        </Row>
      </Container>
    )
  }
    else if(state.onViewItem && state.itemToView != null){//Display AddItem along with ItemList if onAddItem is true
      return(
        <Container>
          <Row>
            <h3>View Details</h3>
          </Row>
          <Row>
          <ViewItem item={state.items!}/>
        </Row>
         
        </Container>
      )
  }else{//onAddItem is false
    return (
      <Container>
        <Row>
          <h3>Inventory Management</h3>
        </Row>
        <Row>
          <Button variant='link' onClick={()=>{dispatch({type: 'HandleOnAddItem'})}}>+ Add Item</Button>
        </Row>
        <Row>
          {alert}
        </Row>
        <Row>
          <HandlersContext.Provider value={{dispatch,handleDeleteItem}}>
            <ItemList items={state.items!} />
          </HandlersContext.Provider>
        </Row>
      </Container>
      
    );
  }  
}

export default InventoryManager;
