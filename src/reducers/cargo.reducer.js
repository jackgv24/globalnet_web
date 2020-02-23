import {
    CARGOS_CARGO_PARENT,
    CARGOS_ADD_FUNCIONES,
    CARGOS_DEL_FUNCIONES,
    CARGOS_PERMISOS,
    CARGOS_INIT,
    CARGO_CHANGE_NAME,
    CARGOS_STATUS
} from '../constant/actionTypes';

const init = {
    id:'',
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
    switch (type) {
        case CARGOS_STATUS:
            return {...state,active:!!payload};
        case CARGO_CHANGE_NAME:
            return {
                ...state,
                name:payload
            }
        case CARGOS_INIT:
            let {name = '',functions=[],id=null,permisos=[],parent=null} = payload;
            const _createdAt = payload.createdAt.toDate();
            return {
                ...state,
                id,
                name,
                functions,
                parent,
                permisos,
                createdAt:_createdAt
            }
        case CARGOS_CARGO_PARENT:
            return {...state,parent:payload}
        case CARGOS_ADD_FUNCIONES:
            const add_functions = state.functions;
            add_functions.push(payload);
            return {...state,functions:add_functions}
        case CARGOS_DEL_FUNCIONES:
            const del_functions = state.functions;
            del_functions.splice(payload,1);
            return {...state,functions:del_functions};
        case CARGOS_PERMISOS:
            if(Array.isArray(payload))
                return {...state,permisos:payload};
            return state;
        default:
            return state;
    }
};
