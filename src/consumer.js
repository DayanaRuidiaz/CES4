import React from "react";

import { Grid } from "@mui/material";
import { App } from "./app";

import Register from "./components/Register";
import ListMov from "./components/ListMov";

const Consumer = () => {
    return (
        <App>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={4}>
                    <Register />
                </Grid>

                <Grid item xs={8}>
                    <ListMov />
                </Grid>
            </Grid>
        </App>
    );
};

export default Consumer;
