import React, { useContext } from "react";
import ListMov from "./ListMov";
import NumberFormat from "react-number-format";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
    Paper,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Box,
    Button,
} from "@mui/material";

import { Context } from "../app";
import toast from "react-hot-toast";

//recarga =(ListMov)

const Register = () => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const { objSaldo, handlerChangeMovimiento } = useContext(Context);

    const onSubmit = (data) => {
        const { strMovimiento, strCantidad } = data;
        let bitError = false;

        if (strMovimiento === "gasto") {
            const cantidad = Number(strCantidad);
            const saldoFinalTotal = Number(objSaldo.saldoFinalTotal);

            if (saldoFinalTotal - cantidad < 0) {
                toast.error(
                    "Ups ¡Ha Ocurrido Un Error!: No tienes suficiente saldo para realizar este movimiento"
                );

                bitError = true;
            } else {
                handlerChangeMovimiento({
                    value: {
                        ...data,
                        id: uuidv4(),
                    },
                });

                toast.success("Gasto guardado exitosamente");
            }
        }

        if (strMovimiento === "ingreso") {
            const saldoInicialTotal = Number(objSaldo.saldoInicialTotal);

            if (!saldoInicialTotal) {
                toast.error("Por favor ingresa el saldo inicial");

                bitError = true;

                return;
            }

            handlerChangeMovimiento({
                value: {
                    ...data,
                    id: uuidv4(),
                },
            });

            toast.success("Ingreso registrado exitosamente");
        }

        if (!bitError) {
            reset();
        }
    };

    return (
        <Paper
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ padding: "15px" }}
        >
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        <b>Registro</b>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="strMovimiento"
                        defaultValue=""
                        render={({ field: { name, onChange, value } }) => (
                            <TextField
                                label="Tipo de movimiento"
                                name={name}
                                onChange={(e) => onChange(e)}
                                value={value}
                                helperText={
                                    errors?.strMovimiento?.message ||
                                    "Selecciona el tipo de movimiento"
                                }
                                error={errors?.strMovimiento ? true : false}
                                select
                                variant="standard"
                                fullWidth
                            >
                                <MenuItem value="ingreso">Ingreso</MenuItem>
                                <MenuItem value="gasto">Gasto</MenuItem>
                            </TextField>
                        )}
                        control={control}
                        rules={{
                            required:
                                "Selecciona el tipo de movimiento",
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="strNombre"
                        defaultValue=""
                        render={({ field: { name, onChange, value } }) => (
                            <TextField
                                label="Nombre"
                                name={name}
                                onChange={(e) => onChange(e)}
                                value={value}
                                helperText={
                                    errors?.strNombre?.message ||
                                    "Ingrese el nombre del movimiento"
                                }
                                error={errors?.strNombre ? true : false}
                                variant="standard"
                                fullWidth
                            />
                        )}
                        control={control}
                        rules={{
                            required:
                                "Ingrese el nombre del movimiento",
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="strCantidad"
                        defaultValue=""
                        render={({ field: { name, onChange, value } }) => (
                            <NumberFormat
                                prefix="$"
                                thousandSeparator
                                customInput={TextField}
                                label="Cantidad"
                                name={name}
                                onValueChange={({ value }) => onChange(value)}
                                value={value}
                                helperText={
                                    errors?.strCantidad?.message ||
                                    "Ingrese la cantidad"
                                }
                                error={errors?.strCantidad ? true : false}
                                variant="standard"
                                fullWidth
                            />
                        )}
                         
                        control={control}
                        rules={{
                            required:
                                "Ingrese la cantidad del movimiento",
                            validate: (value) => {
                                const strCantidad = Number(value);

                                if (strCantidad < 1) {
                                    return "La cantidad debe ser mayor a $0";
                                }
                            }
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                        <Button onClick={ListMov}
                            type="submit"
                            color="success"
                            variant="contained"
                            size="small"
                        >
                            Agregar movimiento
                        </Button>

                        
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Register;
