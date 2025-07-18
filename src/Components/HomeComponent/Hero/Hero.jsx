import { Carousel } from "react-bootstrap";

const Hero = () => {
  return (
    <Carousel fade>
      <Carousel.Item>
        <div className="m-0 p-0">
          <div className="w-50">
            <img src="" alt="" />
          </div>
          <div className="w-50">
            <img src="" alt="" />
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <img src="" alt="" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="" alt="" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
