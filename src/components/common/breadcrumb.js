import React, { Fragment, useState } from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'
// import Bookmark from './bookmark';


const Breadcrumb = ({title,parent,url=null,...props}) => {
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col">
                            <div className="page-header-left">
                                <h3>{title}</h3>
                                <ol className="breadcrumb pull-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard/default">
                                            <Home />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">{url?<a href={`${process.env.PUBLIC_URL}${url}`}>{parent}</a>:parent}</li>
                                    <li className="breadcrumb-item active">{title}</li>
                                </ol>
                            </div>
                        </div>
                        {/* <!-- Bookmark Start--> */}
                       {/* <Bookmark /> */}
                        {/* <!-- Bookmark Ends--> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
