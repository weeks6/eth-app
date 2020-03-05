import React, { useState } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import { isValid } from '../../api/getTokens'

export default function Form({lsCallback}) {
    
    const [state, setState] = useState({
        inputAddress: "",
        addresses: Object.values(window.localStorage)
    })

    const handleInputChange = (event) => {
        setState({
            inputAddress: event.target.value,
            addresses: Object.values(window.localStorage)
        })
    }

    const handleNewAddress = async (event) => {
        event.preventDefault()
        
        if (await isValid(state.inputAddress.trim())) {
            if (!Object.values(window.localStorage).includes(state.inputAddress.trim())) {
                window.localStorage.setItem(localStorage.length, state.inputAddress.trim())
                lsCallback()
            } else {
                console.log("address already in")
            }
        } else {
            console.log("address is invalid")
        }
    }

    return (
        <form className="address-form" onSubmit={event => handleNewAddress(event)} >
            <input type="text" name="address" onChange={event => handleInputChange(event)} value={state.inputAddress} placeholder="Search..."/>
            <div>
            <button type="submit">
                <SearchIcon></SearchIcon>
            </button>
            </div>
        </form>
    )
}