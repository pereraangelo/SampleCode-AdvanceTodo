import React, { useState } from "react";
import TaskList from "./components/ TaskList";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import { Modal, Box, Button } from "@mui/material";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Search Bar   */}
      <div className="search-bar-container">
        <SearchBar />
      </div>
      {/* Add To-Dos  */}

      <Button
        className="add-task-btn my-2"
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", mb: 2 }}
        onClick={handleOpenModal}
      >
        + Add To-Do
      </Button>

      {/*  Task List */}

      <TaskList />

      {/* Modal for Adding Tasks */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TaskForm />
          <Button
            variant="outlined"
            color="error"
            onClick={handleCloseModal}
            sx={{
              textTransform: "none",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default App;
