import { default as React, useEffect, useState } from 'react';
import { withRouter } from 'react-router';

import { default as Breadcrumb } from '../../common/breadcrumb';
import { default as Table2 } from '../../common/datatable';

import { default as dbColaborador } from '../../../data/colaborador';
import { COLABORADOR_SHOW_BY_ID } from '../../../constant/url'

const View = ({ history }) => {
    const [colaborador, setColaborador] = useState([]);
    const fnIsArray = (fns) => {
        if(!Array.isArray(fns)) return false;
        if(fns.length<=0) return false;
        return true;
    }

    useEffect(() => {
        const fetch = async () => {
            const data = await dbColaborador.getAll();
            const _colaboradores = data.map(x=>({
                id:{content:x.id,show:false}

            }));
        };
        fetch();
    }, []);

    const view = (data) => {
        const url = `${process.env.PUBLIC_URL}${COLABORADOR_SHOW_BY_ID.replace(':id',data.id.content)}`;
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
                                <h5 className="font-primary">Información General De Colaboradores</h5>
                            </div>
                            <div className="card-body">
                                <Table2
                                    data={colaborador}
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
