import React, { useState } from 'react';
import './App.scss'

import { getTransactions } from '../api/getTransactions'

export default function App() {

  const [state, setState] = useState({
    inputAddress: "",
    tokens: []
  })

  const handleInputChange = (event) => {
    setState({
      inputAddress: event.target.value,
      tokens: []
    })
  }

  const handleNewAddress = (event) => {
    console.log(state.inputAddress)
    

    getTransactions(state.inputAddress).then(tokens => {
      setState({
        inputAddress: "",
        tokens
      })
    })

    event.preventDefault()
  }

  return (
    <>
    <form onSubmit={event => handleNewAddress(event)}>
      <input type="text" name="address" onChange={event => handleInputChange(event)} value={state.inputAddress}/>
      <input type="submit" value="Submit"/>
    </form>

    <ul>
      { 
        state.tokens.map(token => 
          <p> {token[0]}, {token[1]}, {token[2]} </p>
        )
      }
    </ul>
    </>
  );
}
