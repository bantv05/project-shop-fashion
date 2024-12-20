import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/SlickCss.css"
import React from "react";
import Slider from "react-slick";
export const SlickCustom = () => {
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const data = [
        {
            id: 1,
            img: "https://theme.hstatic.net/200000000133/1001205759/14/slide_1_img.jpg?v=1468"
        },
        {
            id: 2,
            img: "https://theme.hstatic.net/200000000133/1001205759/14/slide_1_img.jpg?v=1269"
        },
        {
            id: 3,
            // img: "https://theme.hstatic.net/200000000133/1001205759/14/slide_3_img.jpg?v=1210"
            img: "https://theme.hstatic.net/200000000133/1001205759/14/slide_4_img.jpg?v=1379"
        },
        {
            id: 4,
            img: "https://theme.hstatic.net/200000000133/1001205759/14/slide_2_img.jpg?v=1210"
        }
    ]
  return (
      <div className="container relative z-1">
        <div className="h-[610px] m-auto">
            <Slider {...settings}>
            {
                data.map((item, index) => (
                    <div key={item.id}>
                        <div>
                            <img src={item.img} alt="slick" className="w-full"/>
                        </div>
                    </div>
                ))
            }
            </Slider>
        </div>
      </div>
  )
}