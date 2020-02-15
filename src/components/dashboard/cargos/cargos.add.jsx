import { default as React, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from 'react-hook-form';

import Breadcrumb from '../../common/breadcrumb';
import NestedList from '../../common/nestedList';

import { default as dbPermisos } from '../../../data/permisos';
import { default as dbCargos } from '../../../data/cargos';

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

    const addFunctions = () => {
        if (fnText.trim() != '') {
            dispatch({ type: CARGOS_ADD_FUNCIONES, payload: fnText });
            setFnText('');
        }
    };
    const delFunctions = index => {
        dispatch({ type: CARGOS_DEL_FUNCIONES, payload: index });
    };
    const onChangePermisos = data => {
        dispatch({ type: CARGOS_PERMISOS, payload: data });
    };
    const onSubmit = async (_data, event) => {
        event.preventDefault();
        const _cargo = {...data,name:_data.name};
        const result = await dbCargos.create(_cargo);
        console.log(result);
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
    }, [data]);

    return (
        <>
            <Breadcrumb title="Agregar Cargos" parent="Cargos" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form className="needs-validation tooltip-validation validateClass" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-12 col-lg-6 col-xl-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="font-primary">
                                                Información General De Cargos
                                            </h5>
                                            <span>
                                                En esta seccion se recolecta la información del
                                                cargo así como tambien sus funciones
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-row">
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
                                                    {errors.name &&<span>'Nombre del cargo es requerido'</span>}
                                                    <div className="valid-feedback">Looks good!</div>
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
                                                                        minHeight: '3rem',
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
                                        <div className="card-footer">
                                            <button className="btn btn-primary mr-1" type="submit">
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-5 col-xl-5">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="font-primary">
                                                Funciones de los cargos
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <NestedList
                                                init={permisos}
                                                onChange={onChangePermisos}
                                            />
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
