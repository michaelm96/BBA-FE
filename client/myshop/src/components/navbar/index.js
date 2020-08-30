import React, { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBFormInline,
} from "mdbreact";
import { Link, useHistory } from "react-router-dom";

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setAccessToken(localStorage.getItem("access_token"));
    }
  }, []);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MDBNavbar style={{ backgroundColor: "#7123c4" }} dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">
          <Link to={"/"} style={{ color: "white" }}>
            MyShop
          </Link>
        </strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => toggleCollapse()} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav>
          <MDBNavItem>
            <MDBFormInline waves>
              <div className="md-form my-0">
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </MDBFormInline>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#">About</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#">Testimonial</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown drop>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu right>
                {!accessToken ? (
                  <>
                    <MDBDropdownItem>
                      <Link to={`/login`}>Login</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <Link to={`/register`}>Register</Link>
                    </MDBDropdownItem>
                  </>
                ) : (
                  <>
                    <MDBDropdownItem>
                      <Link to={`/cart`}>Cart</Link>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      onClick={() => {
                        localStorage.removeItem("access_token");
                        setAccessToken(null);
                        history.push("/");
                      }}
                    >
                      <Link>Logout</Link>
                    </MDBDropdownItem>
                  </>
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default NavbarPage;
