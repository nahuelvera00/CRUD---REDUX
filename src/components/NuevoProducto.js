import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//importar actions de REDUX
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaAction';

const NuevoProducto = ({ history }) => {
  //Navigate para redireccionar
  const navigate = useNavigate();
  //State del Componente
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);

  //Utilizar useDispatch
  const dispatch = useDispatch();

  //Accesder al State del Store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  //Manda a llamr el Action
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  //Cuando el usuario haga submit
  const submitNuevoProducto = (e) => {
    e.preventDefault();

    //validar formulario
    if (nombre.trim() === '' || precio <= 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      };
      dispatch(mostrarAlerta(alerta));

      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());

    //Crear nuevo producto
    agregarProducto({
      nombre,
      precio,
    });
    //Redireccionar
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  placeholder="Nombre del Producto"
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  placeholder="Precio del Producto"
                  type="number"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un Error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
