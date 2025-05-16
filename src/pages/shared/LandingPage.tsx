import { Button, Container, Typography } from "@mui/material";
import { ImageCarousel } from "../../components/shared/ImageCarousel";

const LandingPage = () => {
  const slides = [
    {
      src: "/src/assets/free-learn.jpg",
      content: <Typography variant="h1">Welcome!</Typography>,
    },
    {
      src: "/src/assets/instructor_bubah.jpeg",
      content: (
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "limegreen" }}
        >
          Become An Instructor
        </Button>
      ),
    },
    {
      src: "/src/assets/group_learning.avif",
      content: "Join our global community",
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 0 }}>
        <ImageCarousel slides={slides} />
      </Container>
    </>
  );
};
export default LandingPage;
