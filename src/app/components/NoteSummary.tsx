import  { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteSummary = memo(({ title, content, category, onDelete, onEdit }) => {
  const theme = useTheme();

  return (
    <Card variant="outlined" sx={{ margin: "10px", backgroundColor: theme.palette.primary.main }}>
      <CardContent sx={{ paddingBottom: "16px !important" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ color: "#AFD3E2", fontSize: "2rem", marginBottom: "8px" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#FFFFFF", fontSize: "1rem", marginBottom: "8px" }}>
          {content}
        </Typography>
        <Typography variant="caption" sx={{ color: "#FFFFFF", fontSize: "0.8rem" }}>
          {category}
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
          <DeleteIcon sx={{ color: "#FFFFFF", cursor: "pointer", marginRight: "8px" }} onClick={onDelete} />

        </div>
      </CardContent>
    </Card>
  );
});
export default NoteSummary;
