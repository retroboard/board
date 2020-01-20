import Swal from 'sweetalert2';

const InputModal = async (inputValue, title, onConfirm, ) => {
  const result = await Swal.fire({
    title,
    input: 'text',
    inputValue,
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK',
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!';
      }
    }
  });

  if (result.value && onConfirm) {
    onConfirm(result.value);
  }
};

export { InputModal };