import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import { default as cargos } from "./cargo.reducer";
import { default as permisos } from "./permiso.reducer";

const reducers = combineReducers({
    Customizer,
    cargos,
    permisos
});

export default reducers;