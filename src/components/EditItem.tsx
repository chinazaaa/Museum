/** This component is for displaying each item in the record, passed to it from ItemList */
import React, { useState } from 'react';
import { ItemType } from '../TypeDefinitions';
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
        name: props.item.name,
        category: props.item.category,
        price: props.item.price,
        in_stock: props.item.in_stock
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
                    <Form.Label htmlFor='category'>Category</Form.Label>
                    <Form.Control as='select' id="category" name="category" value={item.category} onChange={onChange}>
                        <option selected={item.category === "Unclassified"? true: false} value="Unclassified">Unclassified</option>
                        <option selected={item.category === "Food"? true: false} value="Food">Food</option>
                        <option selected={item.category === "Drink"? true: false} value="Drink">Drink</option>
                        <option selected={item.category === "Clothing"? true: false} value="Clothing">Clothing</option>
                        <option selected={item.category === "Electronics"? true: false} value="Electronics">Electronics</option>
                        <option selected={item.category === "Toiletries"? true: false} value="Toiletries">Toiletries</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='name'>Name</Form.Label>
                    <Form.Control type='text' name='name' id='name' placeholder="name of item ..." value={item.name} onChange={onChange} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='price'>Price</Form.Label>
                    <Form.Control type='number' name='price' id='price' placeholder="price of item in naira..." value={item.price} onChange={onChange} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='in_stock'>In Stock</Form.Label>
                    <Form.Control type='number' name='in_stock' id='in_stock' placeholder="how many in stock" value={item.in_stock} onChange={onChange} required/>
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
