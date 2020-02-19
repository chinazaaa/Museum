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
    return item.featured == 1 ? <Item item={item} /> : null
  })

  return (
      <Table striped bordered hover>
        <caption>Table 1: Available Featured Musuem Items</caption>
        <ItemListHeader />
        <tbody>
          {itemListRows}
        </tbody>
      </Table>
  );
}

export default ItemList;