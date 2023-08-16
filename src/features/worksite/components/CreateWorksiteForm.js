// features/worksites/components/NewWorksite.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useWorksiteOptionsQuery from "../hooks/useWorksiteOptionsQuery";
import useCreateWorksiteMutation from "../hooks/useCreateWorksiteMutation";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import SubmitButton from "../../../components/forms/SubmitButton";
import FormTextField from "../../../components/forms/FormTextField";
import FormBox from "../../../components/forms/FormBox";
// Material UI
import {
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    sector: Yup.string().required("Le secteur est requis"),
    client: Yup.string().required("Le client est requis"),
    city: Yup.string().required("La ville est requise"),
    address: Yup.string().required("L'adresse est requise"),
    postal_code: Yup.number().required("Le code postal est requis"),
    started: Yup.date().nullable().required("La date de début est requise"),
    status: Yup.string().required("Le statut est requis"),
});

function CreateWorksiteForm({ page, setPage, worksite, setWorksite }) {
    const {
        data: worksiteOptions,
        isLoading,
        isError,
    } = useWorksiteOptionsQuery();
    const createWorksiteMutation = useCreateWorksiteMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            sector: "",
            client: "",
            city: "",
            address: "",
            postal_code: "",
            started: null,
            status: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createWorksiteMutation.mutateAsync(
                    values,
                );
                console.log("Chantier créé avec succès :", response);
                setWorksite({
                    worksiteId: response.worksite_id,
                    name: response.name,
                    city: response.city,
                });
                setPage(page + 1);
            } catch (error) {
                console.error(
                    "Erreur lors de la création du chantier :",
                    error,
                );
                if (error.name === "WorksiteAlreadyExists") {
                    formik.setErrors({
                        name: error.message,
                        city: error.message,
                    });
                }
            }
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message.data.detail} />;
    }

    if (!worksiteOptions) {
        return <p>Erreur de chargement du formulaire</p>;
    }

    return (
        <FormBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <ErrorMessage
                message={Object.keys(formik.errors).map((key) => (
                    <div key={key}>{formik.errors[key]}</div>
                ))}
            />

            <form onSubmit={formik.handleSubmit} style={{ width: "80%" }}>
                <Typography
                    component="h1"
                    variant="h5"
                    margin="normal"
                    textAlign="center"
                >
                    Nouveau Chantier
                </Typography>
                <FormTextField
                    id="name"
                    label="Nom"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <FormControl fullWidth>
                    <InputLabel id="sector-label">Secteur</InputLabel>
                    <Select
                        labelId="sector-label"
                        id="sector"
                        name="sector"
                        label="Secteur"
                        value={formik.values.sector}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.sector &&
                            Boolean(formik.errors.sector)
                        }
                        margin="dense"
                    >
                        {worksiteOptions.sectors.map((option) => (
                            <MenuItem key={option[0]} value={option[0]}>
                                {option[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormTextField
                    fullWidth
                    id="client"
                    name="client"
                    label="Client"
                    value={formik.values.client}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.client && Boolean(formik.errors.client)
                    }
                    helperText={formik.touched.client && formik.errors.client}
                />
                <FormTextField
                    fullWidth
                    id="city"
                    name="city"
                    label="Ville"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                />
                <FormTextField
                    id="address"
                    name="address"
                    label="Adresse"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={formik.touched.address && formik.errors.address}
                />
                <FormTextField
                    id="postal_code"
                    name="postal_code"
                    label="Code postal"
                    value={formik.values.postal_code}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.postal_code &&
                        Boolean(formik.errors.postal_code)
                    }
                    helperText={
                        formik.touched.postal_code && formik.errors.postal_code
                    }
                    inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 5,
                    }}
                />
                <FormTextField
                    id="started"
                    name="started"
                    label="Date de début"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formik.values.started || ""}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.started && Boolean(formik.errors.started)
                    }
                    helperText={formik.touched.started && formik.errors.started}
                />
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">Statut</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status"
                        name="status"
                        label="Statut"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.status &&
                            Boolean(formik.errors.status)
                        }
                        margin="dense"
                    >
                        {worksiteOptions.status_options.map((option) => (
                            <MenuItem key={option[0]} value={option[0]}>
                                {option[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormBox
                    display="flex"
                    justifyContent="center"
                    marginTop="1rem"
                >
                    <SubmitButton
                        color="primary"
                        onClick={() => {
                            console.log(formik);
                        }}
                    >
                        Enregistrer
                    </SubmitButton>
                </FormBox>
            </form>
        </FormBox>
    );
}

export default CreateWorksiteForm;
