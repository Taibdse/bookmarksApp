import swal from 'sweetalert';

export const showSuccessMessage = ({ title = '', text = '', timer = 4000 }) => swal({
    title,
    text,
    timer,
    icon: 'success',
    button: 'Close'
})


export const showErrorMessage = ({ title = '', text = '', timer = 4000 }) => swal({
    title,
    text,
    timer,
    icon: 'error',
    button: 'Close'
})


export const showConfirmMessage = ({ title = '', text = '' }) => {
    return swal({
        title,
        text,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    })
}