import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
  });
  //Producto a editar
  const productoeditar = useSelector((state) => state.productos.productoeditar);

  useEffect(() => {
    guardarProducto(productoeditar);
  }, [productoeditar]);

  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const { nombre, precio } = producto;

  const submitEditarProducto = (e) => {
    e.preventDefault();
    dispatch(editarProductoAction(producto));
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  placeholder="Nombre del Producto"
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  placeholder="Precio del Producto"
                  type="number"
                  name="precio"
                  onChange={onChangeFormulario}
                  value={precio}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
