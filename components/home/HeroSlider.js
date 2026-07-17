"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ banners }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop
      pagination={{ clickable: true }}
      className="w-full"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <>
            <div className="md:hidden">
              <Image
                src={banner.mobile}
                alt={`GTR Classes Banner ${index + 1}`}
                width={1080}
                height={526}
                priority={index === 0}
                className="w-full h-auto"
              />
            </div>

            <div className="hidden md:block">
              <Image
                src={banner.desktop}
                alt={`GTR Classes Banner ${index + 1}`}
                width={1983}
                height={495}
                priority={index === 0}
                className="w-full h-auto"
              />
            </div>
          </>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}