import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import profile from '../images/profile.gif'
import myShows from '../images/shows.gif'
import searchShows from '../images/shows-search.gif'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <div className="block">
        <h2 className="header-text">Welcome to TV Tracker app! </h2>
        <h4 className="gif-text">Register and access Your Profile page: </h4>
        <p className="full-text">After registering an account on TV Tracker App, 
        you can access your personal Profile page! </p>
         <p className="full-text"> On the profile page, you can: </p>
       <p className="full-text">  1) Access Most Recently Watched shows </p> 
       <p className="full-text">2) click on Individual show and modify watching progress of the show </p>
        <p className="full-text">2) access My Shows page  </p>
       <p className="full-text">3) access Profile Settings </p>
        <img
          src={profile}
          alt="profile gif"
          className="gif-img"
        />
        <br/>
        </div>
        <br/> <br/>
     <div className="block">
          <h4 className="gif-text">Access Shows page: </h4>
  <p className="full-text">After registering an account on TV Tracker App, 
  you can access your personal Shows page! </p>
   <p className="full-text"> On the Shows page, you can: </p>
 <p className="full-text">  1) Access all shows linked to your profile</p> 
  <p className="full-text">2) click on Individual show and modify watching progress of the show </p>
  <p className="full-text">2) Filter shows based on your progress (Completed, In Progress) </p>
 <p className="full-text">3) Filter shows based on the platform (Netflix, HBO etc. ) </p>
  <img
    src={myShows}
    alt="shows gif"
    className="gif-img"
  />
   <br/>
  </div>
       <div className="block">
          <h4 className="gif-text">Find and save your favorite shows: </h4>
  <p className="full-text">On the Shows page, 
  you can search for new shows and add them to your list </p>
  <p className="full-text">Search for a show, modify your watching progress and save it</p>
  <img
    src={searchShows}
     alt="search shows gif"
    className="gif-img"
  />
   <br/>
  </div>
        <p className="full-text">
          <br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque
          gravida in fermentum et. Amet consectetur adipiscing elit pellentesque
          habitant. Duis at consectetur lorem donec massa sapien faucibus. Mi
          tempus imperdiet nulla malesuada pellentesque elit eget gravida.
          Tincidunt tortor aliquam nulla facilisi. Sed elementum tempus egestas
          sed sed risus pretium quam. At in tellus integer feugiat scelerisque.
          Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed.
          Porttitor rhoncus dolor purus non enim. Aliquet eget sit amet tellus.
          Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Felis
          eget velit aliquet sagittis id consectetur purus ut. Venenatis tellus
          in metus vulputate eu.<br></br>
        </p>
        <br />
        <img
          src="https://picsum.photos/1150/300"
          alt="Temporary cover from lorem picsum"
          className="full-img"
        />
        <p className="full-text">
          <br />
          At consectetur lorem donec massa sapien faucibus et molestie ac.
          Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tempus urna
          et pharetra pharetra massa. Accumsan lacus vel facilisis volutpat est.
          Sed augue lacus viverra vitae congue eu. Pellentesque elit ullamcorper
          dignissim cras tincidunt lobortis feugiat. At consectetur lorem donec
          massa sapien faucibus. Sed risus pretium quam vulputate dignissim
          suspendisse in est. Volutpat sed cras ornare arcu dui. Fermentum odio
          eu feugiat pretium nibh ipsum consequat nisl vel. Fermentum leo vel
          orci porta non pulvinar. Lobortis feugiat vivamus at augue eget.
          Facilisi nullam vehicula ipsum a arcu cursus vitae congue mauris. Nec
          ultrices dui sapien eget mi. Id cursus metus aliquam eleifend mi in.
          Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus.
          Pellentesque habitant morbi tristique senectus et netus. Sit amet
          dictum sit amet justo donec. Feugiat nisl pretium fusce id.<br></br>
          <br></br>
          <br></br>
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Home
