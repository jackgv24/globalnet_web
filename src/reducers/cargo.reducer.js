import {
    CARGO_CHANGE_NAME,
    CARGOS_CARGO_PARENT,
    CARGOS_ADD_FUNCIONES,
    CARGOS_DEL_FUNCIONES,
    CARGOS_PERMISOS,
} from '../constant/actionTypes';

const init = {
    name: '',
    functions: [],
    parent: {},
    permisos: [],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
};
export default (state = init, action) => {
    const { payload, type } = action;
    const functions = state.functions;
    switch (type) {
        case CARGOS_ADD_FUNCIONES:
            functions.push(payload);
            return {...state,functions}
        case CARGOS_DEL_FUNCIONES:
            functions.splice(payload,1);
            return {...state,functions};
        case CARGOS_PERMISOS:
            if(Array.isArray(payload))
                return {...state,permisos:payload};
            return state;
        default:
            return state;
    }
};
