import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import { default as Cargo } from "./cargo.reducer";
import { default as Permiso } from "./permiso.reducer";

const reducers = combineReducers({
    Customizer,
    Cargo,
    Permiso
});

export default reducers;