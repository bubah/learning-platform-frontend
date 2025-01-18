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
    title,
    description,
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) => {
    const [lectureState, setLectureState] = useState<{ title: string, description: string}>({title, description});

    return (
        <LectureContext.Provider value={{}}>
            <Card
                variant="outlined"
                sx={{ padding: "1rem", textAlign: "left", marginBottom: 5 }}
            >
                {lectureState?.title}
                <Typography>Sections:</Typography>
                {children}
            </Card>
        </LectureContext.Provider>
    );
});
