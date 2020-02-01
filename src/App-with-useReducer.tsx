import React, { Suspense } from 'react';
import Home from './components/Home';
import logo from './piosystems-logo.png';
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'
import { Jumbotron, Nav, Container, Navbar, Row, Form, FormControl, Button, Col, ButtonGroup} from 'react-bootstrap';

//import InventoryManager from './components/InventoryManager-with-useReducer';
//let us lazily import inventory manager so that it does not slow down startup of page
const InventoryManager = React.lazy(() => import('./components/InventoryManager-with-useReducer'));
const MuseumManager = React.lazy(() => import('./components/MuseumManager'));
const App: React.FC = () => {
  return (
    <Container fluid className='w-100 p-0'> {/**Topmost container set to fluid to get from end to end of page */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar variant="light" bg="primary" expand className='mb-0'>
            <Container>{/**We are putting all inside Navbar container so as to center it on parent fluid */}
                {/** The above makes the menu toggle responsively. Notice the reference to the id of Navbar.Collapse below */}
                  <Col></Col>
                  <Nav className="justify-content-end">
                    <NavLink activeClassName='is-active' to='/visitors' >
                      <Nav.Item>
                        <Nav.Link href='/visitors'>Visitors</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/media'>
                      <Nav.Item>
                        <Nav.Link href='/media'>Media</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/support-us'>
                      <Nav.Item>
                        <Nav.Link href='/support-us'>Support us</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <Nav.Item>
                      <Form action='/search' inline className="justify-content-end">
                        <ButtonGroup className='ml-2 border rounded'>
                          <FormControl size="sm" type="text" placeholder="Search" />
                          <Button size="sm" variant='outline-light' type="submit">Submit</Button>
                        </ButtonGroup>
                      </Form>
                    </Nav.Item>
                  </Nav>
            </Container>
          </Navbar>
          <Navbar variant="dark" bg="primary" sticky="top" expand='lg' className='mb-0'>
            <Container>{/**We are putting all inside Navbar container so as to center it on parent fluid */}
                <Navbar.Brand href="/"><img src={logo} alt='company-logo' className='App-logo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
                {/** The above makes the menu toggle responsively. Notice the reference to the id of Navbar.Collapse below */}
                <Navbar.Collapse id="responsive-navbar-nav" > 
                  <Nav>
                    <NavLink activeClassName='is-active' to='/' >
                      <Nav.Item>
                        <Nav.Link href='/'>Home</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/inventory'>
                      <Nav.Item>
                        <Nav.Link href='/inventory'>Inventory</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/museum'>
                      <Nav.Item>
                        <Nav.Link href='/museum'>Museum</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/museum-inventory'>
                      <Nav.Item>
                        <Nav.Link href='/museum-inventory'>Museum-Inventory</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/about-us'>
                      <Nav.Item>
                        <Nav.Link href='/about-us'>About Us</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                    <NavLink activeClassName='is-active' to='/hello/friend'>
                      <Nav.Item>
                        <Nav.Link href='/hello/friend'>Hello</Nav.Link>
                      </Nav.Item>
                    </NavLink>
                  </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            {/** Below is for routing to Inventory Manager */}
            <Route exact={true} path="/inventory" component={InventoryManager} />
            <Route exact={true} path="/museum-inventory" component={MuseumManager} />
            {/** Below is for routing URL that matches the path patter /hello/:variable */}
            <Route path="/hello/:name" render={({match}) => {
              return (
                    <Jumbotron>
                      <Container>
                        <Row>
                          <h3 className="display-3">Hello {match.params.name}!</h3>
                        </Row>
                      </Container>
                    </Jumbotron>
                  );
              }}
            />
            {/**Route below is not associated with any path. This means that this route will be invoked
             * whenever any URL path entered is not found
             */}
            <Route render={() => {
              return (
                    <Jumbotron>
                      <Container>
                        <Row>
                          <h3 className="display-3">Page not found</h3>
                        </Row>
                      </Container>
                    </Jumbotron>
                  );
              }} 
            />
          </Switch> 
        </Suspense>
      </Router>
    </Container>
  );
}

export default App;
