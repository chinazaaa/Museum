import React, { useContext } from 'react';
import { ItemType } from '../TypeDefinitions2';
import { HandlersContext } from './MuseumManager';
import { ButtonGroup, Button } from 'react-bootstrap';

type Props = {
    item: ItemType,
}

const ListFeatured: React.FC<Props> = (props) => {

    const handlersContext = useContext(HandlersContext);

    //callback function for delete button onClick event. We could have also embedded this function definition directly rather than define it first here
    const onDeleteItem = () => {
        handlersContext!.handleDeleteItem(props.item.id); ////notice here that we are invoking the handleDeleteItem() via handlersContext. The exclamation mark is because of the possible null which will not really happen
    };

    const onEditItem = () => {
        handlersContext!.dispatch!({ type: 'HandleEditItem', payload: { id: props.item.id } }); //notice here that we are invoking the handleEditItem() via handlersContext. The exclamation mark is because of the possible null which will not really happen
    };

    const featured = () => {
        if (props.item.featured === true) {
            alert(`
            Name of the artwork: ${props.item.artwork}
            Genre: ${props.item.genre}
            Name of artist: ${props.item.artist}
            Present Location: ${props.item.location}
            It is Featured: ${props.item.featured}
            `);
        } else {
            alert(`
            Name of the artwork: ${props.item.artwork}
            Genre: ${props.item.genre}
            Name of artist: ${props.item.artist}
            Present Location: ${props.item.location}
            It is Featured: ${props.item.featured}
            `);
        }
    }

    return (
        <tr>
            <td>{props.item.artwork}</td>
            <td><img src={props.item.imgUrl} height="50%" alt={props.item.artwork} /></td>

            <td>
                <ButtonGroup>
                    <Button variant='outline-primary' onClick={featured}>View Detail</Button>
                    <Button variant='outline-warning' onClick={onEditItem}>Edit </Button>
                    <Button variant='outline-danger' onClick={() => { if (window.confirm('Are you sure you want to delete?')) onDeleteItem() }}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>

    );
}

export default ListFeatured;
