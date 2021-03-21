import React from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.png'
import './HeaderLogo.css'

function HeaderLogo() {
    return(
        <>
            <Link to = "/Home"><img src = {logo} alt = ""/> </Link>
    
    </>
    )
}

export default HeaderLogo;