import React from 'react';
import { ItemType } from '../TypeDefinitions2';
import ItemListHeader from './ItemListHeader2';
import Item from './Item-with-useReducer2';
import { Table } from 'react-bootstrap';

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
      <Table striped bordered hover>
        {/* <caption>{itemListRows.length} item(s) available in the inventory</caption> */}
        <ItemListHeader />
        <tbody>
          {itemListRows}
        </tbody>
      </Table>
  );
}

export default ItemList;