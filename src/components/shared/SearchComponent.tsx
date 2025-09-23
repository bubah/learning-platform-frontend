import { Autocomplete, TextField } from "@mui/material";

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

export default function SearchComponent() {
  return (
    <Autocomplete
      disableClearable
      options={top100Films.map((option) => option.title)}
      sx={{
        minWidth: 300,
        width: "800px",
        backgroundColor: "white",
        borderRadius: 1,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          fullWidth
          slotProps={{
            input: {
              ...params.InputProps,
              type: "search",
            },
          }}
        />
      )}
    />
  );
}
