import React from 'react';
import {CardImg, Carousel, CarouselItem} from "react-bootstrap";
import Egypt from '../assets/Egypt.jpg'
import istanbul from '../assets/Istanbul4.jpg'
import maldives from '../assets/Switzerland.png'
import maldive from "../assets/maldive.jpg";


const Slider = () => {
    return (<>
            <Carousel>
                <CarouselItem style={{'height': '600px'}}>
                    <CardImg className="d-block" src={Egypt} alt="First slider"/>
                </CarouselItem>
                <CarouselItem style={{'height': '600px'}}>
                    <CardImg className="d-block" src={maldive} alt="First slider"/>
                </CarouselItem>
                <CarouselItem style={{'height': '600px'}}>
                    <CardImg className="d-block" src={maldives} alt="First slider"/>
                </CarouselItem>
            </Carousel>
        </>);
};

export default Slider;