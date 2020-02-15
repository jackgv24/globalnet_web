import React, { useState } from 'react';
import { default as Select } from 'react-select';
import useForm from 'react-hook-form';
import user from '../../../assets/images/user/user.png';
import Breadcrumb from '../../common/breadcrumb';
import NestedList from '../../common/nestedList';

const Agregar = () => {
    const { register, handleSubmit, errors } = useForm();
    const [validateClass, setValidateClass] = useState(false);
    const [url, setUrl] = useState();
    const [permiso, setPermisos] = useState([]);
    const [cargos,setCargos] = useState([])

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
            setUrl(reader.result);
        };
    };

    const onSubmit = data => {
        if (data != '') {
            alert('You submitted the form and stuff!');
        } else {
            errors.showMessages();
        }
    };
    return (
        <>
            <Breadcrumb title="Agregar Colaborador" parent="Colaborador" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <form
                            className="needs-validation tooltip-validation validateClass"
                            noValidate=""
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-5 col-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5 className="font-primary">
                                                        Información General
                                                    </h5>
                                                    <span>
                                                        En esta seccion se recolecta la información
                                                        general del colaborador
                                                    </span>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-row">
                                                        <div className="col-12 mb-5">
                                                            <div className="text-center user-profile">
                                                                <div className="hovercard">
                                                                    <div className="contact-profile">
                                                                        <img
                                                                            className="shadow-sm bg-ligth rounded-circle img-100"
                                                                            src={url ? url : user}
                                                                            alt=""
                                                                        />
                                                                        <div className="icon-wrapper">
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
                                                            <label htmlFor="valNombre">
                                                                Nombre Completo
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="valNombre"
                                                                name="nombre"
                                                                type="text"
                                                                placeholder="Ingresa el nombre completo"
                                                                ref={register({ required: true })}
                                                            />
                                                            <span>
                                                                {errors.nombre &&
                                                                    'Nombre es requerido'}
                                                            </span>
                                                            <div className="valid-feedback">
                                                                Looks good!
                                                            </div>
                                                        </div>
                                                        <div className="col-12 mb-3">
                                                            <label htmlFor="valEmail">Email</label>
                                                            <input
                                                                className="form-control"
                                                                id="valEmail"
                                                                name="email"
                                                                type="email"
                                                                placeholder="Ingresa email"
                                                                ref={register({ required: true })}
                                                            />
                                                            <span>
                                                                {errors.nombre &&
                                                                    'Email es requerido'}
                                                            </span>
                                                            <div className="valid-feedback">
                                                                Looks good!
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="valIdentificacion">
                                                                Cedula
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                id="valIdentificacion"
                                                                name="cedula"
                                                                type="text"
                                                                placeholder="Ingresa cédula"
                                                                ref={register({
                                                                    required: true,
                                                                    pattern: /[0-9]{3}(-{0,}|\s{0,})[0-9]{6}(-{0,}|\s{0,})[0-9]{4}[A-z]{1}/gm,
                                                                })}
                                                            />
                                                            <span>
                                                                {errors.cedula &&
                                                                    'Cédula es requerida'}
                                                            </span>
                                                            <div className="valid-feedback">
                                                                Looks good!
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="valDireccion">
                                                                Dirección
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id="valDireccion"
                                                                name="direccion"
                                                                placeholder="Direccion completa"
                                                                ref={register({ required: true })}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <button class="btn btn-primary mr-1" type="submit">Submit</button>
                                                    <input class="btn btn-light" type="reset"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-7 col-xl-5">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h5 className="font-primary">Permisos</h5>
                                                    <span>
                                                        Permisos que va a tener el usuario, dentro
                                                        del sistema.
                                                    </span>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                    <div className="col-12 mb-3">
                                                            <label htmlFor="valNombre">
                                                                Nombre Completo
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                isClearable={true}
                                                                isSearchable={true}
                                                                name="cargo"
                                                                options={cargos}
                                                                ref={register()}
                                                            />
                                                        </div>
                                                        <div className="col-12">
                                                            <NestedList init={permiso} maxHeight='33rem'/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
