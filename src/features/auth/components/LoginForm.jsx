import { useRef, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useBusiness } from "../../permissions/context/BusinessContext";

import SubmitButton from "../../../components/forms/SubmitButton";
import FormTextField from "../../../components/forms/FormTextField";
import FormBox from "../../../components/forms/FormBox";
import ErrorMessage from "../../../components/layout/ErrorMessage";
// Material UI
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
    const theme = useTheme();

    const axiosPrivate = useAxiosPrivate();
    const { auth, login } = useAuth();
    const { setBusinessData } = useBusiness();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const emailRef = useRef();
    const errorRef = useRef();

    const remembered_email = localStorage.getItem("remembered_email")
        ? localStorage.getItem("remembered_email")
        : "";
    const remembered_password = localStorage.getItem("remembered_password")
        ? localStorage.getItem("remembered_password")
        : "";
    const remembered_rememberMe = localStorage.getItem("remembered_rememberMe")
        ? localStorage.getItem("remembered_rememberMe")
        : false;

    const [email, setEmail] = useState(remembered_email);
    const [password, setPassword] = useState(remembered_password);
    const [rememberMe, setRememberMe] = useState(remembered_rememberMe);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    useEffect(() => {
        const getEmployee = async (userId) => {
            try {
                const response = await axiosPrivate.get(
                    `users/${userId}/employee`,
                );
                return response.data;
            } catch (error) {
                console.error(error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage(
                        "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
                    );
                }
                return {};
            }
        };
        if (auth.accessToken && auth.userId) {
            const fetchEmployee = async (userId) => {
                const employee = await getEmployee(userId);
                const employeeId = employee.employee_id;
                const firstName = employee.first_name;
                const lastName = employee.last_name;
                const position = employee.position;
                const manager = employee.manager;
                const permissions = employee.permissions;

                setBusinessData({
                    employeeId,
                    firstName,
                    lastName,
                    position,
                    manager,
                    permissions,
                });

                if (employeeId) {
                    navigate(from, { replace: true });
                }
            };

            fetchEmployee(auth.userId);
        }
    }, [
        auth.accessToken,
        auth.userId,
        setBusinessData,
        from,
        navigate,
        axiosPrivate,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("token/obtain/", {
                email: email,
                password: password,
            });

            if (response.data.access_token && response.data.refresh_token) {
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                localStorage.setItem("refresh", response.data.refresh_token);
                const userId = jwtDecode(response.data.access_token).user_id;
                login(accessToken, refreshToken, userId);

                // Stocker les valeurs des champs email et password si "Se souvenir de moi" est coché
                if (rememberMe) {
                    localStorage.setItem("remembered_email", email);
                    localStorage.setItem("remembered_password", password);
                    localStorage.setItem("remembered_rememberMe", rememberMe);
                    setEmail("");
                    setPassword("");
                } else {
                    localStorage.removeItem("remembered_email");
                    localStorage.removeItem("remembered_password");
                    localStorage.removeItem("remembered_rememberMe");
                    setEmail("");
                    setPassword("");
                }
            } else {
                console.error("Les valeurs access et refresh sont manquantes.");
            }
        } catch (error) {
            console.error(error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage(
                    "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
                );
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <ErrorMessage ref={errorRef} message={errorMessage} />
                <FormBox>
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <FormBox
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormTextField
                                    id="email"
                                    label="Adresse Email"
                                    type="email"
                                    autoComplete="username"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    inputRef={emailRef}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={Boolean(rememberMe)}
                                            onChange={(e) =>
                                                setRememberMe(!rememberMe)
                                            }
                                            name="rememberMe"
                                            color="primary"
                                        />
                                    }
                                    label="Se souvenir de moi"
                                />
                            </Grid>
                        </Grid>
                        <SubmitButton onClick={handleSubmit}>
                            Me connecter
                        </SubmitButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href="" variant="body2">
                                    Mot de passe oublié?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/auth/register">
                                    {"Créer un compte"}
                                </Link>
                            </Grid>
                        </Grid>
                    </FormBox>
                </FormBox>
            </Container>
        </ThemeProvider>
    );
}
