import React, { useState } from 'react'

import './App.scss'
import Form from './Form/Form'
import AddressList from './AddressList/AddressList'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  const [state, setState] = useState({
    inputAddress: "",
    addresses: Object.entries(window.localStorage)
  })

  const deleteAddress = (idx) => {
    window.localStorage.removeItem(idx)
    lsCallback()
  }
  
  // callback function for updating app state 
  const lsCallback = () => {
    setState({
      inputAddress: state.inputAddress,
      addresses: Object.entries(window.localStorage)
    })
  }

  return (
    <Router>
      <div className="container">
      <Link to="/" className="nav-link">Home</Link>
      
      <Switch>
        <Route exact path="/" component={() => <Form lsCallback={lsCallback}></Form>}></Route>
      </Switch>

      <ul className="address-list">
        { 
          state.addresses.map((address, idx) => 
            <AddressList key={idx} deleteAddress={deleteAddress} addressLsId={address[0]} address={address[1]}></AddressList>
          )
        }
      </ul>
      </div>

    </Router>
  );
}
