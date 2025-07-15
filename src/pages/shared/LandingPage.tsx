import { Box } from "@mui/material";
import { ImageCarousel } from "../../components/shared/ImageCarousel";
import { FeaturedCourses } from "../../components/shared/FeaturedCourses";
import { BrowseCourses } from "../../components/shared/BrowseCourses";
import { InstructorsSection } from "../../components/shared/InstructorsSection";

const LandingPage = () => {
  const slides = [
    {
      imageSrc: "/assets/lp_hero_5.jpg",
      altText: "lerners perspective",
      heading: "Learn About Your Deen",
      subheading:
        "Build knowlege of FIQ,  build your logical thinking with MANTIQ, and learn your islamic history from world-class teachers.",

      buttons: [
        { label: "SIGN UP", route: "/sign-up" },
        { label: "LOG IN", route: "/login" },
      ],
      contentPosition: "center" as const,
    },
    {
      imageSrc: "/assets/lp_hero_2.jpg",
      altText: "muslims sisterhood",
      heading: "Collaborate with common goals",
      subheading: "Meet and strive towards ILM with liked minded individuals.",
      contentPosition: "center" as const,
    },
    {
      imageSrc: "/assets/lp_hero_8.jpg",
      altText: "Instructor",
      heading: "Become an Instructor",
      subheading: "Share your knowledge with learners worldwide.",
      buttons: [
        { label: "Join as Instructor", route: "/instructor-onboarding" },
      ],
      contentPosition: "center" as const,
    },
    {
      imageSrc: "/assets/lp_hero_1.jpg",
      altText: "Global community",
      heading: "Join our global community",
      subheading: "Connect, collaborate, and grow together.",
      contentPosition: "center" as const,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <ImageCarousel slides={slides} />
      <FeaturedCourses />
      <BrowseCourses />
      <InstructorsSection />
    </Box>
  );
};
export default LandingPage;
