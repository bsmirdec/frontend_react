import React from "react";
import {
    TextField,
    Grid,
    Container,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

const hours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
];

const DateTimePickerComponent = ({ selectedDateTime, setSelectedDateTime }) => {
    const handleDateTimeChange = (newDateTime) => {
        setSelectedDateTime(newDateTime);
    };

    const handleHourChange = (event) => {
        const selectedHour = event.target.value;
        const numericHour = parseInt(selectedHour, 10);
        const newDateTime = new Date(selectedDateTime);
        newDateTime.setHours(numericHour);
        setSelectedDateTime(newDateTime);
    };

    const dateObject = new Date(selectedDateTime);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Choisir une date"
                            type="date"
                            value={dateObject.toISOString().split("T")[0]}
                            onChange={(e) =>
                                handleDateTimeChange(
                                    new Date(
                                        e.target.value +
                                            "T" +
                                            dateObject
                                                .toISOString()
                                                .split("T")[1],
                                    ),
                                )
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{ minWidth: "200px" }}>
                            <InputLabel id="hours-label">
                                Choisir une heure
                            </InputLabel>
                            <Select
                                labelId="hours-label"
                                id="hours"
                                name="hours"
                                label="Choisir une heure"
                                value={dateObject.getHours().toString() + ":00"}
                                onChange={handleHourChange}
                                displayEmpty
                                inputProps={{ "aria-label": "Heure" }}
                            >
                                {hours.map((hour) => (
                                    <MenuItem key={hour} value={hour}>
                                        {hour}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DateTimePickerComponent;
