import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import {ItemType} from './TypeDefinitions'; 
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Alert from './components/Alert';

//for component hierarchy visual testing, we are creating fake inventory items for our App here.
//in reality, such data may come from a remote source
/* Now that we are fetching data from backend, we no longer need these testItems
const testItems: Array<ItemType> = [ //notice the use of array of ItemType as our type for testItems
  
  {id: 1, category:'Food', name:'Bread', price: 40, in_stock: 40},
  {id: 2, category:'Food', name:'Whole Chicken', price: 1000, in_stock: 10},
  {id: 3, category:'Drink', name:'Coke', price: 50, in_stock: 20},
  {id: 4, category:'Toiletries', name:'Dettol Soap', price: 150, in_stock: 35},
  {id: 5, category:'Clothing', name:'Jeans trouser', price: 3000, in_stock: 15},
  {id: 6, category:'Clothing', name:'Jacket', price: 4000, in_stock: 100},
  {id: 7, category:'Electronics', name:'Sony Xperria XL', price: 40000, in_stock: 3}
]*/

//Below is an object type for holding state variable elements.
//We have created a type so that we can have flexibility for itemToEdit
type CombinedStateType = {
  items: ItemType[],
  onAddItem: boolean,
  onEditItem: boolean,
  itemToEdit: null | ItemType, //safe in this way so as to be able to set it to null
  alert: { 
    show: boolean, //show alert or not
    message: string,
    type: string
  }
}

//Below is type definition for our Handlers context type.
//Restricts Context type to null or Object containing functions; null is used only for initialization of context in App.
//Using Object because we have two functions to pass and we want to carry them together within one context instead of two
//different ones.
type HandlersContextType = null | {handleDeleteItem: Function, handleEditItem: Function};

//create a context to be used to pass handlers like delete, edit handlers to subcomponents
export const HandlersContext = React.createContext<HandlersContextType>(null);

const App: React.FC = () => {
  //Let's combine flags, items, etc. in an object as they will likely be set together from handleAddItem
  
  //const [combinedState, setCombinedState] = useState<CombinedStateType>({items: testItems, onAddItem: false, onEditItem: false, itemToEdit:null})
  //We are done with test items. Now we can initialize items to empty array [].
  const [combinedState, setCombinedState] = useState<CombinedStateType>({items: [], onAddItem: false, onEditItem: false, itemToEdit:null, alert: {show: false, message: '', type: ''}})

  //function that handles Create Item
  const handleCreateItem = async (itemToCreate: ItemType) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    //Of course, this alert will only flash if it takes very minimal time to create item
    setCombinedState({...combinedState, alert:{show: true, type: 'info', message: 'Creating new item. Please wait...'}});
    //let's try to write to backend
    try {
    //const response = await fetch(`http://localhost:1337/inventories`);
    //Rather than use absolute URL above, we are using relative below because we have made a proxy entry into package.json
    //i.e. "proxy": "http://localhost:1337". In this way, our code is more like how it will be at production deployement
    //when we serve both the client react application and the backend from the same domain.
    //I have left a number of init options commented out rather than not have then at, so you can know about them
    //see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch for info on these options
    const response = await fetch('/inventories',
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
    if (!response.ok) throw new Error(response.statusText);//confirm that response is OK
    //Response is ok. Proceed!
    const itemCreated = await response.json();
    //bring down the items in the state for modification.
    const currentItems = combinedState.items;
    currentItems.push(itemCreated);//add created item to the state
    setCombinedState({...combinedState, onAddItem: false, items: currentItems, alert:{show: true, type: 'success', message: 'Item successfully created'}});//flag onAddItem as false and update currentItems in the state in one call
  }catch(error) {
    console.log(error); //Todo: create an alert window for showing success or error
    setCombinedState({...combinedState, onAddItem: false, alert:{show: true, type: 'failure', message: `Problem creating item: ${error.message}`}});//flag onAddItem as false and update currentItems in the state in one call
  }
  
  }
  const handleCancelCreate= () =>{
    setCombinedState({...combinedState, onAddItem: false}); //retain the combinedState as is and then override onAddItem, setting it to false
  }

  const handleDeleteItem = async (id: number | string) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    //Of course, this alert only flash if it takes very minimal time to create item
    setCombinedState({...combinedState, alert:{show: true, type: 'info', message: 'Deleting item. Please wait...'}});
    try{
      const response = await fetch(`/inventories/${id}`, //note this URL
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
      const currentItems = combinedState.items;
      //find the index corresponding to the item with the passed id
      const index = currentItems.findIndex((item) => item.id === id);
      currentItems.splice(index,1);//remove one element starting from the index position. This is removing the element itself
      //update state with the spliced currentItems
      setCombinedState({...combinedState, items: currentItems, alert:{show: true, type: 'success', message: 'Item successfully deleted'}});//update state overriding currentItems
    }catch(error){
      //problem deleting from backend
      setCombinedState({...combinedState, alert:{show: true, type: 'failure', message: `Error deleting item: ${error.message}`}});//show failure alert
    }
  }

  //Edit Item has been flagged. Get the item to edit
  const handleEditItem = (id: number | string) => {
    //get the item to edit
    const currentItems = combinedState.items;
    const index = currentItems.findIndex((item) => item.id === id);
    const item = currentItems[index];
    setCombinedState({...combinedState, onEditItem: true, itemToEdit: item, onAddItem: false});//set onEditItem to true and itemToEdit
  }

  const handleUpdateItem = async(editedItem: ItemType) => {
    //You can optionally send an alert at the beginning of this function, in case it takes long to finish.
    //Of course, this alert will only flash if it takes very minimal time to create item
    setCombinedState({...combinedState, alert:{show: true, type: 'info', message: 'Updating item. Please wait...'}});
    //let's try to write to backend
    try {
      const response = await fetch(`/inventories/${editedItem.id}`,
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
      //bring down the items in the state for modification.
      const currentItems = combinedState.items;
      //replace item in state with the updated one
      //find the item in the state that has the same id as the editedItem's id
      //console.log(itemUpdated);
      const index = currentItems.findIndex((item) => item.id === itemUpdated.id);
      //now change the value for that item in state
      currentItems[index] = itemUpdated;
      //set the state replacing items with the modified one
      //Also set displayUpdateItem flag to false and itemToUpdate to null in state as pending update is now done.
      setCombinedState({...combinedState, onEditItem: false, items: currentItems, alert:{show: true, type: 'success', message: 'Item successfully updated'}});//flag onEditItem as false and update currentItems in the state in one call
    }catch(error) {
      //console.log(error);
      setCombinedState({...combinedState, onEditItem: false, alert:{show: true, type: 'failure', message: `Problem updating item: ${error.message}`}});
    }

  }

  const handleCancelUpdate = () => {
    //simply setState to make displayUpdate disappear
    setCombinedState({...combinedState, onEditItem: false, itemToEdit: null});//set onEditItem to true and itemToEdit to empty
  }

  //function to fetch data
  const fetchData = async () =>{
    try {
      //const response = await fetch(`http://localhost:1337/inventories`);
      //Rather than use absolute URL above, we are using relative below because we have made a proxy entry into package.json
      //i.e. "proxy": "http://localhost:1337". In this way, our code is more like how it will be at production deployement
      //when we serve both the client react application and the backend from the same domain.
      const response = await fetch('/inventories');
      const data = await response.json();
      setCombinedState({...combinedState, items: data});   
    } catch (error) {
      setCombinedState({...combinedState, items: []});//items array is empty
    }
  };

  //useEffect to be run once, hence the second parameter []. Loads data at componentDidMount life cycle stage
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleCloseAlert = () => {//This is called when handleCloseAlert props is set by Alert component.
    setCombinedState({...combinedState, alert: {show: false, message: '', type: ''}})
  }

  //Time to prepare what is returned.
  //prepare to show alert or not
  let alert = null;
  if (combinedState.alert.show) {
    alert = <Alert type={combinedState.alert.type} message={combinedState.alert.message} 
      handleCloseAlert={handleCloseAlert}/>
  }
  //check if editItem should be loaded or not since it is conditional loading
  if (combinedState.onEditItem && combinedState.itemToEdit !== null){
    return (
      <div>
        <ul>
          <li>
            <button onClick={()=>{setCombinedState({...combinedState, onAddItem: true, onEditItem: false})}}>+ Add Item</button>
          </li>
        </ul>
        <div>
          <EditItem item={combinedState.itemToEdit} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate}/>
        </div>
        {alert}
        <HandlersContext.Provider value={{handleDeleteItem, handleEditItem}}>
          <ItemList items={combinedState.items} />
        </HandlersContext.Provider>
      </div>
    )
  }else if(combinedState.onAddItem){//Display AddItem along with ItemList if onAddItem is true
    return(
      <div className="App">
        <AddItem handleCreateItem={handleCreateItem} handleCancelCreate={handleCancelCreate}/>
        {alert}
        <HandlersContext.Provider value={{handleDeleteItem, handleEditItem}}>
          <ItemList items={combinedState.items} />
        </HandlersContext.Provider>
      </div>
    )
  }else{//onAddItem is false
    return (
      <div>
        <ul>
          <li>
            <button onClick={()=>{setCombinedState({...combinedState, onAddItem: true, onEditItem: false})}}>+ Add Item</button>
          </li>
        </ul>
        {alert}
        <HandlersContext.Provider value={{handleDeleteItem, handleEditItem}}>
          <ItemList items={combinedState.items} />
          </HandlersContext.Provider>
      </div>
    );
  }  
}

export default App;
