import React from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'
import './IndividualShow.css';
import image from './poster.jpg'

const IndividualShow = (props) => {
  const returnToShows = (() => {
    window.location.href='/my-shows/'
  });

  const addToWatched = (() => {
    window.location.href='/in-progress-watched/'
  });

  const saveProgress = (() => {
    //to be filled in back-end stage
  });
  const savePlatform = (() => {
    //to be filled in back-end stage
  });

  return (
<>
    <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />  
    <div className = "header"><h2>Show Page</h2></div>

    <div class ="show_content">
    <fieldset class="main">
      <div class="show-details">
    <fieldset >
      <h3>Henry Kissinger: The Movie</h3>
      <button onClick={(e) => returnToShows()}>
        Return to Shows
      </button>
      <button onClick={(e) => addToWatched()}>
        Add to In Progress or Watched Shows
      </button>

  <form onSubmit={(e) => saveProgress()} >
  <label for="season">Current Season: </label> 
    <input id="season" class="progress" value="1"/>
    <br/>
    <label for="episode">Current Episode:</label> 
    <input id="episode" class="progress" value="1"/>
    <br/><br/>
  <input type="submit" value="Save Progress"/>
  </form>
  <br/>
<p>Select the platform: </p>
<form onSubmit={(e) => savePlatform()}>

  <input type="checkbox" id="netflix" value="Netflix"/>
  <label for="netflix">Netflix</label>
  <input type="checkbox" id="prime" value="Prime"/>
  <label for="Prime">Prime</label><br/><br/>
  <input type="submit" value="Save Platform"/>
  </form>
  <br/><br/>
  <div class="show_content">
  <div class="description">
  <br/><br/>
  <label for="genre">Genre:  </label>  
  <input type="text" id="genre" value="History" readonly/><br/><br/>
  <label for="awards">Awards: </label>  
  <input type="text" id="awards" value="Oscar, Golden Globes" readonly/><br/><br/>
  <p>Main actors: </p>  
  <div class="block">
   
    <img id="one" src="https://www.scania.org/wp-content/uploads/2018/10/article-10-2.jpg"/>
    <img id="two" src="https://avatarfiles.alphacoders.com/121/121594.jpg"/>
    <img id="three" src="https://www.scania.org/wp-content/uploads/2018/10/article-10-2.jpg"/>
  </div>
  </div>
  <br/>
</div>
  </fieldset>
  </div>
  <img id="cover" src={image} alt=""></img>
  <div id="clear"></div>
  </fieldset>
    </div>
    
    <Footer />
</>
  );
}
export default IndividualShow