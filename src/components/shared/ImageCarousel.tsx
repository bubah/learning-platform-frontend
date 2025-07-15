import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Slide, { SlideProps } from "./Slide";

interface ImageCarouselProps {
  slides: SlideProps[];
}

export const ImageCarousel = ({ slides }: ImageCarouselProps) => {
  return (
    <Box sx={{ width: "100%", borderRadius: 2, overflow: "hidden" }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
