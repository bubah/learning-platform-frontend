// src/components/SlideContent.tsx
import { Box } from "@mui/material";
import React from "react";

interface SlideContentProps {
  imageSrc: string;
  altText?: string;
  content?: React.ReactNode;
  // 🔥 swap from caption → content
}

export const SlideContent = ({
  imageSrc,
  altText,
  content,
}: SlideContentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // 👈 stacked on mobile, side by side on desktop
        width: "100%",
        height: "100%",
      }}
    >
      {/* LEFT: Image */}
      <Box
        component="img"
        src={imageSrc}
        alt={altText}
        sx={{
          width: { xs: "100%", md: "50%" }, // 👈 full width on mobile, half on desktop
          objectFit: "cover",
          maxHeight: "100%", // prevents stretch
        }}
      />

      {/* RIGHT: Content */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 4, // nice padding
        }}
      >
        {content}
      </Box>
    </Box>
  );
};
