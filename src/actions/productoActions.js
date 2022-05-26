import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMNAR,
  PRODUCTO_ELIMNADO_EXITO,
  PRODUCTO_ELIMNADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //insertar en la API
      await clienteAxios.post('/productos', producto);

      //Si todo sale bien, actualizar el State
      dispatch(agregarProductoExito(producto));

      //ALerta
      Swal.fire('Correcto', 'El producto se agrego correctamente', 'success');
    } catch (error) {
      console.log(error);
      //Si hay un error cambiar el State
      dispatch(agregarProductoError(true));

      //Alerta de Error
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text: 'Hubo un error, intentalo mas tarde nuevamente',
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});
//si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

//Funcion que descarga los productos de Base de Datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get('/productos');
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProductosError());
    }
  };
}
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());

      //Si se elimina correctamente
      Swal.fire(
        'Borrado Correctamente!',
        'El producto fue eliminado Correctamente',
        'success'
      );
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMNAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMNADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMNADO_ERROR,
  payload: true,
});

//Colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//Edita un registro en la API y State
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
      dispatch(editarProductoError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true,
});
