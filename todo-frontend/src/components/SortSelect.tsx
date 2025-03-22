import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { setSortBy } from "../store/slices/filterSlice";

const SortSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const [sortValue, setSortValue] = React.useState<
    "PRIORITY" | "STATUS" | "NONE"
  >("NONE");

  const handleChange = (
    event: SelectChangeEvent<"PRIORITY" | "STATUS" | "NONE">
  ) => {
    const value = event.target.value as "PRIORITY" | "STATUS" | "NONE";
    setSortValue(value);
    dispatch(setSortBy(value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Sort by</InputLabel>
      <Select value={sortValue} onChange={handleChange} label="Sort by">
        <MenuItem value="NONE">Sort by</MenuItem>
        <MenuItem value="PRIORITY">Priority</MenuItem>
        <MenuItem value="STATUS">Status</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
