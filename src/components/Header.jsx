import React from "react";

import NumberFormat from "react-number-format";

import { Typography, Box, Divider, Input } from "@mui/material";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Header = ({ values, onChange }) => {
    return (
        <div style={{ marginBottom: "50px" }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <MonetizationOnIcon fontSize="large" color="success"/>
                        <Typography variant="h5">
                            Ingresos y Gastos
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ marginRight: "25px" }}>
                    Saldo inicial:{" "}
                    <NumberFormat
                        prefix="$"
                        thousandSeparator
                        customInput={Input}
                        name="saldoInicialTotal"
                        style={{
                            color:
                                values.saldoInicialTotal <= 0 ? "green" : "black",
                            maxWidth: "120px",
                        }}
                        onValueChange={({ value }) => onChange(value)}
                        value={values.saldoInicialTotal || ""}
                    />
                </Box>

                <Box>
                    Saldo final:{" "}
                    <NumberFormat
                        prefix="$"
                        thousandSeparator
                        customInput={Input}
                        disabled
                        style={{
                            color:
                                values.saldoFinalTotal <= 0
                                    ? "red !important"
                                    : "green !important",
                            maxWidth: "100px",
                        }}
                        value={values.saldoFinalTotal}
                    />
                </Box>
            </Box>

            <Divider />
        </div>
    );
};

export default Header;
