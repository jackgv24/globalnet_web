import { default as React, useEffect, useState } from 'react';

import { default as Breadcrumb } from '../../common/breadcrumb';
import { default as Table2 } from '../../common/datatable';

import { default as dbCargos } from '../../../data/cargos';

const View = () => {
    const [cargos, setCargos] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const data = await dbCargos.getAll();
            const _cargos = data.map(x => ({
                id: x.id,
                name: x.name,
                parent: x.parent.name,
                functions: x.functions,
                fnSize: Array.isArray(x.functions) ? x.functions.length : 0,
                createdAt: x.createdAt.toDate(),
                updatedAt: x.updatedAt.toDate(),
            }));

            console.log(_cargos);

            if (Array.isArray) setCargos(_cargos);
        };
        fetch();
    }, []);

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
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default View;
