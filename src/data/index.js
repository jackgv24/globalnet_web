import { default as dbColaborador } from "./colaborador";
import { default as dbCargo } from "./cargos";
import { default as dbPermisos } from "./permisos";
import { db,session as auth } from "./base";

export {
    dbColaborador,
    dbCargo,
    dbPermisos,
    db,
    auth
}