import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Hero from "./Hero";
import { SlideContent } from "./SlideContent";

interface CarouselSlide {
  src: string;
  alt?: string;
  content?: React.ReactNode;
}

interface ImageCarouselProps {
  slides: CarouselSlide[];
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
        {/* HERO as first slide */}
        <SwiperSlide>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Hero />
          </Box>
        </SwiperSlide>

        {/* Your image slides */}
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideContent
              imageSrc={slide.src}
              altText={slide.alt}
              content={slide.content}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
