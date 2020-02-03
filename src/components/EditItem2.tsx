/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { ItemType } from '../TypeDefinitions2';
import { Col, Form, Button } from 'react-bootstrap';

//create the type for the anticipated props to be passed from parent component
type Props = {
    item: ItemType,
    handleUpdateItem: Function,
    handleCancelUpdate: Function
}

const EditItem: React.FC<Props> = (props) => {

    const initialItemState: ItemType = {
        id: props.item.id,
        artwork: props.item.artwork,
        genre: props.item.genre,
        artist: props.item.artist,
       
        year: props.item.year,
        description: props.item.description,
        location: props.item.location,
        featured: props.item.featured,
        is_featured: props.item.is_featured,
       
    }

    //declare the state variable for item to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange 
    const [item, setItem] = useState<ItemType | any >({...initialItemState});

    //create a general onChange event handler for form inputs that fire onChange event
    const onChange = (event: any) => {
        const itemState = item;//check out item in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        itemState[event.target.name] = event.target.value;
        setItem({...itemState});//checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: any) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleUpdateItem(item);//call the handleAddItem function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelUpdate();//call the function handleCancelAdd passed via props
    }
    
    //Note where the above functions are used below within the return statement
    return (
        <Col lg={6} className='border'>
            <Form onSubmit={onSubmit}>
                <legend>Edit Item:</legend>
                <Form.Group>
                    <Form.Control type='hidden' name="id" value={item.id} readOnly/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='genre'>Genre</Form.Label>
                    <Form.Control as='select' id="genre" name="genre" value={item.category} onChange={onChange}>
                        <option selected={item.genre === "Unclassified"? true: false} value="Unclassified">Unclassified</option>
                        <option selected={item.genre === "Ancient"? true: false} value="Ancient">Ancient</option>
                        <option selected={item.genre === "Medieval"? true: false} value="Medieval">Medieval</option>
                        <option selected={item.genre === "Renaissance"? true: false} value="Renaissance">Renaissance</option>
                        <option selected={item.genre === "Baroque"? true: false} value="Baroque">Baroque</option>
                        <option selected={item.genre === "Rococo"? true: false} value="Rococo">Rococo</option>
                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='artwork'>Name of Artwork</Form.Label>
                        <Form.Control type='text' name='artwork' id='artwork' placeholder="Name of Artwork.." value={item.artwork} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='genre'>Genre</Form.Label>
                        <Form.Control type='text' name='genre' id='genre' placeholder="Name of Genre..." value={item.genre} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='artist'>Name of Artist</Form.Label>
                        <Form.Control type='text' name='artist' id='artist' placeholder="Name of Artist..." value={item.artist} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='year'>Year of completion</Form.Label>
                        <Form.Control type='number' name='year' id='year_of_completion' placeholder="The year of completion" value={item.year} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='description'>Description of Art</Form.Label>
                        <Form.Control type='text' name='description' id='description' placeholder="Description of Art" value={item.description} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='location'>Present Location</Form.Label>
                        <Form.Control type='text' name='location' id='location' placeholder="Present Location" value={item.location} onChange={onChange} required/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label htmlFor='featured'>Is it featured?</Form.Label>
                    <Form.Control as='select' id="featured" name="featured" value={item.featured} onChange={onChange}>
                        <option selected={item.featured === "Yes"? true: false} value="Yes">Yes</option>
                        <option selected={item.featured === "No"? true: false} value="No">No</option>
                        </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                    <Button type='button' variant='link' onClick={onCancel}>Cancel</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default EditItem;