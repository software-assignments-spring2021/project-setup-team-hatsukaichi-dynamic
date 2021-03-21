import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <Link to="/terms-of-service" className="footer-links">Terms of Service</Link>
      <Link to="/meet-the-team" className="footer-links">Meet the Team</Link>
    </footer>
  );
}

export default Footer;
