import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import './Header.css' 
import Hamburger from './Hamburger'

const Header = () => {
  return (
  <StickyHeader    
    // This section is sticky 
    header={
      <div className="header-root">
        <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <h1 className="header-title">TV Tracker</h1>
      </div>
    }
  >
  </StickyHeader>
  // The <section> right above me is a 'barrier' so the header has space
  )
}

export default Header;