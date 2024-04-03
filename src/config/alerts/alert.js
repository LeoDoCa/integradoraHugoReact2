import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/*
    Todos los titulos error, success, confirmar
    Todos los mensaje error, success, confirmar
*/ 

const SweetAlert  = withReactContent(Swal);


export const customAlert = (title, text, icon) => {
    return SweetAlert.fire({
        title,
        text,
        icon, 
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
    });
}

export const confirmAlert = (preConfirm) => SweetAlert.fire({
    title:"¿Estás seguro de realizar la acción?",
    text: "Le solicitamos esperar a que termine la acción",
    icon: "info",
    confirmButtonColor: "#0E7490",
    confirmButtonText:"Aceptar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    backdrop: true,
    showCancelButton: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !SweetAlert.isLoading(),
    preConfirm
});

export const autoCloseAlert = () => {
    SweetAlert.fire({
        text: "Se ha copiado el link en el portapapeles",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false 
    });
};

export const autoCloseAlert2 = () => {
    SweetAlert.fire({
        text: "Archivo eliminado con éxito",
        icon: "success",
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
        heightAuto: false,
        customClass: {
            popup: 'my-popup-class',
        },
        didOpen: () => {
            const popup = document.querySelector('.swal2-popup');
            if (popup) {
                popup.style.height = '250px';
            }
        }
    });
};