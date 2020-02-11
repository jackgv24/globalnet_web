import {INIT_CARGO,ADD_CARGO,ADD_CARGOS,CLEAR_CARGO} from "../constant/actionTypes";

const initial_state = [];

export default (state = initial_state, action) => {
    const {payload,type} = action;
    switch (type) {
        case INIT_CARGO:
            if(Array.isArray(payload))
                return [...state,...payload];
            break;
        case ADD_CARGO:
            return [...state,payload];
        case ADD_CARGOS:
            if(Array.isArray(payload))
                return [...state,...payload];
            break;
        case CLEAR_CARGO:
        default: return [];
    }
}
