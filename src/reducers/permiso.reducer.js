import {INIT_PERMISO,ADD_PERMISO,ADD_PERMISOS,CLEAR_PERMISOS} from "../constant/actionTypes";

const initial_state = [];

export default (state = initial_state, action) => {
    const {payload,type} = action;
    switch (type) {
        case INIT_PERMISO:
            if(Array.isArray(payload))
                return [...state,...payload];
            break;
        case ADD_PERMISO:
            return [...state,payload];
        case ADD_PERMISO:
            if(Array.isArray(payload))
                return [...state,...payload];
            break;
        case CLEAR_PERMISOS:
        default: return [];
    }
}
