import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SlideButton {
  label: string;
  route: string;
}

export interface SlideProps {
  imageSrc?: string;
  altText?: string;
  heading: string;
  subheading?: string;
  buttons?: SlideButton[];
  height?: string | number;
  overlayColor?: string;
  overlayOpacity?: number;
  contentPosition?:
    | "center"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
}

const Slide = ({
  imageSrc,
  altText,
  heading,
  subheading,
  buttons = [],
  height = "460px",
  overlayColor = "black",
  overlayOpacity = 0.4,
  contentPosition = "center",
}: SlideProps) => {
  const positionStyles: Record<string, any> = {
    center: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    topLeft: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
      textAlign: "left",
    },
    topRight: {
      justifyContent: "flex-start",
      alignItems: "flex-end",
      textAlign: "right",
    },
    bottomLeft: {
      justifyContent: "flex-end",
      alignItems: "flex-start",
      textAlign: "left",
    },
    bottomRight: {
      justifyContent: "flex-end",
      alignItems: "flex-end",
      textAlign: "right",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#FFFFFFDE", // optional: matches landing page
      }}
    >
      <Box
        role="img"
        aria-label={altText}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "85%",
          height,
          display: "flex",
          flexDirection: "column",
          p: 4,
          ...positionStyles[contentPosition],
        }}
      >
        {/* ✅ Background image */}
        {imageSrc && (
          <Box
            component="img"
            src={imageSrc}
            alt={altText}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              backgroundColor: "black",
              zIndex: 0,
            }}
          />
        )}

        {/* ✅ Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 1,
          }}
        />

        {/* ✅ Foreground content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "1000px",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // ✅ semi-transparent dark background
            borderRadius: 2,
            padding: { xs: 2, md: 4 },
            color: "#fff",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            {heading}
          </Typography>

          {subheading && (
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.2rem", md: "1.8rem" },
                mb: 4,
              }}
            >
              {subheading}
            </Typography>
          )}

          {buttons.length > 0 && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              {buttons.map((btn, idx) => (
                <Link
                  key={idx}
                  to={btn.route}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      px: 3,
                      py: 1.5,
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      border: "2px solid transparent",
                      color: "limegreen",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "none",
                      "&:hover": {
                        border: "2px solid #228B22",
                        backgroundColor: "rgba(34, 139, 34, 0.1)",
                        color: "#32CD32",
                        fontWeight: 800,
                      },
                    }}
                  >
                    {btn.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Slide;
