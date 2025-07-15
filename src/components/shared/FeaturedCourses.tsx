import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Container,
} from "@mui/material";

const featuredCourses = [
  {
    title: "Foundations of Islamic Fiqh",
    instructor: "Shaykh Ahmad al-Tirmidhi",
    image: "src/assets/lp_fc_fiq.jpg", // swap with real later
    description:
      "Understand the principles of Islamic jurisprudence through Hanafi methodology, with real-life case studies.",
    duration: "15h",
    rating: 4.9,
    reviews: 1250,
  },
  {
    title: "Intro to Mantiq: Islamic Logic",
    instructor: "Ustadh Farid ibn Yusuf",
    image: "src/assets/lp_fc_logic.jpg", // swap with relevant image
    description:
      "Explore classical logic as taught in traditional Islamic madaris. Ideal for students of 'Aalim programs.",
    duration: "10h",
    rating: 4.8,
    reviews: 980,
  },
  {
    title: "A Journey Through Islamic History",
    instructor: "Dr. Layla Siddiq",
    image: "src/assets/lp_fc_history.jpg", // replace with themed asset
    description:
      "Travel from the era of the Prophet ﷺ to the Ottoman Caliphate, understanding key events and personalities.",
    duration: "20h",
    rating: 4.7,
    reviews: 1100,
  },
];

export const FeaturedCourses = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 4, backgroundColor: "#f9f9f9" }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Featured Courses
        </Typography>

        <Grid container spacing={4}>
          {featuredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    by {course.instructor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating
                      value={course.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2">({course.reviews})</Typography>
                  </Box>
                  <Typography variant="body2">⏱ {course.duration}</Typography>
                </CardActions>
                <Box sx={{ display: "flex", px: 2, pb: 2, gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "0%",
                        height: "3px",
                        backgroundColor: "#FFD700",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#D4AF37", // rich gold
                        color: "#0B3D2E",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    Purchase Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
