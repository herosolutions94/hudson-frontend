import React from "react";
import Link from "next/link";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function Testimonials({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {data.map((val) => {
          return (
            <div className="item" key={val.id}>
              <div className="inner">
                <div className="testi_flex">
                  <div className="testi_icon">
                    <img src={val.image} alt={val.name} />
                  </div>
                  <div className="testi_footer">
                    <p>{val.comment}</p>
                    <div className="lower_content">
                      <h5>{val.name}</h5>
                      <p>
                        <span>{val.designation}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
}