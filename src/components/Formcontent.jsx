import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Typography,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import {
  Itinerary,
  ItinerarySegment,
  ItinerarySegmentStop,
} from "@kiwicom/orbit-components";
import { LoadingButton } from "@mui/lab";

const Input = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

var travelPreferences = [
  "retail",
  "hotel",
  "leisure",
  "park",
  "restaurant",
  "hindu temple",
  "education",
  "healthcare clinic",
  "banking and finance",
  "car parts and accessories",
  "catering",
  "lodging",
  "spiritual center",
  "bakery",
  "community and government",
  "resort",
];

const FormCard = () => {
  travelPreferences.sort();
  travelPreferences = travelPreferences.filter(
    (item, index) => travelPreferences.indexOf(item) === index
  );
  const [options, setOptions] = useState({
    region: "",
    travelPreferences: ["bakery"],
    startDate: "",
    endDate: "",
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dayWiseData, setDayWiseData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); 

  const handleSubmit = async () => {
    setLoading(true);
    axios
      .post("https://rakshitkaushik.pythonanywhere.com/predict/", {
        options: options,
      })
      .then((response) => {
        const responseData = response.data.places_matrix;
        console.log(response.data);
        //                 setData(responseData);
        const dayWiseData = groupByDay(responseData);
        setDayWiseData(dayWiseData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };


  const groupByDay = (responseData) => {
    const dayWiseData = {};
    responseData.forEach((locations, day) => {
      dayWiseData[day + 1] = locations.map((location) => ({
        Name: location.Name,
        Address: location.Address,
      }));
    });
    return dayWiseData;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
     if (name === "startDate") {
      if (value > options.endDate) {
        setOptions({
          ...options,
          startDate: value,
          endDate: value,
        });
        setErrorMessage("End date cannot be earlier than the start date.");
      } else {
        setOptions({
          ...options,
          [name]: value,
        });
        setErrorMessage("");
      }
    } else if (name === "endDate") {
      if (value < options.startDate) {
        setOptions({
          ...options,
          startDate: value,
          endDate: value,
        });
        setErrorMessage("End date cannot be earlier than the start date.");
      } else {
        setOptions({
          ...options,
          [name]: value,
        });
        setErrorMessage("");
      }
    } else {
      setOptions({
        ...options,
        [name]: value,
      });
      setErrorMessage("");
    }
  };

  const handleTravelPreferencesChange = (event, values) => {
    setOptions({
      ...options,
      travelPreferences: values,
    });
  };

  
  return (
    <>
      {errorMessage && (
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
      {Object.keys(dayWiseData).length > 0 ? (
        <Box>
          {Object.entries(dayWiseData).map(([day, locations]) => (
            <div key={day}>
              <Typography variant="h5" component="h2">
                Day {day}
              </Typography>
              <Itinerary>
                {locations.map((location, index) => (
                  <ItinerarySegment
                    key={index}
                    label={location.Name}
                    noElevation={false}
                  >
                    <ItinerarySegmentStop
                      city={location.Name}
                      station={location.Address}
                      minWidth={60}
                    />
                  </ItinerarySegment>
                ))}
              </Itinerary>
            </div>
          ))}
          <Button style={{ padding: 5 }} onClick={() => setDayWiseData([])}>
            Reset
          </Button>
        </Box>
      ) : (
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 10,
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Region"
                      variant="outlined"
                      name="region"
                      value={options.region}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      filterSelectedOptions
                      options={travelPreferences}
                      getOptionLabel={(option) => option}
                      defaultValue={[travelPreferences[0]]}
                      name="travelPreferences"
                      value={options.travelPreferences.map((preference) =>
                        travelPreferences.find(
                          (option) => option === preference
                        )
                      )}
                      freeSolo
                      onChange={handleTravelPreferencesChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Preferences"
                          placeholder="Favorites"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      name="startDate"
                      value={options.startDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Date"
                      variant="outlined"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      name="endDate"
                      value={options.endDate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={loading}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FormCard;
