import { default as React, useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { default as Breadcrumb } from '../../common/breadcrumb';
import { default as Table2 } from '../../common/datatable';

import { default as dbCargos } from '../../../data/cargos';
import { CARGOS_SHOW_BY_ID } from '../../../constant/url'

const View = ({ history }) => {
    const [cargos, setCargos] = useState([]);
    const fnIsArray = (fns) => {
        if(!Array.isArray(fns)) return false;
        if(fns.length<=0) return false;
        return true;
    }

    useEffect(() => {
        const fetch = async () => {
            const data = await dbCargos.getAll();
            const _cargos = data.map(x => ({
                id:{content:x.id,show:false},
                Nombre: x.name,
                Supervisor: x.parent? x.parent.name :'',
                'Funciones':fnIsArray(x.functions)?x.functions.length:'No hay funciones',
                'Fecha de Creacion': x.createdAt? x.createdAt.toDate().toLocaleDateString():'No hay fecha de registro',
                Activo:<i className={`fa fa-circle font-${x.active?'success':'danger'} f-12`}/>,
            }));

            if (Array.isArray) setCargos(_cargos);
        };
        fetch();
    }, []);

    const view = (data) => {
        const url = `${process.env.PUBLIC_URL}${CARGOS_SHOW_BY_ID.replace(':id',data.id.content)}`;
        history.push(url);
    }

    return (
        <>
            <Breadcrumb title="Mostrar" parent="Cargos" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="font-primary">Información General De Cargos</h5>
                            </div>
                            <div className="card-body">
                                <Table2
                                    data={cargos}
                                    class="-striped -highlight"
                                    actions={
                                        [{
                                            element:<div className="btn btn-sm btn-info p-0"><i className="fa fa-eye" style={{ fontSize: '14px', color: '#FFF',margin:'1.5px' }}></i></div>,
                                            event:view,
                                            label:'test'
                                        }]
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(View);
