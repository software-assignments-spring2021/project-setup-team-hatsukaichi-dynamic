import React from 'react'
import Footer from './Footer'
import Hamburger from './Hamburger'
import './IndividualShow.css';
import image from './poster.jpg'
import img_actor1 from './actor1.jpeg'
import img_actor2 from './actor2.jpeg'
import img_actor3 from './actor3.jpeg'
import img_actor4 from './actor4.jpeg'


const IndividualShow = (props) => {
  const returnToShows = (() => {
    window.location.href='/my-shows/'
  });

  const addToWatched = (() => {
    window.location.href='/my-shows/'
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
    <input id="episode" class="progress" value="15"/>
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
  <figure>
  <img  id="one" src={img_actor1}/>
    <figcaption>Beau Bridges</figcaption>
    </figure>
    <figure>
    <img id="two" src={img_actor2}/>
    <figcaption>Ron Silver</figcaption>
    </figure>
    <figure>
    <img id="three" src={img_actor3}/>
    <figcaption>George Takei</figcaption>
    </figure>
    <figure>
    <img id="four" src={img_actor4}/>
    <figcaption>Kenneth Welsh</figcaption>
    </figure>
    
    
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