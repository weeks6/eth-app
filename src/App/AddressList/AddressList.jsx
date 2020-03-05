import React, { useEffect, useState} from 'react'

import { getTokens } from '../../api/getTokens'
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import ChildAddressList from './ChildAddressList'

import "./AddressList.scss"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/Delete';

export default function AddressList({ addressLsId, address, deleteAddress }) {

    const [state, setState] = useState({
        tokens: [],
        loaded: false,
        collapsed: true
    })

    useEffect(() => {
        if (!state.loaded) {
            getTokens(address).then(tokens => {
                setState({
                    tokens,
                    loaded: true,
                    collapsed: true
                })
            })
    }})

    const expandList = () => {
        setState({
            tokens: state.tokens,
            loaded: true,
            collapsed: false
        })
    }

    const collapseList = () => {
        setState({
            tokens: state.tokens,
            loaded: true,
            collapsed: true
        })
    }
    
    return (
        <div>
            <Switch>
                <Route exact path='/' component={() => 
                    <>
                    <div className="address-title">
                        <p className="address-text">{ address }</p>
                        <div className="address-controls">
                            { state.collapsed ?
                            <ExpandMoreIcon className="control-icon" onClick={expandList}></ExpandMoreIcon> : 
                            <ExpandLessIcon className="control-icon" onClick={collapseList}></ExpandLessIcon>}
                            <Link to={`/${address}`} className="outer-link"><OpenInNewIcon className="control-icon"></OpenInNewIcon></Link>
                            <DeleteIcon className="control-icon" onClick={() => deleteAddress(addressLsId)}></DeleteIcon> 
                        </div>
                    </div>

                    <ul className={state.collapsed ? "address-list collapsed" : "address-list"}>
                        {state.tokens.map((token, idx) => 
                        <li key={idx} className="address-list__item"> 
                        <span> {token[0]} ({token[1]}) </span>
                        <span> {Number.parseInt(token[2]).toLocaleString()} </span>
                        </li>)}
                    </ul>
                </>
                }>
                    
            </Route>
            <Route exact path={`/${address}`} render={() => <ChildAddressList address={address} tokens={state.tokens}></ChildAddressList>}/>
            </Switch>
        </div>
    )
}