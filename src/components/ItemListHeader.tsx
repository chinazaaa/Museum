/** Table header. We are separating this from ItemList just in case it has to carry out
 * some specific tasks like firing sort event based on the header column clicked.
*/
import React from 'react';


const ItemListHeader: React.FC = () => {

  return (
    <thead className="thead-dark">
      <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>In Stock</th>
          <th>Action Buttons</th>
      </tr>
    </thead>
  );
}

export default ItemListHeader;
