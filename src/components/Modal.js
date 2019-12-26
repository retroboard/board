import Swal from 'sweetalert2';

const ModalConfirmation = async (message, title, onConfirm, ) => {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
  if (result.value && onConfirm) {
    onConfirm();
  }
};

export { ModalConfirmation };