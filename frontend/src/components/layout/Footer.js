import { React, Fragment } from 'react';
import '../../App.css';

const Footer = () => {
    const moonLanding = new Date();

  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
        generation-jewelry Project- {moonLanding.getFullYear()}, jewelry Store
        </p>
      </footer>
    </Fragment>
  );
};


export default Footer;
