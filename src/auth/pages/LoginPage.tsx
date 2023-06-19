import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useDispatch } from "../../context/ContextProvider";
import { types } from "../../context/noteReducer";
import { useForm } from "react-hook-form";

import logo2 from "../../assets/logo3.png"; // Importa la imagen del logo

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    dispatch({ type: types.login });
    navigate("/");
  };

  return (
    <AuthLayout title="Bienvenido a NoteTagger">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container justifyContent="center" mb={2}>
            <img src={logo2} alt="Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  placeholder="email@gmail.com"
                  fullWidth
                  variant="outlined"
                  {...register("email", { required: "Campo obligatorio", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  variant="outlined"
                  {...register("password", { required: "Campo obligatorio" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth type="submit">
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Google />}
                  fullWidth
                  sx={{ bgcolor: "#DB4437", color: "#fff" }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
