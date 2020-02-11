import { default as React, useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown } from 'react-feather';

//#region Items
const ItemSub = ({ onClick, index, title, tag = null, items = [] }) => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <a className="list-group-item d-flex flex-row justify-content-between align-items-center" onClick={onCollapse} style={ { borderRadius: 0 }}>
                <div className="mt-1 d-flex w-100">
                    <div className="d-flex w-100 justify-content-between">
                        <div>
                            {title}
                            <span className="badge badge-primary badge-pill ml-3">{tag}</span>
                        </div>
                        <span className="badge badge-light badge-pill">items: {items.length}</span>
                    </div>
                </div>
                {collapsed ? (
                    <ChevronLeft className="my-auto ml-3 mr-2" size={20} />
                ) : (
                    <ChevronDown className="my-auto ml-3 mr-2" size={20} />
                )}
            </a>
            <div
                className={`list-group ${collapsed ? 'collapse' : ''}`}
                id="item-1"
                style={{ borderRadius: 0, borderWidth: '1px 0 0 0' }}
            >
                {items.map((item, i) => {
                    const { title, estado } = item;
                    return (
                        <div
                            key={i}
                            className="bg-light text-dark list-group-item d-flex flex-row justify-content-between align-items-center"
                            style={ { borderRadius: 0 }}
                        >
                            <div className="pl-4">{title}</div>
                            <div className="form-group my-auto">
                                <input
                                    type="checkbox"
                                    checked={!!estado}
                                    onChange={() => onClick(index, i, !estado)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
const Item = ({ onClick, index, title, estado, ...props }) => {
    return (
        <div className="list-group-item d-flex flex-row justify-content-between align-items-center" style={ { borderRadius: 0 }}>
            <div>{title}</div>
            <div className="form-group my-auto">
                <input
                    type="checkbox"
                    checked={!!estado}
                    onChange={() => onClick(index, !estado)}
                />
            </div>
        </div>
    );
};
//#endregion

const NestedList = ({ init = [], fill = [], onChange,maxHeight, ...props }) => {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState(init);

    useEffect(() => {
        if (!loaded) {
            if (init.length > 0) {
                setData(init);
                setLoaded(true);
            }
            return;
        } else if (fill.length > 0) {
            const replica = Array.from(data);
            for (const item of fill) {
                const fatherId = replica.findIndex(x => x.id === item.id);
                switch (item.type) {
                    case 'link':
                        const childFather = replica[fatherId];
                        if (childFather) childFather.estado = true;
                        break;
                    case 'sub':
                        // Estoy validando si el Id existe y si el item es tipo sub
                        if (fatherId)
                            if (replica[fatherId].type === 'sub') {
                                const childFather = replica[fatherId];
                                for (const child of item.items || []) {
                                    const childIndex = childFather.findIndex(
                                        x => x.id === child.id,
                                    );
                                    if (childIndex) childFather.items[childIndex].estado = true;
                                }
                                childFather.estado = true;
                            }
                        break;
                    default:
                        break;
                }
            }
            setData(replica);
        }
    }, [init, fill]);

    useEffect(() => {
        if (loaded) {
            if (typeof onChange === 'function') {
                const result = [];
                const _data = [...data];

                for (const main of _data) {
                    if (main.estado) {
                        switch (main.type) {
                            case 'link':
                                result.push(main);
                                break;
                            case 'sub':
                                const _items = main.items.filter(x => x.estado);
                                result.push({ ...main, items: _items });
                                break;
                            default:
                                break;
                        }
                    }
                }
                onChange(result);
            }
        }
    }, [data]);

    const onClickItem = (index, estado = false) => {
        const replica = Array.from(data);
        replica[index].estado = estado;
        setData(replica);
    };
    const onClickSub = (i, i2, state = false) => {
        const replica = [...data];
        const child = Object.assign({}, replica[i]);
        const childItem = child.items[i2];

        childItem.estado = !!state;
        child.estado = child.items.some(x => x.estado === true);

        replica[i] = child;
        setData(replica);
    };

    return (
        <div className="list-group" style={maxHeight?{maxHeight,overflowY:"auto"}:{}}>
            {Array.isArray(data) &&
                data.map((item, i) => {
                    return item.type == 'sub' ? (
                        <ItemSub key={i} onClick={onClickSub} index={i} {...item} />
                    ) : (
                        <Item key={i} onClick={onClickItem} index={i} {...item} />
                    );
                })}
        </div>
    );
};

export default NestedList;
