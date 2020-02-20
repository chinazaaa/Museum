import React from 'react';


const FeaturedHeader: React.FC = () => {

    return (
        <thead className="thead-dark">
            <tr>
                <th>Name of Art Work</th>
                <th>Image</th>
                <th>Action Buttons</th>

            </tr>
        </thead>
    );
}

export default FeaturedHeader;