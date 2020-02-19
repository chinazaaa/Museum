import React from 'react';


const ItemListHeader: React.FC = () => {

  return (
    <thead className="thead-dark">
      <tr>
      <th>Name of Art Work</th>
          <th>Genre</th>
          <th>Name of Artist</th>
          <th>Years of completion</th>
          <th>Description of Artist</th>
          <th>Present location</th> 
          <th>Is It Featured?</th>
          {/* <th>Image</th> */}
          <th>Action Buttons</th>
         
      </tr>
    </thead>
  );
}

export default ItemListHeader;