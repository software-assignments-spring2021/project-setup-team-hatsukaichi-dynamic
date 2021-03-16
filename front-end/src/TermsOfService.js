import React from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'

function TermsOfService() {
    return(
	<>
	    <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />  
	    <p>This is a placeholder for the Terms of Service!</p>
	    <Footer />
	</>
    )
}

export default TermsOfService;
