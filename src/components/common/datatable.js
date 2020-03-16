import { default as React, useState, useEffect, isValidElement } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table2 = ({
    data,
    pageSize = 10,
    myClass,
    isEditable = false,
    multiSelectOption = false,
    actions = [],
    pagination,
    onClickRow = null,
    ...props
}) => {
    const [checkedValues, setCheckedValues] = useState([]);
    const [myData, setMyData] = useState([]);
    const [columns, setColumns] = useState([]);

    // useEffect(()=>{

    // },[data])

    useEffect(() => {
        const _columns = [];

        for (var key in data[0]) {
            let editable = renderEditable;
            let canShow = true;
            if (isValidElement(data[0][key])) editable = null;
            else if(typeof data[0][key] === "object"){
                const {content,show} = data[0][key];
                canShow = show;
            }
            _columns.push({
                Header: <b>{toCapitalize(key)}</b>,
                accessor: key,
                Cell: editable,
                show:canShow,
                style: {
                    textAlign: 'center',
                },
            });
        }
        if (actions.length > 0) {
            _columns.push({
                Header: <b>Acciones</b>,
                id: 'delete',
                accessor: str => 'delete',
                Cell: row => {
                    return (
                        <div>
                            {actions.map((x,i) => {
                                const { element, text, event } = x;
                                return (<span key={i} onClick={()=>{if(typeof event=== "function") event(row.original,i)}}>{element}</span>)
                            })}
                        </div>
                    );
                },
                style: {
                    textAlign: 'center',
                },
                sortable: false,
            });
        }
        if (multiSelectOption) {
            _columns.push({
                Header: (
                    <button
                        className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={e => {
                            if (
                                window.confirm(
                                    '¿Estás seguro de que deseas eliminar este artículo?',
                                )
                            )
                                handleRemoveRow();
                        }}
                    >
                        Delete
                    </button>
                ),
                id: 'delete',
                accessor: str => 'delete',
                sortable: false,
                style: {
                    textAlign: 'center',
                },
                Cell: row => (
                    <div>
                        <span>
                            <input
                                type="checkbox"
                                name={row.original.id}
                                defaultChecked={checkedValues.includes(row.original.id)}
                                onChange={e => selectRow(e, row.original.id)}
                            />
                        </span>
                    </div>
                ),
                accessor: key,
                style: {
                    textAlign: 'center',
                },
            });
        }
        setColumns(_columns);
        setMyData(data);
    }, [data, multiSelectOption]);

    const selectRow = (e, i) => {
        if (!e.target.checked) {
            const _checked = checkedValues.filter((item, j) => i !== item);
            setCheckedValues(_checked);
        } else {
            setCheckedValues([...checkedValues, i]);
        }
    };
    const handleRemoveRow = () => {
        const selectedValues = checkedValues;
        const updatedData = myData.filter(x => {
            return selectedValues.indexOf(x.id) < 0;
        });
        setMyData(updatedData);
        toast.success('Eliminado exitosamente !');
    };
    const renderEditable = cellInfo => {
        const onBlur = e => {
            const _data = Array.from(data);
            _data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            setMyData(_data);
        };
        let i = data[cellInfo.index][cellInfo.column.id];
        if(typeof i === "object"){
            const {content} = Object.assign({},i);
            i = content;
        } 

        return (
            <div
                style={{ backgroundColor: '#fafafa' }}
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={onBlur}
                onClick={()=>{if(typeof onClickRow === 'function') onClickRow(cellInfo.original)}}
                dangerouslySetInnerHTML={{
                    __html: data[cellInfo.index][cellInfo.column.id],
                }}
            />
        );
    };
    const toCapitalize = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
            <ReactTable
                data={myData}
                columns={columns}
                defaultPageSize={pageSize}
                minRows={5}
                noDataText="No hay registros"
                nextText="Siguiente"
                previousText="Atras"
                rowsText="registros"
                pageText="página"
                ofText="de"
                className={myClass}
                showPagination={pagination}
            />
            <ToastContainer />
        </>
    );
};

export default Table2;
