import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

//REDUX
import { useDispatch } from 'react-redux';
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from '../actions/productoActions';

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;

  const dispatch = useDispatch();
  const history = useNavigate();

  //Confirmar si desea eliminar
  const confirmarEliminarProducto = (id) => {
    //Preguntar al usuario
    Swal.fire({
      title: '¿Seguro quieres eliminar este Producto?',
      text: 'Un producto eliminado no se puede recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //pasar al action
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //funcion que redirige de manera programada
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
