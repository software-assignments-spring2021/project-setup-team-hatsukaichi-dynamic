import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import './Header.css' 
import Hamburger from './Hamburger'

const Header = () => (
  [
  <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />,
  <StickyHeader    
    // This section is sticky 
    header={
      <div className="header-root">
        <h1 className="header-title">TV Tracker</h1>
        <Hamburger>1</Hamburger>
      </div>
    }
  >
    <section>
      <p><br></br><br></br><br></br><br></br></p>
    </section>
  </StickyHeader>
  // The <section> right above me is a 'barrier' so the header has space
  ]
);

export default Header;