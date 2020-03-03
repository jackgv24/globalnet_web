import { default as React, useState, useEffect, useReducer } from 'react';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';
import { default as Select } from 'react-select';
import { default as Breadcrumb } from '../../common/breadcrumb';
import { default as Loading } from '../../common/modal';
import { COLABORADOR_SHOW_ALL } from '../../../constant/url';
import { dbCargo, dbColaborador, dbPermisos } from '../../../data';
import { default as NestedList } from '../../common/nestedList';
import { auth } from '../../../data';
import user from '../../../assets/images/user/user.png';

//#region Redux
const init = {
    id: '',
    name: '',
    pictureUrl: null,
    email: '',
    cedula: '',
    pwd: '',
    direccion: '',
    cargo: {},
    permisos: [],
};
const reducer = (state, { type = null, payload = null }) => {
    switch (type) {
        case actions.clear:
            return init;
        case actions.pwd_change:
            return { ...state, pwd: payload };
        case actions.name_change:
            return { ...state, name: payload };
        case actions.email_change:
            return { ...state, email: payload };
        case actions.picture_change:
            return { ...state, pictureUrl: payload };
        case actions.cedula_change:
            return { ...state, cedula: payload };
        case actions.direccion_change:
            return { ...state, direccion: payload };
        case actions.cargos_change:
            let { permisos: _permisos = [] } = payload || {};
            let { permisos = [] } = state || {};
            if (!Array.isArray(_permisos)) return { ...state, cargo: payload };
            let newPermiso = [
                ...permisos
                    .reduce((acc, x) => {
                        if (x.type === 'link' && x.from === 'cargo') {
                            return acc;
                        } else if (x.type === 'sub' && Array.isArray(x.items)) {
                            x.items = x.items.filter(y => y.from === 'user' || !y.from);
                            if (x.items.length === 0) return acc;
                        }
                        return [...acc, x];
                    }, [])
                    .map(x => {
                        if (x.type === 'link') {
                            x.from = 'user';
                        } else if (x.type === 'sub' && Array.isArray(x.items)) {
                            x.items = x.items.map(x => {
                                x.from = 'user';
                                return x;
                            });
                        }
                        return x;
                    }),
                ..._permisos.map(x => {
                    if (x.type === 'link') {
                        x.from = 'cargo';
                    } else if (x.type === 'sub' && Array.isArray(x.items)) {
                        x.items = x.items.map(y => {
                            y.from = 'cargo';
                            return y;
                        });
                    }
                    return x;
                }),
            ].reduce((acc, value) => {
                const existIndex = acc.findIndex(x => x.id === value.id);
                let nested = null;
                if (existIndex === -1) {
                    console.log(value);
                    return [...acc, value];
                }

                nested = Object.assign({}, acc[existIndex]);

                if (value.type === 'sub' && nested.type === 'sub' && Array.isArray(value.items)) {
                    const anexo = value.items.reduce(
                        (itemAcc, itemVal) =>
                            nested.items.find(x => x.url === itemVal.url)
                                ? itemAcc
                                : [...itemAcc, itemVal],
                        [],
                    );
                    if (anexo.items > 0) anexo.estado = true;
                    acc[existIndex].items = [...nested.items, ...anexo];
                    return acc;
                }
            }, []);

            return { ...state, cargo: payload, permisos: newPermiso };
        case actions.permisos_change:
            return { ...state, permisos: payload };
        default:
            return state;
    }
};
const actions = {
    name_change: 'name_change',
    picture_change: 'picture_change',
    email_change: 'email_change',
    cedula_change: 'cedula_change',
    direccion_change: 'direccion_change',
    cargos_change: 'cargos_change',
    permisos_change: 'permisos_change',
    pwd_change: 'pwd_change',
    clear: 'clear',
};
//#endregion

const Colaborador = () => {
    const { register, handleSubmit, errors } = useForm();
    const [data, dispatch] = useReducer(reducer, init);
    const [loading,setLoading] = useState(false);
    const [permisos, setPermisos] = useState([]);
    const [cargos, setCargos] = useState([]);

    const readUrl = event => {
        if (event.target.files.length === 0) {
            return;
        }
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = _event => {
            dispatch({ type: actions.picture_change, payload: reader.result });
        };
    };

    const ingresar = async () => {
        let user = null;
        try {
            setLoading(true);
            const serverData = await dbColaborador.getAll();
            const copyData = JSON.parse(JSON.stringify(Object.assign(data)));
            const existUser = serverData.find(x=>x.email===copyData.email.trim());
            if(existUser) {
                toast.error('El usuario ya existe');
                return;
            }

            user = await auth.createUserWithEmailAndPassword(copyData.email, copyData.pwd);
            const ref = dbColaborador.getRefById(user.user.uid);
            copyData.id = user.user.uid;
            delete copyData.pwd;
            await ref.set(copyData);
            dispatch({type:actions.clear});
            toast.success('Se ha ingresado correctamente');
        } catch (err) {
            if(user){ 
                console.dir(user);
                await user.user.delete(); 
            }
            console.error(err);
            toast.error('Ah ocurrido un error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const [_cargos, _permisos] = await Promise.all([
                dbCargo.getAllActive(),
                dbPermisos.getAll(),
            ]);
            setCargos(_cargos);
            setPermisos(_permisos);
        };
        fetch();
    }, []);

    return (
        <>
            <Breadcrumb title="Agregar" parent="Colaborador" url={COLABORADOR_SHOW_ALL} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form
                            className="needs-validation tooltip-validation validateClass"
                            noValidate=""
                            onSubmit={handleSubmit(ingresar)}
                        >
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="font-primary">Información General</h5>
                                        </div>
                                        <div className="card-body position-relative">
                                            <Loading active={loading}/>
                                            <div className="row">
                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="form-row">
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="nombre">
                                                                Nombre Completo
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="nombre"
                                                                name="nombre"
                                                                type="text"
                                                                placeholder="Nombre Completo"
                                                                value={data.name}
                                                                onChange={event => {
                                                                    dispatch({
                                                                        type: actions.name_change,
                                                                        payload: event.target.value,
                                                                    });
                                                                }}
                                                                ref={register({
                                                                    required: true,
                                                                })}
                                                            />
                                                            {errors.nombre && (
                                                                <span>Nombre es requerido</span>
                                                            )}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="email">Email</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span
                                                                        className="input-group-text"
                                                                        id="basic-addon1"
                                                                    >
                                                                        <i
                                                                            className="fa fa-envelope-o"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    placeholder="Ingresa email"
                                                                    value={data.email}
                                                                    onChange={event => {
                                                                        dispatch({
                                                                            type:
                                                                                actions.email_change,
                                                                            payload:
                                                                                event.target.value,
                                                                        });
                                                                    }}
                                                                    ref={register({
                                                                        required: true,
                                                                    })}
                                                                />
                                                            </div>
                                                            {errors.email && (
                                                                <span>Email es requerido</span>
                                                            )}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="email">
                                                                Contraseña
                                                            </label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span
                                                                        className="input-group-text"
                                                                        id="basic-addon1"
                                                                    >
                                                                        <i
                                                                            className="fa fa-lock"
                                                                            aria-hidden="true"
                                                                        ></i>
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    id="pwd"
                                                                    name="pwd"
                                                                    type="password"
                                                                    placeholder="Contraseña Segura"
                                                                    value={data.pwd}
                                                                    onChange={event => {
                                                                        dispatch({
                                                                            type:
                                                                                actions.pwd_change,
                                                                            payload:
                                                                                event.target.value,
                                                                        });
                                                                    }}
                                                                    ref={register({
                                                                        required: true,
                                                                    })}
                                                                />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-info px-3" type="button" disabled={true}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                                </div>
                                                            </div>
                                                            {errors.pwd && (
                                                                <span>Favor ingresar una contraseña</span>
                                                            )}
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="cedula">Cedula</label>
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <span
                                                                        className="input-group-text"
                                                                        id="basic-addon1"
                                                                    >
                                                                        <i
                                                                            className="fa fa-id-card-o"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <input
                                                                    className="form-control"
                                                                    id="cedula"
                                                                    name="cedula"
                                                                    type="text"
                                                                    placeholder="Ingresa cédula"
                                                                    value={data.cedula}
                                                                    onChange={event => {
                                                                        dispatch({
                                                                            type:
                                                                                actions.cedula_change,
                                                                            payload:
                                                                                event.target.value,
                                                                        });
                                                                    }}
                                                                    ref={register({
                                                                        required: true,
                                                                        pattern: /[0-9]{3}(-{0,1}\s{0,1})[0-9]{6}(-{0,1}\s{0,1})[0-9]{4}[A-z]{1}/,
                                                                    })}
                                                                />
                                                            </div>
                                                            {errors.cedula && (
                                                                <span>Cédula es requerida</span>
                                                            )}
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="cargo">
                                                                Cargo del colaborador
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                isClearable={true}
                                                                isSearchable={true}
                                                                name="cargo"
                                                                placeholder="Seleciona el cargo"
                                                                onChange={event => {
                                                                    const { value = null } =
                                                                        event || {};
                                                                    dispatch({
                                                                        type: actions.cargos_change,
                                                                        payload: value,
                                                                    });
                                                                }}
                                                                options={cargos.map(x => ({
                                                                    value: x,
                                                                    label:
                                                                        x.name ||
                                                                        'Registro sin nombre',
                                                                }))}
                                                            />
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="dir">Dirección</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="dir"
                                                                name="dir"
                                                                value={data.direccion}
                                                                onChange={event =>
                                                                    dispatch({
                                                                        type:
                                                                            actions.direccion_change,
                                                                        payload: event.target.value,
                                                                    })
                                                                }
                                                                placeholder="Ingresa la dirección del colaborador"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="form-row">
                                                        <div className="col-12 mb-5">
                                                            <div className="text-center user-profile">
                                                                <div className="hovercard">
                                                                    <div className="contact-profile">
                                                                        <img
                                                                            className="shadow-sm bg-ligth rounded-circle img-100"
                                                                            src={
                                                                                data.pictureUrl
                                                                                    ? data.pictureUrl
                                                                                    : user
                                                                            }
                                                                            alt=""
                                                                        />
                                                                        <div className="icon-wrapper bg-dark text-white">
                                                                            <i className="icofont icofont-pencil-alt-5">
                                                                                <input
                                                                                    className="upload"
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    onChange={
                                                                                        readUrl
                                                                                    }
                                                                                />
                                                                            </i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <h6 className="text-dark">
                                                                Permisos del colaborador
                                                            </h6>
                                                            <small className="text-black-50">
                                                                Lista de permisos que tiene o tendrá
                                                                acceso el colaborador.
                                                            </small>
                                                        </div>
                                                        <div className="col-12">
                                                            <label htmlFor="permisos">
                                                                Permisos del colaborador
                                                            </label>
                                                            <NestedList
                                                                init={permisos}
                                                                value={data.permisos}
                                                                onChange={permisos => {
                                                                    dispatch({
                                                                        type:
                                                                            actions.permisos_change,
                                                                        payload: permisos,
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between">
                                            <div>
                                                <button
                                                    className="btn btn-primary mr-1"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    Agregar
                                                </button>
                                                <button
                                                    className="btn btn-danger mr-1"
                                                    type="reset"
                                                    onClick={() => {
                                                        dispatch({ type: actions.clear });
                                                    }}
                                                    disabled={loading}
                                                >
                                                    Limpiar
                                                </button>
                                            </div>
                                            <a
                                                href={COLABORADOR_SHOW_ALL}
                                                className="btn btn-info mr-1"
                                                type="button"
                                            >
                                                Mostrar Todos
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Colaborador;
