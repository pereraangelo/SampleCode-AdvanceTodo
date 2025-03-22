import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { sortByPriority, sortByStatus } from "../utils/sortTasks";

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectSearchQuery = (state: RootState) =>
  state.filters.searchQuery;
export const selectSortBy = (state: RootState) => state.filters.sortBy;

export const selectFilteredAndSortedTasks = createSelector(
  [selectTasks, selectSearchQuery, selectSortBy],
  (tasks, searchQuery, sortBy) => {
    // Filter by search query
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort by criteria
    switch (sortBy) {
      case "PRIORITY":
        return sortByPriority(filtered);
      case "STATUS":
        return sortByStatus(filtered);
      default:
        return filtered;
    }
  }
);
