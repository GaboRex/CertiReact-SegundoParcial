import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import NoteIcon from "@mui/icons-material/Note";
import Grid from "@mui/material/Grid";
import Note from "../components/Note";
import NoteSummary from "../components/NoteSummary";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NotesCounterModal from "../components/NotesCounterModal";
import NavBar from "./NavBar";

export default function Layout() {
  const [toggle, setToggle] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const theme = useTheme();

  // Función para guardar una nueva nota en el localStorage
  const saveNote = (note) => {
    const newNotes = [...notes, note];
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  // Cálculo del número total de notas utilizando useMemo
  const totalNotes = useMemo(() => {
    return notes.length;
  }, [notes]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      ((event.key === "Tab" || event.key === "Shift"))
    ) {
      return;
    }
    setToggle(open);
  };

  const handleNoteClick = () => {
    setToggle(false);
    setShowNote(true);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredNotes = filterCategory
    ? notes.filter((note) => note.category === filterCategory)
    : notes;

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          {
            text: "Inicio",
            icon: <HomeIcon />,
            onClick: () => {
              setShowNote(false);
              setFilterCategory("");
            },
          },
          { text: "Notas", icon: <NoteIcon />, onClick: handleNoteClick },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon sx={{ color: "#0B2447" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#0B2447" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <NavBar
        toggle={toggleDrawer}
        filterCategory={filterCategory}
        onFilterCategoryChange={handleFilterCategoryChange}
        notes={notes}
      />
      <Drawer anchor={"left"} open={toggle} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      {showNote && <Note saveNote={saveNote} selectedNote={selectedNote} />}
      {!showNote && (
        <div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: theme.palette.primary.main }}>Mis notas:</h2>
            <Button
              variant="contained"
              onClick={handleOpenModal}
              style={{ position: "fixed", bottom: "20px", right: "20px" }}
            >
              Ver contador de notas
            </Button>
          </div>
          <Grid container spacing={2}>
            {filteredNotes.map((note, index) => (
              <Grid item xs={4} key={index}>
                <NoteSummary
                  title={note.title}
                  content={note.content}
                  category={note.category}
                  onDelete={() => handleDeleteNote(index)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <NotesCounterModal
        open={openModal}
        totalNotes={totalNotes}
        onClose={handleCloseModal}
      />
    </div>
  );
}
