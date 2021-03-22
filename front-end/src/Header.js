import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import './Header.css'
import Hamburger from './Hamburger'
import LoginButton from './LoginButton'
import SignupButton from './SignupButton'

const Header = () => {
  return (
    <StickyHeader
      // This section is sticky 
      header={
        <div className="header-root">
          <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <h1 className="header-title">TV Tracker</h1>
          <LoginButton className="login-buttons"><LoginButton/>
          <SignupButton className="login-buttons"><SignupButton/>
        </div>
      }
    >
    </StickyHeader>
  );
}

// The <section> right above me is a 'barrier' so the header has space

export default Header;