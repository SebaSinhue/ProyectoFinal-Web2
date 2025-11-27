document.addEventListener('DOMContentLoaded', () => {
  const filas = document.querySelectorAll('table.tabla tbody tr');

  filas.forEach((fila) => {
    const btnEditar = fila.querySelector('.btn-editar');
    const btnCancelar = fila.querySelector('.btn-cancelar');
    const formEdicion = fila.querySelector('.form-edicion');
    const accionesLectura = fila.querySelector('.acciones-lectura');
    const textosLectura = fila.querySelectorAll('.texto-lectura');
    const camposEdicion = fila.querySelectorAll('.campo-edicion');

    if (btnEditar) {
        btnEditar.addEventListener('click', () => {

        textosLectura.forEach((el) => el.classList.add('oculto'));
        camposEdicion.forEach((el) => el.classList.remove('oculto'));

        if (formEdicion) formEdicion.classList.remove('oculto');
        if (accionesLectura) accionesLectura.classList.add('oculto');
      });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
        textosLectura.forEach((el) => el.classList.remove('oculto'));
        camposEdicion.forEach((el) => el.classList.add('oculto'));

        if (formEdicion) formEdicion.classList.add('oculto');
        if (accionesLectura) accionesLectura.classList.remove('oculto');
      });
    }
  });
});