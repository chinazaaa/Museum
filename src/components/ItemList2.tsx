import React from 'react';
import { ItemType } from '../TypeDefinitions2';
import ItemListHeader from './ItemListHeader2';
import Item from './Item2';

//declare type for Props passed to this 
type Props = {
    items: Array<ItemType>,
}

const ItemList: React.FC<Props> = (props) => {
  
  //prepare items for display in a table
  let itemListRows = null;
  itemListRows = props.items.map((item) => {
    item.featured == true ? <Item item={item} /> :
         null
      })

  return (
    <div>
        <table>
          <caption>Museum Items</caption>
          <ItemListHeader />
          {itemListRows}
        </table>
    </div>
  );
}

export default ItemList;

