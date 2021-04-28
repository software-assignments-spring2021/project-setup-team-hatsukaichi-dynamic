import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Home.css'

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <img
          src="https://picsum.photos/1150/300"
          alt="Temporary cover from lorem picsum"
          className="full-img"
        />
        <p className="full-text">
          <br></br>In today's world, there are more streaming services and 
          platforms than we can count. Many people bite off more than they 
          can chew and try to watch multiple shows spread accross multiple 
          platforms and genres. It can be pretty tricky to keep mental track 
          of your progress on each show individually, that's where we come in. 
          TV Tracker is an online hub to keep note of the shows you watch or 
          have watched, your progress within those shows, the streaming platforms 
          that carry the shows, and much more.<br></br>
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
