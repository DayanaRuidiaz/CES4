import { createContext, useState } from "react";

import { toast } from "react-hot-toast";

import { Container } from "@mui/material";

import Header from "./components/Header";

export const Context = createContext();

export const App = ({ children }) => {
    const [objSaldo, setObjSaldo] = useState({
        saldoInicialTotal: null,
        saldoFinalTotal: null,
    });

    const [objMovimientos, setObjMovimientos] = useState([]);
    const [flagChange, setFlagChange] = useState(false);

    const handlerChangeMovimiento = ({ value, id }) => {
        const arrAux = objMovimientos;
        const { strMovimiento, strCantidad } = value;
        let saldoFinalTotal = objSaldo.saldoFinalTotal;

        if (id) {
            const prevState = arrAux.filter((e) => e.id === id);

            let difCantidad =
                Number(prevState[0].strCantidad) - Number(strCantidad);

            if (difCantidad < Number(prevState[0].strCantidad)) {
                saldoFinalTotal = (
                    Number(saldoFinalTotal) - difCantidad
                ).toString();
            }

            if (difCantidad > Number(prevState[0].strCantidad)) {
                saldoFinalTotal = (
                    Number(saldoFinalTotal) + difCantidad
                ).toString();
            }

            arrAux[prevState.findIndex((e) => e.id === id)] = value;
        } else {
            arrAux.push(value);

            if (strMovimiento === "gasto") {
                saldoFinalTotal = (
                    Number(saldoFinalTotal) - Number(strCantidad)
                ).toString();
            }

            if (strMovimiento === "ingreso") {
                saldoFinalTotal = (
                    Number(saldoFinalTotal) + Number(strCantidad)
                ).toString();
            }
        }

        setObjMovimientos(arrAux);
        setFlagChange(!flagChange);

        setObjSaldo((prevState) => ({
            ...prevState,
            saldoFinalTotal,
        }));
    };

    const deleteMovimiento = (id) => {
        const arrAux = objMovimientos;

        const prevState = arrAux.filter((e) => e.id === id);

        const { strMovimiento, strCantidad } = prevState[0];

        let saldoFinalTotal = objSaldo.saldoFinalTotal;

        arrAux.splice(
            arrAux.findIndex((e) => e.id === id),
            1
        );

        if (strMovimiento === "gasto") {
            saldoFinalTotal = (
                Number(saldoFinalTotal) + Number(strCantidad)
            ).toString();
        }

        if (strMovimiento === "ingreso") {
            saldoFinalTotal = (
                Number(saldoFinalTotal) - Number(strCantidad)
            ).toString();
        }

        setObjMovimientos(arrAux);
        setFlagChange(!flagChange);

        setObjSaldo((prevState) => ({
            ...prevState,
            saldoFinalTotal,
        }));
    };

    const handlerChangeSaldoInicial = (value) => {
        if (value < 1) {
            toast.error("El valor minimo debe ser $ 1");
        }

        setObjSaldo((prevState) => ({
            saldoFinalTotal:
                objMovimientos.length === 0 ? value : prevState.saldoFinalTotal,
            saldoInicialTotal: value,
        }));
    };

    return (
        <Context.Provider
            value={{
                objSaldo,
                handlerChangeSaldoInicial,
                objMovimientos,
                flagChange,
                handlerChangeMovimiento,
                deleteMovimiento,
            }}
        >
            <Container>
                <Header
                    values={objSaldo}
                    onChange={handlerChangeSaldoInicial}
                />
                {children}
            </Container>
        </Context.Provider>
    );
};
