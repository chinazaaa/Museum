import React from 'react';
import { ItemType } from '../TypeDefinitions2';
import { Table } from 'react-bootstrap';
import ListFeatured from './listFeatured';
import FeaturedHeader from './featuredHeader'

//declare type for Props passed to this 
type Props = {
    items: Array<ItemType>,
}

const FeaturedItemwithReducer: React.FC<Props> = (props) => {
  
  //prepare items for display in a table
  let itemListRows = null;
  itemListRows = props.items.map((item) => {
    return <ListFeatured item={item} />
  })

  return (
      <Table striped bordered hover>
          <FeaturedHeader />
        <tbody>
          {itemListRows}
        </tbody>
        {/* <caption>{itemListRows.length} featured item(s) available in the inventory</caption> */}
      </Table>
  );
}

export default FeaturedItemwithReducer;