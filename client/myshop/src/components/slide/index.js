import React from "react";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";

const Slide = () => {
  return (
    <div>
      <MDBContainer
        style={{
          minWidth: "100%",
          margin: "0px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
      >
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
        >
          <MDBCarouselInner style={{ maxHeight: "70vh" }}>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                  alt="First slide"
                  style={{ height: "70vh" }}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                  alt="Second slide"
                  style={{ height: "70vh" }}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="w-100"
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                  alt="Third slide"
                  style={{ height: "70vh" }}
                />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    </div>
  );
};

export default Slide;
