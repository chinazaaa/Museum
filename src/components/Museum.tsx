import React, { useReducer, useEffect } from 'react';
import { ActionType, CombinedStateType} from '../TypeDefinitions2'; 
import { Container, Row } from 'react-bootstrap';
import FeaturedItemwithReducer from './featuredItemwithReducer';

import reducer from './reducers/MuseumManagerReducer';

type Reducer<S, A> = (prevState: S, action: A) => S;

const HomePage: React.FC = () => {


  const fetchData = async () => {
    try {
      //const response = await fetch(`http://localhost:1337/inventories`);
      //Rather than use absolute URL above, we are using relative below because we have made a proxy entry into package.json
      //i.e. "proxy": "http://localhost:1337". In this way, our code is more like how it will be at production deployement
      //when we serve both the client react application and the backend from the same domain.
      const response = await fetch('/museum-inventories?featured_eq=true');
      const data = await response.json();
      console.log(data);
      //set in state  
      dispatch({type: 'FetchDataSuccess', payload: {items: data}})
    } catch (error) {
      //set state
      dispatch({type: 'FetchDataFailure', payload: {error: error}})
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const initialState: CombinedStateType = {items: [], onAddItem: false, onEditItem: false, itemToEdit:null, alert: {show: false, message: '', type: '', bootstrapVariant: undefined}};
  //using useReducer instead of useState. Below, I am optionally explicitly indicating parameter types
  const [state, dispatch] = useReducer<Reducer<CombinedStateType, ActionType>>(reducer, initialState);
  return (
    <Container>
      <Row>
        <FeaturedItemwithReducer items={state.items!}/>
      </Row>
      
    </Container>
  )
}

export default HomePage;