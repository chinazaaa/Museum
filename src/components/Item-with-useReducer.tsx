/** This component is for displaying each item in the record, passed to it from ItemList */
import React, {useContext} from 'react';
import { ItemType } from '../TypeDefinitions';
import { HandlersContext } from './InventoryManager-with-useReducer';
import { ButtonGroup, Button } from 'react-bootstrap';

type Props = {
    item: ItemType,
}

const Item: React.FC<Props> = (props) => {
    //declare applicable contexts
    const handlersContext = useContext(HandlersContext);

    //callback function for delete button onClick event. We could have also embedded this function definition directly rather than define it first here
    const onDeleteItem = () => {
        handlersContext!.handleDeleteItem(props.item.id); ////notice here that we are invoking the handleDeleteItem() via handlersContext. The exclamation mark is because of the possible null which will not really happen
    };

    const onEditItem = () => {
        handlersContext!.dispatch!({type: 'HandleEditItem', payload: {id: props.item.id}}); //notice here that we are invoking the handleEditItem() via handlersContext. The exclamation mark is because of the possible null which will not really happen
    };

    return (
    <tr>
        <td>{props.item.name}</td>
        <td>{props.item.category}</td>
        <td>{props.item.price}</td>
        <td>{props.item.in_stock}</td>
        <td>
        <ButtonGroup>
          <Button variant='outline-primary' onClick={()=> alert('Yet to be implemented. Try it yourself!')}>View Detail</Button>
          <Button variant='outline-warning' onClick={onEditItem}>Edit </Button>
          <Button variant='outline-danger' onClick={() => {if (window.confirm('Are you sure you want to delete?')) onDeleteItem()}}>Delete</Button>
        </ButtonGroup>
        </td>
    </tr>
    );
}

export default Item;
