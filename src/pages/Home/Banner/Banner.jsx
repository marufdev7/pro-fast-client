import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className='mt-7 mb-7'>
            <Carousel autoPlay={true} showStatus={false} infiniteLoop={true} showThumbs={false} interval={3000} showArrows={false}>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img2} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;