import React, { useState, memo, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Note = memo(({ saveNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);

  const titleInputRef = useRef(null); // Referencia para el campo de título

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
    titleInputRef.current.focus(); // Enfocar automáticamente el campo de título al cargar la página
  }, []);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ¿Qué vamos a escribir?
          </Typography>
          <TextField
            label="Titulo"
            value={title}
            onChange={handleTitleChange}
            inputRef={titleInputRef} // Asignar la referencia al campo de título
            fullWidth
            margin="normal"
            error={error && title.trim() === ""}
            helperText={error && title.trim() === "" && "Ingrese un título"}
          />
          <Typography variant="h5" component="div">
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
          <TextField
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
          </TextField>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            onClick={handleClearFields}
            color="primary"
            variant="contained"
          >
            Borrar
          </Button>
          <Button
            size="small"
            onClick={handleSaveNote}
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});

export default Note;
