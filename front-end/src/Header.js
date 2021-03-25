import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import './Header.css'
import Hamburger from './Hamburger'
import logo from './Images/logo.png'
import HeaderLogo from './HeaderLogo';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton'

const Header = () => {
  return (
    <StickyHeader
      header={
        <div className="header-root">
          <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <HeaderLogo src={logo} className="logo-img" />
          <LoginButton/>
          <SignupButton/>
        </div>
      }
    >
    </StickyHeader>
  );
}

export default Header;
