import {default as React} from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'
// import Bookmark from './bookmark';


const Breadcrumb = ({title=null,parent,childTitle=null,url=null,...props}) => {
    
    return (
        <>
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <div className="page-header-left">
                                {title && <h3>{title}</h3>}
                                <ol className={`breadcrumb ${title? 'pull-right':'m-0'}`}>
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard/default">
                                            <Home />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">{url?<a href={`${process.env.PUBLIC_URL}${url}`}>{parent}</a>:parent}</li>
                                    {(title || childTitle) &&<li className="breadcrumb-item active">{childTitle || title}</li>}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Breadcrumb
