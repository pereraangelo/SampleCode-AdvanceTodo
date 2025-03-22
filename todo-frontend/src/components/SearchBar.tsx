import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSearchQuery } from "../store/slices/filterSlice";
import SortSelect from "./SortSelect";
import { TextField, Button, Box, Typography } from "@mui/material";
import { selectFilteredAndSortedTasks } from "../store/selectors";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectFilteredAndSortedTasks);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(query));
  };

  return (
    <>
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{ textAlign: "start", mx: 2, mb: 1 }}
      >
        {tasks?.length !== 0
          ? `Just ${tasks?.length} more to go—you're on the right track!`
          : null}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 2,
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search To-Do..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ px: 4, textTransform: "none" }}
        >
          Search
        </Button>
        <SortSelect />
      </Box>
    </>
  );
};

export default SearchBar;
