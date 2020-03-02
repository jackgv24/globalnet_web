import {default as React, Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';

const ColaboradorVista = () => {
  return (
    <Fragment>
      <Breadcrumb title="Colaborador" parent="Dashboard" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Vista de Colaboradores</h5>
              </div>
              <div className="card-body">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ColaboradorVista;