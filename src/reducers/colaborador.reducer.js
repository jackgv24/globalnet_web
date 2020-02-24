import { 
    COLABORADOR_NAME,
    COLABORADOR_EMAIL,
    COLABORADOR_CEDULA,
    COLABORADOR_DIRECCION,
    COLABORADOR_CARGO,
    COLABORADOR_PERMISOS,
    COLABORADOR_INIT,
    COLABORADOR_STATUS
 } from '../constant/actionTypes';
const init = {
    name:'',
    email:'',
    cedula:'',
    direccion:'',
    cargo:{},
    permisos:[],
    active:true,
    createdAt:new Date(),
    updatedAt:new Date()
};

const reducer = (state=init,action) => {
    const {payload,type} = action;
    switch (type) {
        case COLABORADOR_NAME:
            return {...state,name:payload};
        case COLABORADOR_CEDULA:
            return {...state,cedula:payload};
        case COLABORADOR_EMAIL:
            return {...state,email:payload};
        case COLABORADOR_DIRECCION:
            return {...state,direccion:payload};
        case COLABORADOR_CARGO:
            let _cargo = payload || {},
                { permisos:[] } = _cargo;
                //TODO: Terminar esto
            return {...state,cargo:payload};
        case COLABORADOR_PERMISOS:
            if(Array.isArray(payload)) {
                let permisos = payload.map(x=>({...x,source:'interface'}))
                return {...state,permisos:permisos};
            }
            return state;
        default:
            return state;
    }
}