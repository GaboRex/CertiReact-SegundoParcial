import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const NotesCounterModal = ({ open, totalNotes, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Total de notas: {totalNotes}</h3>
        <Button variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default NotesCounterModal;
