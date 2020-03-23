import { default as React, useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown } from 'react-feather';

//#region Items
const ItemSub = ({ onClick, id, title, readOnly = false, tag = null, items = [] }) => {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="list-group-item">
            <a
                className={`d-flex flex-row justify-content-between align-items-center ${!collapsed &&
                    'mb-3'}`}
                onClick={onCollapse}
                // style={{ borderRadius: 0 }}
            >
                <div className="mt-1 d-flex w-100">
                    <div className="d-flex w-100 justify-content-between">
                        <div>
                            {title}
                            <span className="badge badge-primary badge-pill ml-3">{tag}</span>
                        </div>
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
                    const { title, estado, url = null } = item;
                    return (
                        <div
                            key={i}
                            className="bg-light text-dark list-group-item d-flex flex-row justify-content-between align-items-center"
                            style={{ borderRadius: 0 }}
                        >
                            <div className="pl-4">{title}</div>
                            <div className="form-group my-auto">
                                <input
                                    type="checkbox"
                                    checked={!!estado}
                                    onChange={() => onClick(id, i, url, !estado)}
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
const Item = ({ onClick, id, readOnly = false, title, estado = false }) => {
    return (
        <div
            className="list-group-item d-flex flex-row justify-content-between align-items-center"
            // style={{ borderRadius: 0 }}
        >
            <div>{title}</div>
            <div className="form-group my-auto">
                <input
                    type="checkbox"
                    checked={!!estado}
                    onChange={() => onClick(id, !estado)}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};
//#endregion

const NestedList = ({ init = [], value=[], cargo = [], readOnly = false, onChange, maxHeight }) => {
    const [loaded, setLoaded] = useState(false);
    const [newVal] = useState(value);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!loaded) {
            if (init.length > 0) {
                setData(init);
                setLoaded(true);
            }
            return;
        }
    }, [init]);

    useEffect(() => {
        const copyValue = [...value],copyData = [...data];
        
        if (loaded && Array.isArray(value) && Array.isArray(data)) {
            const replica = copyData.map(x=>{
                if(x.type==='link'){
                    x.estado = false;
                } else if (x.type ==='sub' && Array.isArray(x.items)){
                    x.items = x.items.map(y=>{y.estado = false;return y;});
                }
                return x;
            });
            for (const item of copyValue) {
                const fatherId = replica.findIndex(x => x.id === item.id);
                switch (item.type) {
                    case 'link':
                        const childFather = replica[fatherId];
                        if (childFather) {
                            childFather.estado = !!item.estado;
                        }
                        replica[fatherId] = childFather;
                        break;
                    case 'sub':
                        if (fatherId) {
                            if (replica[fatherId].type === 'sub') {
                                const childFather = replica[fatherId];
                                for (const child of item.items || []) {
                                    const _child = childFather.items.find(
                                        x => x.url === child.url
                                    );
                                    if (_child) _child.estado = child.estado;
                                }
                                childFather.estado = true;
                            }
                        }
                        break;
                }
            }
            setData(replica);
        }
    }, [value]);

    const eventChanged = newData => {
        if (typeof onChange === 'function') {
            onChange(
                newData.map(x => {
                    return {
                        id: x.id,
                        title: x.title,
                        tag: x.tag,
                        type: x.type,
                        items: x.type === 'sub' ? x.items : null,
                        url: x.url,
                        estado:!!x.estado
                    };
                }),
            );
        }
    };
    const onClickItem = (id, estado = false) => {
        if (!readOnly && Array.isArray(newVal)) {
            const _value = Array.from(value);
            const _item = _value.find(x => x.id === id);
            if (_item) {
                _item.estado = estado;
            } else {
                const item = data.find(x => x.id === id);
                item.estado = estado;
                _value.push(item);
            }
            eventChanged(_value);
        }
    };
    const onClickSub = (id, i2, url, estado = false) => {
        if (!readOnly && Array.isArray(value)) {
            let _value = Array.from(value);
            let item = _value.find(x => x.id === id);
            if (item) {
                let subItem = item.items.find(x => x.url === url);
                if (subItem) subItem.estado = estado;
                else {
                    subItem = Object.assign({},data.find(x => x.id === id).items[i2]);
                    subItem.estado = estado;
                    item.items.push(subItem);
                }
            } else {
                const newItem = Object.create(data.find(x => x.id === id),{});
                const subItem = Object.create(newItem.items.find(x => x.url === url));
                subItem.estado = estado;
                newItem.items = [subItem];
                newItem.estado = true;
                _value = [..._value,newItem];
            }
            eventChanged(_value);
        }
    };

    return (
        <>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control bg-white"
                    placeholder="Busqueda de permisos"
                    value={search}
                    onChange={e => setSearch(e.currentTarget.value)}
                    aria-label="Busqueda"
                />
            </div>
            <div className="list-group" style={maxHeight ? { maxHeight, overflowY: 'auto' } : {}}>
                {data
                    .filter(item => {
                        const title = item.title || '',
                            tag = item.tag || '';
                        if (search === '') return true;
                        return title.includes(search) || tag.includes(search);
                    })
                    .map((item, i) => {
                        return item.type === 'sub' ? (
                            <ItemSub
                                key={i}
                                onClick={onClickSub}
                                index={i}
                                readOnly={!readOnly}
                                {...item}
                            />
                        ) : (
                            <Item
                                key={i}
                                onClick={onClickItem}
                                index={i}
                                readOnly={!readOnly}
                                {...item}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default NestedList;
