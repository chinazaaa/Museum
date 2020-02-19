import {CombinedStateType, ActionType} from '../../TypeDefinitions';

//declare a reducer that will test and process each action dispatched, using a switch statement.
const reducer = (state: CombinedStateType, action: ActionType) => {
  switch (action.type){
    case 'FetchDataSuccess':
      return {...state, items: action.payload!.items};
    case 'FetchDataFailure':
      return {...state, alert:{show: true, type: 'failure', message: `Could not load remote data: ${action.payload!.error}`, bootstrapVariant:"danger"}};
    case 'HandleOnAddItem':
      return {...state, onAddItem: true, onEditItem: false}
    case 'HandleCancelCreate':
      return {...state, onAddItem: false};
    case 'BeforeCreateItem': 
      //goal here is to set alert to show creating item message
      return {...state, alert:{show: true, type: 'info', message: 'Creating item. Please wait!', bootstrapVariant:"info"}};
    case 'CreateItemSuccess': {
      //goal here is to update state with item created
      const currentItems = state.items!;
      currentItems.push(action.payload!.itemCreated!);
      return {...state, items: currentItems, onAddItem: false, alert:{show: true, type: 'success', message: 'Item successfully created!', bootstrapVariant:"success"}}
    };
    case 'CreateItemFailure': 
      //goal here is to set alert to show failure to create
      return {...state, alert:{show: true, type: 'failure', message: `Could not create item: ${action.payload!.error}`, bootstrapVariant:"danger"}};
    case 'BeforeDeleteItem':
      //goal here is to set alert to show creating item message
      return {...state, alert:{show: true, type: 'info', message: 'Deleting item. Please wait!', bootstrapVariant:"info"}};
    case 'DeleteItemSuccess': {
      //goal here is to remove deleted item from state
      const currentItems = state.items;
      //find the index corresponding to the item with the passed id
      const index = currentItems!.findIndex((item) => item.id === action.payload!.id);
      currentItems!.splice(index,1);
      return {...state, items: currentItems, alert:{show: true, type: 'success', message: 'Item successfully deleted!', bootstrapVariant:"success"}}
    };
    case 'DeleteItemFailure': 
      //goal here is to set alert to show failure to delete
      return {...state, alert:{show: true, type: 'failure', message: `Could not delete item: ${action.payload!.error}`, bootstrapVariant:"danger"}};
    case 'BeforeUpdateItem': 
      //goal here is to set alert to show updating item message
      return {...state, alert:{show: true, type: 'info', message: 'Updating item. Please wait!', bootstrapVariant:"info"}};
      case 'BeforeViewItem': 
      //goal here is to set alert to show updating item message
      return {...state, alert:{show: true, type: 'info', message: 'View item. Please wait!', bootstrapVariant:"info"}};
    case 'HandleCancelUpdate':
        return {...state, onEditItem: false};
        case 'HandleCancelView':
          return {...state, onViewItem: false};
    case 'HandleEditItem': {
      const currentItems = state.items;
      const index = currentItems!.findIndex((item) => item.id === action.payload!.id);
      const item = currentItems![index];
      return {...state, onEditItem: true, itemToEdit: item, onAddItem: false}
    };
    case 'UpdateItemSuccess': {
      //goal here is to update state with item updated
      const currentItems = state.items;
      //currentItems.push(action.payload!.itemCreated!);
      const index = currentItems!.findIndex((item) => item.id === action.payload!.itemUpdated!.id);
      //now change the value for that item in state
      currentItems![index] = action.payload!.itemUpdated!;
      return {...state, items: currentItems, onEditItem: false, alert:{show: true, type: 'success', message: 'Item successfully updated!', bootstrapVariant:"success"}}
    };
    case 'UpdateItemFailure': 
      //goal here is to set alert to show failure to update
      return {...state, alert:{show: true, type: 'failure', message: `Could not update item: ${action.payload!.error}`}};

      case 'ViewItemSuccess': {
        //goal here is to update state with item updated
        const currentItems = state.items;
        //currentItems.push(action.payload!.itemCreated!);
        const index = currentItems!.findIndex((item) => item.id === action.payload!.itemUpdated!.id);
        //now change the value for that item in state
        currentItems![index] = action.payload!.itemUpdated!;
        return {...state, items: currentItems, onEditItem: false, alert:{show: true, type: 'success', message: 'Item successfully Viewed!', bootstrapVariant:"success"}}
      };
      case 'ViewItemFailure': 
        //goal here is to set alert to show failure to update
        return {...state, alert:{show: true, type: 'failure', message: `Could not view item: ${action.payload!.error}`}};
    case 'HandleCloseAlert':
      return {...state, alert: {show: false, message: '', type: ''}};
    default:
      return state;
  }
}
export default reducer;