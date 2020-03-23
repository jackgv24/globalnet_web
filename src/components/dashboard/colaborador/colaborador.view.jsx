import { default as React, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Breadcrumb from '../../common/breadcrumb';
import { COLABORADOR_SHOW_BY_ID as SHOW_ID } from '../../../constant/url';
import { default as dbColaborador } from '../../../data/colaborador';
import { default as Table2 } from '../../common/datatable';

const ColaboradorVista = ({ history }) => {
    const [data, setData] = useState([]);

    const view = data => {
        const url = `${process.env.PUBLIC_URL}${SHOW_ID.replace(':id', data.id.content)}`;
        history.push(url);
    };

    useEffect(() => {
        const fetch = async () => {
            const _data = await dbColaborador.getAll();
            console.log(_data);
            const formatData = _data.map(x => {
                console.log(x);
                const result = {
                    id: { content: x.id, show: false },
                    Nombre: x.name,
                    Cedula: x.cedula,
                    Usuario: x.email,
                    'Creacion': x.createdAt? x.createdAt.toDate().toLocaleDateString():'Sin Registro',
                    'Actualización': x.updatedAt? x.updatedAt.toDate().toLocaleDateString():'Sin Registro',
                    Activo: (
                        <i
                            className={`fa fa-circle font-${x.active ? 'success' : 'danger'} f-12`}
                        />
                    ),
                };
                return result;
            });
            setData(formatData);
        };
        fetch();
    }, []);

    return (
        <>
            <Breadcrumb title="Colaborador" parent="Dashboard" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="font-primary">Informe de Colaboradores</h5>
                            </div>
                            <div className="card-body">
                                <Table2
                                    data={data}
                                    class="-striped -highlight"
                                    actions={[
                                        {
                                            element: (
                                                <div className="btn btn-sm btn-info p-0">
                                                    <i
                                                        className="fa fa-eye"
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#FFF',
                                                            margin: '1.5px',
                                                        }}
                                                    ></i>
                                                </div>
                                            ),
                                            event: view,
                                            label: 'test',
                                        },
                                    ]}
                                    onClickRow={info => {
                                        console.log(`El registro de usuario => ${info.id.content}`);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(ColaboradorVista);
