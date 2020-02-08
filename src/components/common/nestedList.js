import { default as React, useState } from 'react';
import { ArrowRightCircle, ChevronRight, ChevronDown } from 'react-feather';

const ListItem = ({ title, items }) => {
    const [collapsed, setCollapsed] = useState(true);
    const onClick = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <a className="list-group-item d-flex flex-row justify-content-start align-items-center" onClick={onClick}>
                {collapsed ? (
                    <ChevronRight className="my-auto mr-2" size={18} />
                ) : (
                    <ChevronDown className="my-auto mr-2" />
                )}
                <div className="mt-1">title</div>
            </a>
            <div
                className={`list-group ${collapsed ? 'collapse' : ''}`}
                id="item-1"
                style={{ borderRadius: 0, borderWidth: '1px 0 0 0' }}
            >
                {Array.isArray(items) &&
                    items.map((item, i) => {
                        const { title, url } = item;
                        return (
                            <a
                                key={i}
                                href={`${process.env.PUBLIC_URL}/${url}`}
                                className="list-group-item"
                                style={i == 0 ? { borderRadius: 0 } : {}}
                            >
                                {title}
                            </a>
                        );
                    })}
            </div>
        </>
    );
};

const Item = ({ title, url }) => {
    return (
        <a href={`${process.env.PUBLIC_URL}/${url}`} className="list-group-item">
            {title}
        </a>
    );
};

const NestedList = ({ loquesea, ...props }) => {

    const {} = props;
    const data = [{url:"agregar",title:"agregar",type:"link"},{url:"modificar",title:"modificar",type:"sub",items:[{title:'test',url:'test'}]}]
    return <div className="list-group">{Array.isArray(data) && data.map((item, i) => {
        return item.type=='sub'?<ListItem key={i} {...item}/>:<Item key={i} {...item}/>
    })}</div>;
};

export default NestedList;
