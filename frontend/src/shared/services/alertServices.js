// src/shared/services/alertService.js

import Swal from "sweetalert2";

export function showSuccessAlert({
    title = "Éxito",
    text = "",
    confirmButtonText = "Aceptar",
    timer = 1000,
}) {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonText,
        timer,
        timerProgressBar: true,

        customClass: {
            popup: "rounded-2x1",
            title: "!text-green-600",
            confirmButton: "bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg",
            timerProgressBar: "!bg-green-600"
        },

        buttonsStyling: false,
    });
}

export function showCancelAlert({
    title = "Cancelar",
    text = "",
    confirmButtonText = "Cancelar",
    timer = 1000,
}) {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonText,
        timer,
        timerProgressBar: true,

        customClass: {
            //El signo de exclamasion ! lo que va a hacer es que va a forzar a cambiar el estilo y niega los estilos bases
            popup: "rounded-2x1",
            title: "!text-red-600",
            confirmButton: "bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white",
            timerProgressBar: "!bg-red-600"
        },

        buttonsStyling: false,
  });
}