import { useState, memo, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const NoteCard = styled(Card)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const NoteContent = styled(CardContent)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const NoteCategory = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const NoteActions = styled(CardActions)(({ theme }) => ({
  justifyContent: "center",
  paddingBottom: theme.spacing(2),
}));

const NoteButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Note = memo(({ saveNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  const titleInputRef = useRef(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClearFields = () => {
    setTitle("");
    setContent("");
    setCategory("");
    setError(false);
  };

  const handleSaveNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      setError(true);
      return;
    }

    const newNote = {
      title: title,
      content: content,
      category: category,
    };

    saveNote(newNote);
    handleClearFields();
  };

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <NoteCard variant="outlined">
        <NoteContent>
          <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            ¿Qué vamos a escribir?
          </Typography>
          <TextField
            label="Título"
            value={title}
            onChange={handleTitleChange}
            inputRef={titleInputRef}
            fullWidth
            margin="normal"
            error={error && title.trim() === ""}
            helperText={error && title.trim() === "" && "Ingrese un título"}
          />
          <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
            {title}
          </Typography>
          <TextField
            label="Contenido"
            value={content}
            onChange={handleContentChange}
            multiline
            fullWidth
            margin="normal"
            error={error && content.trim() === ""}
            helperText={error && content.trim() === "" && "Ingrese un contenido"}
          />
          <Typography variant="body2">{content}</Typography>
          <NoteCategory
            label="Etiqueta"
            select
            value={category}
            onChange={handleCategoryChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="salud">Salud</MenuItem>
            <MenuItem value="ocio">Ocio</MenuItem>
            <MenuItem value="personal">Personal</MenuItem>
            <MenuItem value="familiar">Familiar</MenuItem>
            <MenuItem value="trabajo">Trabajo</MenuItem>
            <MenuItem value="estudios">Estudios</MenuItem>
          </NoteCategory>
        </NoteContent>
        <NoteActions>
          <NoteButton
            size="small"
            onClick={handleClearFields}
            color="primary"
            variant="contained"
            sx={{ marginRight: 2 }}
          >
            Borrar
          </NoteButton>
          <NoteButton size="small" onClick={handleSaveNote} color="primary" variant="contained">
            Guardar
          </NoteButton>
        </NoteActions>
      </NoteCard>
    </Box>
  );
});

export default Note;
