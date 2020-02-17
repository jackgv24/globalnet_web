import { default as React, useEffect, useState } from 'react';
import { default as Table } from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { default as paginationFactory } from 'react-bootstrap-table2-paginator';

import { default as Breadcrumb } from '../../common/breadcrumb';
import { default as Search } from '../../common/table2/search_group';

import { default as dbCargos } from '../../../data/cargos';

const View = () => {
    const [cargos, setCargos] = useState([]);
    const columns = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true,
        },
        {
            dataField: 'name',
            text: 'Cargo',
        },
        {
            dataField: 'parent',
            text: 'Supervisor',
        },
        {
            dataField: 'active',
            text: 'Activo',
        },
    ];
    const valFn = fn => {
        if (!Array.isArray(fn)) return false;
        if (fn <= 0) return false;
        return true;
    };
    const expandRow = {
        renderer: row => {
            return (
                <div>
                    {valFn(row.functions) ? (
                        <ul className="list-group">
                            {Array.from(row.functions).map((fn, index) => (
                                <li className="list-group-item" key={index}>
                                    {fn}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="w-100 text-center">No existen registros</p>
                    )}
                </div>
            );
        },
    };

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
                                <ToolkitProvider
                                    keyField="id"
                                    columns={columns}
                                    data={cargos}
                                    pagination={paginationFactory()}
                                    noDataIndication="No hay registros de cargos"
                                    search
                                >
                                    {props => {
                                        return (
                                            <div className="form-row">
                                                <div className="col-12">
                                                    <Search {...props.searchProps} />
                                                </div>
                                                <div className="col-12">
                                                    <Table {...props.baseProps} rowClasses="bg-ligth" expandRow={expandRow}/>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </ToolkitProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default View;
