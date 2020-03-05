import React, { useEffect, useState} from 'react'

import { getTokens } from '../../api/getTokens'

export default function ChildAddressList({address, tokens}) {

    const [state, setState] = useState({
        tokens,
        loaded: false
    })

    // handling loading tokens on new page before they loaded on home page
    useEffect(() => {
        if (!state.tokens && !state.loaded) {
            getTokens(address).then(tokens => {
                setState({
                    tokens,
                    loaded: true
                })
            })
    }})

    return (
        <>
            <p className="address-text">{ address }</p>
            <ul className="address-list">
                {tokens.map((token, idx) => 
                <li key={idx} className="address-list__item"> 
                <span> {token[0]} ({token[1]}) </span>
                <span> {Number.parseInt(token[2]).toLocaleString()} </span>
            </li>)}
            </ul>
        </>
    )
}