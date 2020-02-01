import React from 'react';
import { ItemType } from '../TypeDefinitions';
import ItemListHeader from './ItemListHeader';
import Item from './Item';

//declare type for Props passed to this 
type Props = {
    items: Array<ItemType>,
}

const ItemList: React.FC<Props> = (props) => {
  
  //prepare items for display in a table
  let itemListRows = null;
  itemListRows = props.items.map((item) => {
    return <Item item={item} />
  })

  return (
    <div>
        <table>
          <caption>Inventory Items</caption>
          <ItemListHeader />
          {itemListRows}
        </table>
    </div>
  );
}

export default ItemList;
