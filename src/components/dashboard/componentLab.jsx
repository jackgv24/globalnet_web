import { default as React } from 'react';
import { default as Breadcrumb } from '../common/breadcrumb';

import { default as NestedList } from "../common/nestedList";

const ComponentLab = () => {
    return (
        <>
            <Breadcrumb title="Creacion o Puebas de Componente" parent="Colaborador" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="font-primary">Pruebas de componentes</h5>
                                <span>
                                    En esta seccion se ocupara para la creación de componentes
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <NestedList/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComponentLab;
