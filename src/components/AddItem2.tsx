/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { ItemType } from '../TypeDefinitions2';
import { Form, Button, Col } from 'react-bootstrap';

//create the type for the anticipated props to be passed from parent component
type Props = {
    handleCreateItem: Function,
    handleCancelCreate: Function,
}

const AddItem: React.FC<Props> = (props) => {

    const initialItemState: ItemType = {
        artwork: '',
        genre: '',
        artist: '',

        year: 0, 
        description: '',
        location: '',

        featured: false,
        imgUrl: ''
        // image: '*.png || *jpg || *jpeg'
    }

    //declare the state variable for item to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange 
    const [item, setItem] = useState<ItemType | any>({ ...initialItemState });

    //create a general onChange event handler for form inputs that fire onChange event
    const onChange = (event: any) => {
        const itemState = item;//check out item in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        itemState[event.target.name] = event.target.value;
        setItem({ ...itemState });//checkin the modified state
    }



    //function to handle form onSubmit event
    const onSubmit = (event: any) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleCreateItem(item);//call the handleAddItem function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelCreate();//call the function handleCancelAdd passed via props
    }

    // const onChange2 = (event: any) => {
    //     console.log(event.target.files[0]);
        
    // }

    //Note where the above functions are used below within the return statement
    return (
        <Col lg={6} className='border'>
            <Form onSubmit={onSubmit}>
                <legend>Add Museum Artwork:</legend>
                <Form.Group>

                    <Form.Label htmlFor='genre'>Genre</Form.Label>
                    <Form.Control as='select' id="genre" name="genre" value={item.genre} onChange={onChange}>
                        <option value="Unclassified">Unclassified</option>
                        <option value="Ancient">Ancient</option>
                        <option value="Medieval">Medieval</option>
                        <option value="Renaissance">Renaissance</option>
                        <option value="Baroque">Baroque</option>
                        <option value="Rococo">Rococo</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='artwork'>Name of Art Work</Form.Label>
                    <Form.Control type='text' name='artwork' id='artwork' placeholder="Name of ArtWork..." value={item.artwork} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='genre'>Genre</Form.Label>
                    <Form.Control type='text' name='genre' id='genre' placeholder="Name of Genre..." value={item.genre} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='artist'>Name of Artist</Form.Label>
                    <Form.Control type='text' name='artist' id='artist' placeholder="Name of Artist..." value={item.artist} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='year'>Year of completion</Form.Label>
                    <Form.Control type='number' name='year' id='year' placeholder="The year of completion" value={item.year} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='description'>Description of Art</Form.Label>
                    <Form.Control type='text' name='description' id='description' placeholder="Description of Art" value={item.description} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='location'>Present Location</Form.Label>
                    <Form.Control type='text' name='location' id='location' placeholder="Present Location" value={item.location} onChange={onChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='featured'>Is it Featured?</Form.Label>
                    <Form.Control as='select' id="featured" name="featured" value={item.featured} onChange={onChange} required>
                        <option value='true'>Yes</option>
                        <option value='false'>No</option>
                    </Form.Control>

                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='text'>Image</Form.Label>
                    <Form.Control type='text' name='imgUrl' id='imgUrl' placeholder="Image" value={item.imgUrl} onChange={onChange} required />
                </Form.Group>

                <Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                    <Button type='button' variant='link' onClick={onCancel}>Cancel</Button>
                </Form.Group>
            </Form>
        </Col>

    );
}

export default AddItem;
