import React from "react";
import logo from "../../assets/logo/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer rounded-xl p-20 bg-base-200 text-base-content mt-12 ">
        <div>
          <img src={logo} alt="Footer logo" className="h-32 w-32" />
          <p>
            Bike Trader Ltd.
            <br />
            <small>©2026, all copy right reserve </small>
          </p>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
