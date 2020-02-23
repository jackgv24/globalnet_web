import { default as React, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from 'react-hook-form';
import { default as Select } from 'react-select';
import { toast } from 'react-toastify';

import {default as Breadcrumb} from '../../common/breadcrumb';
import {default as NestedList} from '../../common/nestedList';
import {default as Modal} from '../../common/modal';


import { default as dbPermisos } from '../../../data/permisos';
import { default as dbCargos } from '../../../data/cargos';
import {CARGOS_SHOW_ALL} from '../../../constant/url'


import {
    CARGO_CHANGE_NAME,
    CARGOS_ADD_FUNCIONES,
    CARGOS_CARGO_PARENT,
    CARGOS_DEL_FUNCIONES,
    CARGOS_PERMISOS,
} from '../../../constant/actionTypes';

const Agregar = props => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const data = useSelector(state => state.cargos);
    const [todoList, setTodoList] = useState([]);

    const [fnText, setFnText] = useState('');
    const [permisos, setPermisos] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [activeMdl,setActiveMdl] = useState(false);

    const addFunctions = () => {
        if (fnText.trim() != '') {
            dispatch({ type: CARGOS_ADD_FUNCIONES, payload: fnText });
            setFnText('');
        }
    };
    const delFunctions = index => {
        dispatch({ type: CARGOS_DEL_FUNCIONES, payload: index });
    };

    const onChangeParent = (parent) => {
        const {value=null} = parent || {};
        dispatch({ type: CARGOS_CARGO_PARENT, payload: value });
    };
    const onChangePermisos = data => {
        dispatch({ type: CARGOS_PERMISOS, payload: data });
    };
    const onSubmit = async (_data, event) => {
        event.preventDefault();
        try {
            setActiveMdl(true);
            const _cargo = { ...data, name: _data.name };
            const _valName = await dbCargos.getByName(_cargo.name);
            if (_valName) {
                toast.error('El cargo ha ingresar se encuentra registrado');
            } else {
                const result = await dbCargos.create(_cargo);
                toast.success(result.message);
            }
        } catch (error) {
            toast.error('Lo sentimos ah ocurrido un error');
            console.error(error);
        }
        setActiveMdl(false);
    };

    useEffect(() => {
        console.log('Fech data');
        const fetch = async () => {
            const [_cargos, _permisos] = await Promise.all([
                dbCargos.getAll(),
                dbPermisos.getAll(),
            ]);
            if (Array.isArray(_permisos)) setPermisos(_permisos);
            if (Array.isArray(_cargos)) setCargos(_cargos);
        };
        fetch();
    }, []);

    useEffect(() => {
        if (Array.isArray(data.functions)) setTodoList(data.functions);
        console.log(data);
    }, [data]);

    return (
        <>
            <Breadcrumb title="Agregar Cargos" parent="Cargos" url={CARGOS_SHOW_ALL}/>
            <div className="container-fluid">
                <Modal active={activeMdl}/>
                <div className="row">
                    <div className="col-12">
                        <form className="needs-validation tooltip-validation validateClass" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 col-lg-10">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="font-primary">
                                                Información General De Cargos
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form row">
                                                        <div className="col-12 mb-3">
                                                    <label htmlFor="name">Cargo</label>
                                                    <input
                                                        className="form-control"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="Ingresa el nombre del cargo"
                                                        ref={register({ required: true })}
                                                    />
                                                    {errors.name && (
                                                        <span>'Nombre del cargo es requerido'</span>
                                                    )}
                                                    <div className="valid-feedback">
                                                        Looks good!
                                                    </div>
                                                </div>
                                                        <div className="col-12">
                                                    <label htmlFor="cargo-superior">
                                                        Supervisor
                                                    </label>
                                                    <Select
                                                        id="cargo-superior"
                                                        placeholder="Selecione un cargo superior"
                                                        options={cargos.map(x => ({
                                                            value: x,
                                                            label: x.name,
                                                        }))}
                                                        onChange={onChangeParent}
                                                        isClearable={true}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                                        <div className="col-12 my-3">
                                                    <hr />
                                                    <h6 className="text-primary">
                                                        Funciones de un cargo
                                                    </h6>
                                                    <small>
                                                        Listado de funciones que debe realizar un
                                                        cargo
                                                    </small>
                                                    <div className="todo mt-4">
                                                        <div className="todo-list-wrapper">
                                                            <div className="todo-list-container">
                                                                <div
                                                                    className="todo-list-body"
                                                                    style={{
                                                                        minHeight: '0rem',
                                                                        maxHeight: '12rem',
                                                                        overflowY: 'auto',
                                                                    }}
                                                                >
                                                                    <ul id="todo-list">
                                                                        {todoList.length > 0
                                                                            ? todoList.map(
                                                                                  (
                                                                                      description,
                                                                                      index,
                                                                                  ) => (
                                                                                      <li
                                                                                          className="task"
                                                                                          key={
                                                                                              index
                                                                                          }
                                                                                      >
                                                                                          <div className="task-container">
                                                                                              <p
                                                                                                  style={{
                                                                                                      fontSize: 14,
                                                                                                  }}
                                                                                              >
                                                                                                  <b>{`${index +
                                                                                                      1}. `}</b>
                                                                                                  {
                                                                                                      description
                                                                                                  }
                                                                                              </p>
                                                                                              <span
                                                                                                  className="task-action-btn"
                                                                                                  onClick={() =>
                                                                                                      delFunctions(
                                                                                                          index,
                                                                                                      )
                                                                                                  }
                                                                                              >
                                                                                                  <span
                                                                                                      className="action-box large delete-btn"
                                                                                                      title="Eliminar función"
                                                                                                  >
                                                                                                      <i className="icon">
                                                                                                          <i className="icon-trash"></i>
                                                                                                      </i>
                                                                                                  </span>
                                                                                              </span>
                                                                                          </div>
                                                                                      </li>
                                                                                  ),
                                                                              )
                                                                            : null}
                                                                    </ul>
                                                                </div>
                                                                <div className="todo-list-footer">
                                                                    <div className="new-task-wrapper visible">
                                                                        <textarea
                                                                            className="ng-untouched ng-pristine ng-valid border"
                                                                            style={{
                                                                                height: '70px',
                                                                            }}
                                                                            id="newFunction"
                                                                            placeholder="Ingresa la nueva funcion"
                                                                            value={fnText}
                                                                            onChange={e =>
                                                                                setFnText(
                                                                                    e.currentTarget
                                                                                        .value,
                                                                                )
                                                                            }
                                                                        ></textarea>
                                                                    </div>
                                                                    <div className="d-flex flex-row justify-content-end">
                                                                        <span className="add-task-btn">
                                                                            <button
                                                                                className="btn btn-outline-dark"
                                                                                type="button"
                                                                                onClick={
                                                                                    addFunctions
                                                                                }
                                                                            >
                                                                                Agregar
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div>
                                                        <NestedList init={permisos} onChange={onChangePermisos}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-primary mr-1" type="submit">
                                                Agregar
                                            </button>
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

export default Agregar;
