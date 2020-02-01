
/*This module is for defining custom type definitions required anywhere in my codes
Each definition using the keyword interface is exported for use in other modules.
*/

/** The type for each item record */
export interface ItemType {
    id?: number | string, //We are adding question mark here so we can use same type when the data being handled does not include the id.
    artwork: string,
    genre: string,
   artist:string,
    year: number,
    description: string,
    location: string,
    featured: boolean
   
};
/* Below will also work
export type ItemType = {
    id: number,
    category: string,
    name: string,
    price: number,
    in_stock: number
};
*/
export type CombinedStateType = {
    items?: ItemType[],
    onAddItem: boolean,
    onEditItem: boolean,
    itemToEdit: null | ItemType, //safe in this way so as to be able to set it to null
    alert: { 
      show: boolean, //show alert or not
      message: string,
      type: string,
      //bootstrapVariant?: 'info' | 'success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'dark' | 'light' | undefined 
      //neither the above nor string is working for useReducer. It appears string literals are being interpreted as simple type string
      //and hence not matching variant type declared bootstrap.
      bootstrapVariant?: any
    }
  }
  
  
export type ActionType = {
    //Indicate possible action types here as you identify them in your codes
    type: 'FetchDataSuccess' | 'FetchDataFailure' | 'HandleOnAddItem' | 'HandleCancelCreate' | 'BeforeCreateItem' | 'CreateItemSuccess' | 'CreateItemFailure' | 'BeforeDeleteItem' | 'DeleteItemSuccess' | 'DeleteItemFailure'| 'HandleEditItem' | 'HandleCancelUpdate' | 'BeforeUpdateItem' | 'UpdateItemSuccess' | 'UpdateItemFailure' | 'HandleCloseAlert',
    //All question marks below show that they may or may not be provided.
    payload?: {items?: ItemType[], itemCreated?: ItemType, error?: Error, id?: number | string, itemUpdated?: ItemType},
  }
  