import { createContext, useState } from "react";
import { memo } from "react";
import { Card, Typography } from "@mui/material";

const LectureContext = createContext({});

export const useLecture = () => {
    const context = LectureContext;
    if (!context) {
        throw new Error("useLecture must be used within a LectureProvider");
    }
    return context;
};

export const LectureProvider = memo(({
    children,
    courseId,
    description,
    title,
}: {
    children: React.ReactNode;
    courseId: string;
    description: string;
    title: string;
}) => {
    const [lectureState, setLectureState] = useState<{ title: string, description: string}>({title, description});

    return (
        <LectureContext.Provider value={{}}>
            <Card
                variant="outlined"
                sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
            >
                {lectureState?.title}
                {lectureState?.description}
                <Typography>Sections:</Typography>
                {children}
            </Card>
        </LectureContext.Provider>
    );
});
