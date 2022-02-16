import React, { useContext, useEffect } from "react";

import NumberFormat from "react-number-format";

import { useForm, Controller } from "react-hook-form";

import { Context } from "../app";

import toast from "react-hot-toast";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

export const ModalEdit = ({ open, onClose, values }) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const { objSaldo, handlerChangeMovimiento } = useContext(Context);

    const onSubmit = (data) => {
        const { strMovimiento, strCantidad } = data;

        if (strMovimiento === "gasto") {
            const cantidad = Number(strCantidad);
            const saldoFinalTotal = Number(objSaldo.saldoFinalTotal);

            if (saldoFinalTotal - cantidad < 0) {
                toast.error(
                    "Saldo insuficiente para generar este movimiento"
                );
            } else {
                handlerChangeMovimiento({
                    value: { ...data },
                    id: values.id,
                });

                toast.success("Gasto actualizado exitosamente");
            }
        }

        if (strMovimiento === "ingreso") {
            handlerChangeMovimiento({
                value: { ...data },
                id: values.id,
            });

            toast.success("Ingreso actualizado exitosamente");
        }

        onClose();
    };

    useEffect(() => {
        if (values) {
            reset(values);
        }
    }, [values, reset]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <DialogTitle>Editar movimiento</DialogTitle>

            <DialogContent>
                <Grid container direction="row" spacing={3}>
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
                                    onValueChange={({ value }) =>
                                        onChange(value)
                                    }
                                    value={value}
                                    helperText={
                                        errors?.strCantidad?.message ||
                                        "Ingrese el nombre del movimiento"
                                    }
                                    error={errors?.strCantidad ? true : false}
                                    variant="standard"
                                    fullWidth
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Ingrese el nombre del movimiento",
                                validate: (value) => {
                                    const strCantidad = Number(value);

                                    if (strCantidad < 1) {
                                        return "La cantidad debe ser mayor a $0";
                                    }
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button type="submit" color="success">
                    actualizar
                </Button>

                <Button type="button" onClick={() => onClose()} color="inherit">
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
