import { default as React, useEffect, useState } from 'react';
import { default as Breadcrumb } from '../common/breadcrumb';

import { default as NestedList } from '../common/nestedList';
import { default as Avatar } from '../common/avatar.picture';

const ComponentLab = () => {
    const [data] = useState([
        { id: '1', url: 'agregar', title: 'agregar', type: 'link' },
        {
            id: '2',
            url: 'modificar',
            title: 'modificar',
            tag: 'colaborador',
            type: 'sub',
            items: [
                { title: 'test', url: 'test', estado: false },
                { title: 'test 2', url: 'test' },
            ],
        },
        { id: '4', url: 'agregar 2', title: 'agregar', type: 'link',tag:'cables' },
        {
            id: '5',
            url: 'modificar 2',
            title: 'modificar',
            tag: 'cables',
            type: 'sub',
            items: [
                { title: 'test', url: 'test', estado: false },
                { title: 'test 2', url: 'test' },
            ],
        },
    ]);
    const [fill,setFill] = useState([]);
    const onChange = data => {
        console.log(data);
    };

    useEffect(()=>{
        setTimeout(()=>{
            setFill([{ id: '1', url: 'agregar', title: 'agregar', type: 'link' }]);
        },5000)
    },[])

    return (
        <>
            <Breadcrumb title="Creacion o Puebas de Componente" parent="Colaborador" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="font-primary">Nested List</h5>
                                <span>
                                    En esta seccion se ocupara para la creación de componentes
                                </span>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <NestedList init={data} fill={fill} onChange={onChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                    <div className="card">
                            <div className="card-header">
                                <h5 className="font-primary">Avatar</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <Avatar/>
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
