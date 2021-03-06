import React from 'react';
import { ItemType } from '../TypeDefinitions';
import ItemListHeader from './ItemListHeader';
import Item from './Item-with-useReducer';
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
        <caption>Table 1: Available items</caption>
        <ItemListHeader />
        <tbody>
          {itemListRows}
        </tbody>
      </Table>
  );
}

export default ItemList;
