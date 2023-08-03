import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  sector: Yup.string().required('Le secteur est requis'),
  client: Yup.string().required('Le client est requis'),
  city: Yup.string().required('La ville est requise'),
  address: Yup.string().required("L'adresse est requise"),
  started: Yup.date().nullable().required('La date de début est requise'),
  status: Yup.string().required('Le statut est requis'),
});

const FormComponent = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      sector: '',
      client: '',
      city: '',
      address: '',
      started: null,
      status: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={formik.handleSubmit} style={{ width: '80%' }}>
        <Typography component="h1" variant="h5" margin='normal' textAlign='center'>
          Nouveau Chantier
        </Typography>
        <TextField
          fullWidth
          margin='normal'
          id="name"
          name="name"
          label="Nom"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          margin='normal'
          id="sector"
          name="sector"
          label="Secteur"
          value={formik.values.sector}
          onChange={formik.handleChange}
          error={formik.touched.sector && Boolean(formik.errors.sector)}
          helperText={formik.touched.sector && formik.errors.sector}
        />
        <TextField
          fullWidth
          margin='normal'
          id="client"
          name="client"
          label="Client"
          value={formik.values.client}
          onChange={formik.handleChange}
          error={formik.touched.client && Boolean(formik.errors.client)}
          helperText={formik.touched.client && formik.errors.client}
        />
        <TextField
          fullWidth
          margin='normal'
          id="city"
          name="city"
          label="Ville"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <TextField
          fullWidth
          margin='normal'
          id="address"
          name="address"
          label="Adresse"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          margin='normal'
          id="started"
          name="started"
          label="Date de début"
          type="date"
          value={formik.values.started}
          onChange={formik.handleChange}
          error={formik.touched.started && Boolean(formik.errors.started)}
          helperText={formik.touched.started && formik.errors.started}
        />
        <TextField
          fullWidth
          margin='normal'
          id="status"
          name="status"
          label="Statut"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
        />
        <Box display="flex" justifyContent="center" marginTop="1rem">
          <Button type="submit" variant="contained" color="primary">
            Enregistrer
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
