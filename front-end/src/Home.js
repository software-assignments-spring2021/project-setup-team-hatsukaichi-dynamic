import React from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'

function Home() {
    return (
	<>
	    <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
	    <p>This is a placeholder for the home page!</p>
	    <Footer />
	</>
    );
}

export default Home;
