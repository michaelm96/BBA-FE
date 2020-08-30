import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue" className="font-small">
      <MDBContainer className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">My Shop</h5>
            <p>
              A little description about MyShop
            </p>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Solusi</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Jual Beli</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Jasa</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">F&B</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Company</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">About Us</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Our Work</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Our Team</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Career</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="2">
            <h5 className="title">Feature</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Inventory</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Investor</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Support</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">FAQ</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/michaelm96"> Michael's Github </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;