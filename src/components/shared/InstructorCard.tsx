// src/components/InstructorCard.tsx
import {
  Box,
  Typography,
  Card,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Rating,
} from "@mui/material";

interface Instructor {
  name: string;
  expertise: string;
  experience: string;
  image: string;
  courses: string[];
  rating: number;
  comment: string;
}

export const InstructorCard = ({ instructor }: { instructor: Instructor }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "linear-gradient(to bottom, #fff7d6, white)",
        boxShadow: 2,
        p: 3,
        minWidth: 260,
        flex: 1,
        m: 2,
      }}
    >
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          src={instructor.image}
          alt={instructor.name}
          sx={{ width: 100, height: 100, borderRadius: "50%" }}
        />
      </Box>
      <Typography variant="h6" fontWeight="bold" align="center">
        {instructor.name}
      </Typography>
      <Typography
        variant="subtitle2"
        align="center"
        sx={{ color: "text.secondary", mb: 1 }}
      >
        {instructor.expertise} • {instructor.experience}
      </Typography>

      <Typography variant="body2" fontWeight={600}>
        Courses Offered:
      </Typography>
      <List dense disablePadding>
        {instructor.courses.map((course, i) => (
          <ListItem key={i} sx={{ py: 0.2 }}>
            <ListItemText primary={`• ${course}`} />
          </ListItem>
        ))}
      </List>

      <Box mt={1}>
        <Rating value={instructor.rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" fontStyle="italic">
          "{instructor.comment}"
        </Typography>
      </Box>
    </Card>
  );
};
