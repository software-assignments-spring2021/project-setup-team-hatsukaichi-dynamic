import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div id="footer-container">
      <Link to="/terms-of-service">Terms of Service</Link>
    </div>
  );
}

export default Footer;