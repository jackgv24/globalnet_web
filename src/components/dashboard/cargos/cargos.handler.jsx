 import { default as React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from 'react-hook-form';
import { withRouter } from 'react-router'
import { toast } from 'react-toastify';

import {default as Breadcrumb} from '../../common/breadcrumb';
import {default as Modal} from '../../common/modal';


import { default as dbPermisos } from '../../../data/permisos';
import { default as dbCargos } from '../../../data/cargos';
import {CARGOS_SHOW_ALL} from '../../../constant/url'

import {
    CARGOS_ADD_FUNCIONES,
    CARGOS_CARGO_PARENT,
    CARGOS_DEL_FUNCIONES,
    CARGOS_PERMISOS,
} from '../../../constant/actionTypes';

const Handle = props => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    console.log(props);

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

    const onChangeParent = ({ value, label }) => {
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
            <Breadcrumb title="Visualizar" parent="Cargos" url={CARGOS_SHOW_ALL}/>
            <div className="container-fluid">
                <Modal active={activeMdl}/>
                <div className="row">
                    <div className="col-12">
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Handle);
