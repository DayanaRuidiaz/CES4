import React, { useContext } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import { Context } from "../app";
import toast from "react-hot-toast";

export const ModalDelete = ({ open, onClose, id }) => {
    const { deleteMovimiento } = useContext(Context);

    const onSubmit = (id) => {
        deleteMovimiento(id);

        toast.success("Movimiento eliminado exitosamente");

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>¿Desea eliminar esté movimiento?</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onSubmit(id)} color="error">
                    eliminar
                </Button>

                <Button onClick={() => onClose()} color="inherit">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
