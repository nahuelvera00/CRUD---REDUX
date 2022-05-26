import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertaReducers from './alertaReducers';

export default combineReducers({
  productos: productosReducer,
  alerta: alertaReducers,
});
