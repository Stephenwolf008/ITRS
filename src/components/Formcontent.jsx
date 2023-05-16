import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Typography,
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
  "beach",
  "zoo",
  "museum",
  "lounge",
  "park",
  "gastropub",
  "other great outdoors",
  "science museum",
  "bed and breakfast",
  "hotel",
  "landmarks and outdoors",
  "lodging",
  "resort",
  "breakfast spot",
  "café",
  "diner",
  "bakery",
  "buffet",
  "garden",
  "fried chicken joint",
  "movie theater",
  "ice cream parlor",
  "rest area",
  "coffee shop",
  "indie movie theater",
  "arts and entertainment",
  "stadium",
  "monument",
  "bar",
  "historic and protected site",
  "juice bar",
  "dessert shop",
  "tea room",
  "snack place",
  "street food gathering",
  "smoothie shop",
  "burger joint",
  "motel",
  "farm",
  "pizzeria",
  "casino",
  "indian sweet shop",
  "food court",
  "scenic lookout",
  "bridge",
  "lodge",
  "surf spot",
  "wings joint",
  "airport food court",
  "harbor / marina",
  "mountain",
  "cafes",
  "coffee",
  "tea houses",
  "wine bar",
  "candy store",
  "food truck",
  "waterfront",
  "lake",
  "drive-in theater",
  "river",
  "art gallery",
  "brewery",
  "bbq joint",
  "bathing area",
  "dhaba",
  "campground",
  "history museum",
  "castle",
  "dining and drinking",
  "reservoir",
  "building / structure",
  "fish and chips shop",
  "food stand",
  "bubble tea shop",
  "chaat place",
  "hotel bar",
  "pub",
  "national park",
  "forest",
  "night club",
  "nature preserve",
  "amusement park",
  "water park",
  "playground",
  "hot spring",
  "platform",
  "music venue",
  "psychics and astrologers",
  "concert hall",
  "event",
  "arcade",
  "hot dog joint",
  "fountain",
  "sculpture garden",
  "dive bar",
  "steakhouse",
  "heliport",
  "cocktail bar",
  "speakeasy",
  "bistro",
  "airport lounge",
  "gaming cafe",
  "public art",
  "night market",
  "beach bar",
  "planetarium",
  "cafeteria",
  "hiking trail",
  "roof deck",
  "pier",
  "art museum",
  "port",
  "spa",
  "performing arts venue",
  "hot air balloon tour agency",
  "beer garden",
  "lighthouse",
  "tram station",
  "pool hall",
  "aquarium",
  "cottage / cabin",
  "rock climbing spot",
  "travel lounge",
  "vineyard",
  "winery",
  "bowling alley",
  "state / provincial park",
  "whisky bar",
  "waterfall",
  "cupcake shop",
  "sports bar",
  "donut shop",
  "frozen yogurt shop",
  "cave",
  "rock club",
  "dive spot",
  "botanical garden",
  "theater",
  "palace",
  "indie theater",
  "deli",
  "cruise",
  "fair",
  "hookah bar",
  "border crossing",
  "irani cafe",
  "pedestrian plaza",
  "beer bar",
  "baggage claim",
  "memorial site",
  "apres ski bar",
  "windmill",
  "strip club",
  "exhibit",
  "attraction",
  "viewpoint",
  "water",
  "fee",
  "peak",
  "restaurant",
  "protected_area",
  "memorial",
  "cafe",
  "artwork",
  "theatre",
  "cinema",
  "water_park",
  "place_of_worship",
  "fast_food",
  "fort",
  "limited",
  "ice_cream",
  "indian",
  "boundary_stone",
  "boat",
  "for_customers",
  "regional",
  "internet_access",
  "supermarket",
  "cliff",
  "italian",
  "food_court",
  "coffee_shop",
  "pizza",
  "sandwich",
  "barbecue",
  "arts_centre",
  "chinese",
  "books",
  "kebab",
  "archaeological_site",
  "locomotive",
  "burger",
  "sights",
  "tomb",
  "ruines",
  "temple",
  "city_gate",
  "mosque",
  "biergarten",
  "theme_park",
  "chicken",
  "gallery",
  "sport",
  "georgian",
  "seafood",
  "tea",
  "halal",
  "tower",
  "village",
  "international",
  "convenience",
  "shrine",
  "noodle",
  "french",
  "picnic_site",
  "church",
  "asian",
  "wayside_cross",
  "bus",
  "arab",
  "company",
  "thai",
  "cake",
  "drinks",
  "public_bath",
  "persian",
  "coffee_and_tea",
  "rock",
  "vegan",
  "beach_resort",
  "cave_entrance",
  "aircraft",
  "vietnamese",
  "organic",
  "coworking",
  "battlefield",
  "amusement_arcade",
  "swimming_pool",
  "indonesian",
  "american",
  "german",
  "mediterranean",
  "european",
  "hinduism",
  "clock",
  "tank",
  "sand",
  "cuban",
  "egg_free, gluten_free,kosher,soy_free, sugar_free",
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

  const handleSubmit = async () => {
    setLoading(true);
    axios
      .post("https://rakshitkaushik.pythonanywhere.com/predict/", {
        options: options,
      })
      .then((response) => {
        const responseData = response.data.recommended;
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(options);
  console.log(data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOptions({
      ...options,
      [name]: value,
    });
  };

  const handleTravelPreferencesChange = (event, values) => {
    setOptions({
      ...options,
      travelPreferences: values,
    });
  };

  return (
    <>
      {data ? (
        <>
          {/* {data.map((item, index) => (
            <Card
              sx={{
                minWidth: 275,
                margin: "10px",
                padding: "10px",
                backgroundColor: "cyan",
              }}
              key={index}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 20, fontWeight: "bold" }}
                  color="textPrimary"
                >
                  {item.Name}
                </Typography>
                <Typography sx={{ marginBottom: 5 }} color="textSecondary">
                  {item.Address}
                </Typography>
                <Typography variant="body2" component="p">
                  Rating: {item.Rating}
                </Typography>
              </CardContent>
            </Card>
          ))} */}

          <Itinerary>
            {data.map((location, index) => (
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
            <Button onClick={()=>setData(null)}>Back to Form</Button>
          </Itinerary>
        </>
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
