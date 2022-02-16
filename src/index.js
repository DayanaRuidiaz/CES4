import React from "react";
import ReactDOM from "react-dom";
import Consumer from "./consumer";

//Componentes de Material UI
import { Button } from "@mui/material";
import { StyledEngineProvider, createTheme } from "@mui/material/styles";
import { Toaster, ToastBar, toast } from "react-hot-toast";

import { ThemeProvider } from "@mui/styles";

const themeOptions = createTheme();

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeOptions}>
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                        fontSize: "0.875rem",
                        fontWeight: "400",
                        lineHeight: "1.43",
                    },
                    duration: 5000,
                    error: {
                        style: {
                            backgroundColor: "#D32F2F",
                            color: "white",
                        },
                    },
                }}
            >
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                {message}
                                {t.type !== "loading" && (
                                    <Button
                                        size="small"
                                        onClick={() => toast.dismiss(t.id)}
                                    >
                                        <b>
                                            <span
                                                style={{
                                                    color: t.style.color,
                                                }}
                                            >
                                                cerrar
                                            </span>
                                        </b>
                                    </Button>
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
            <Consumer />
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById("root")
);
