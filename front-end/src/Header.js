import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import './Header.css'
import Hamburger from './Hamburger'
import logo from './logo.png'
import HeaderLogo from './HeaderLogo';

const Header = () => {
  return (
    <StickyHeader
      header={
        <div className="header-root">
          <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
          <HeaderLogo src={logo} className="logo-img" />
        </div>
      }
    >
    </StickyHeader>
  );
}

export default Header;