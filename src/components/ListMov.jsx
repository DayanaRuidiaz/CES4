import React, { useContext, useState, useEffect } from "react";

import {
    Grid,
    Paper,
    Typography,
    Box,
    TextField,
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { Context } from "../app";

import Mov from "./Mov";

const ListMov = () => {
    const { objMovimientos } = useContext(Context);

    const [search, setSearch] = useState("");

    const [strTipo, setStrTipo] = useState("todos");

    const [objFilterMovimientos, setObjMovimientosFilter] = useState([]);

    const handlerChangeSearch = (value) => {
        setSearch(value);
    };

    const filterTipoMovimientos = (value) => {
        setStrTipo(value);
    };

    useEffect(() => {
        let arrAux = objMovimientos.filter((data) =>
            data.strNombre.includes(search)
        );

        if (strTipo === "todos") {
            setObjMovimientosFilter(arrAux);
        } else {
            arrAux = arrAux.filter((data) => data.strMovimiento === strTipo);

            setObjMovimientosFilter(arrAux);
        }
    }, [objMovimientos, strTipo, search]);

    return (
        <Paper
            sx={{
                padding: "15px",
            }}
        >
            <Grid container direcion="row" spacing={3}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4">
                                <b>Listado de Movimientos</b>
                            </Typography>
                        </Box>

                        <Box>
                            <p>
                                <span
                                    style={{
                                        backgroundColor: "blue",
                                        color: "white",
                                        padding: "5px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {objFilterMovimientos.length}
                                </span>
                            </p>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={7}>
                    <TextField
                        label="Buscador"
                        variant="standard"
                        InputProps={{
                            startAdornment: <SearchIcon />,
                        }}
                        name="search"
                        value={search}
                        fullWidth
                        onChange={(e) => handlerChangeSearch(e.target.value)}
                    />
                </Grid>

                <Grid item xs={5}>
                    <FormControl>
                        <FormLabel>Tipo de movimiento</FormLabel>

                        <RadioGroup
                            row
                            name="tipo"
                            value={strTipo}
                            onChange={(e) =>
                                filterTipoMovimientos(e.target.value)
                            }
                        >
                            <FormControlLabel
                                label="Todos"
                                value="todos"
                                labelPlacement="end"
                                defaultChecked="true"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Ingreso"
                                value="ingreso"
                                labelPlacement="end"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                label="Gasto"
                                value="gasto"
                                labelPlacement="end"
                                control={<Radio />}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {objFilterMovimientos.map((e) => (
                    <Grid item xs={12} key={e.id}>
                        <Mov values={e} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default ListMov;
