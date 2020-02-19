/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { ItemType } from '../TypeDefinitions';
import ItemListHeader from './ItemListHeader';
import Item from './Item-with-useReducer-view';
import { Table } from 'react-bootstrap';

//create the type for the anticipated props to be passed from parent component
type Props = {
    item: Array<ItemType>,

}

const ViewItem: React.FC<Props> = (props) => {

  //prepare items for display in a table
  let itemListRows = null;
  itemListRows = props.item.map((item) => {
    return <Item item={item} />
  })

  return (
      <Table striped bordered hover>
        <caption>View Details</caption>
        <ItemListHeader />
        <tbody>
          {itemListRows}
        </tbody>
      </Table>
  );
}
   

export default ViewItem;
