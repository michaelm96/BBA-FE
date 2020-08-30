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
                  src="https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311_1280.jpg"
                  alt="First slide"
                  style={{ height: "70vh" }}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2014/09/23/21/23/iphone-6-458159__480.jpg"
                  alt="Second slide"
                  style={{ height: "70vh" }}
                />
              </MDBView>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="w-100"
                  src="https://cdn.pixabay.com/photo/2016/03/27/19/43/smartphone-1283938_1280.jpg"
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
