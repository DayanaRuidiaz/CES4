import React, { Fragment, useState } from "react";

import { Box, Paper, IconButton, Input } from "@mui/material";

import NumberFormat from "react-number-format";

import ClearIcon from '@mui/icons-material/Clear';

import EditIcon from "@mui/icons-material/Edit";
import { ModalEdit } from "./modalEdit";
import { ModalDelete } from "./modalDelete";

const Mov = ({ values }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handlerChangeOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerChangeOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    return (
        <Fragment>
            <ModalEdit
                open={openModalEdit}
                onClose={handlerChangeOpenModalEdit}
                values={values}
            />

            <ModalDelete
                open={openModalDelete}
                onClose={handlerChangeOpenModalDelete}
                id={values.id}
            />

            <Paper sx={{ padding: "10px" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            sx={{ color: "gray" }}
                            onClick={() => handlerChangeOpenModalDelete()}
                        >
                            <ClearIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: "gray" }}
                            onClick={() => handlerChangeOpenModalEdit()}
                        >
                            <EditIcon />
                        </IconButton>

                        <p
                            style={{
                                fontSize: "18px",
                            }}
                        >
                            {values.strNombre}
                        </p>
                    </Box>

                    <Box>
                        <p>
                            <span
                                style={{
                                    color: "black",
                                    fontWeight: "bold",
                                    backgroundColor:
                                        values.strMovimiento === "gasto"
                                            ? "crimson"
                                            : "green",
                                    borderRadius: "10%",
                                    padding: "5px 8px 5px",
                                    fontSize: "10px",
                                    fontColor: "Black",
                                }}
                            >
                                {
                                    <NumberFormat
                                        prefix="$"
                                        value={values.strCantidad}
                                        disabled
                                        thousandSeparator
                                        customInput={Input}
                                        style={{
                                            WebkitTextFillColor:
                                                "black !important",
                                            color: "white !important",
                                            maxWidth: "100px",
                                        }}
                                    />
                                }
                            </span>
                        </p>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    );
};

export default Mov;
