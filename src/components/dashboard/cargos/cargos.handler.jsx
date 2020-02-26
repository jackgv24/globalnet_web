import { default as React, useState, useEffect, Fragment } from 'react';
// import useForm from 'react-hook-form';
// import { withRouter } from 'react-router';
// import { default as Select } from 'react-select';
// import { default as Swal } from 'sweetalert2';

// import { toast } from 'react-toastify';

// import { default as Breadcrumb } from '../../common/breadcrumb';
// import { default as NestedList } from '../../common/nestedList';
// import { default as Modal } from '../../common/modal';

// import { default as dbPermisos } from '../../../data/permisos';
// import { default as dbCargos } from '../../../data/cargos';
// import { CARGOS_SHOW_ALL } from '../../../constant/url';

// //TODO: hay una mejor forma de hacer este componente
// const Handler = ({ history, match, action = 'update' }) => {
//     const { handleSubmit, errors } = useForm();
//     const [data,setData] = useState({
//         id:'',
//         name: '',
//         functions: [],
//         parent: {},
//         permisos: [],
//         active: true,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     });
//     const [backup, setBackup] = useState(null);
    
//     //TODO: Migrar al data
//     const [todoList, setTodoList] = useState([]);
//     const [parent, setParent] = useState([]);
    
//     const [fnText, setFnText] = useState('');
//     const [permisos, setPermisos] = useState([]);
//     const [initPermisos, setInitPermisos] = useState([]);
//     const [cargos, setCargos] = useState([]);

//     const [loader, setLoader] = useState(false);
//     const [canWrite, setCanWrite] = useState(false);

//     //#region Functions
//     const addFunctions = () => {
//         if (fnText.trim() != '') {
//             dispatch({ type: CARGOS_ADD_FUNCIONES, payload: fnText });
//             setFnText('');
//         }
//     };
//     const delFunctions = index => {
//         dispatch({ type: CARGOS_DEL_FUNCIONES, payload: index });
//     };
//     //#endregion

//     //#region Event
//     const onClickWantUpdate = async () => {
//         Swal.fire({
//             title: '¿Deseas editar el registro?',
//             text: 'Recuerda que al modificar el registro, los cambios seran permanentes',
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'Vamos',
//             confirmButtonColor: '#007bff',
//             cancelButtonColor: '#ff5370',
//             cancelButtonText: 'No',
//         }).then(({ value }) => {
//             if (value) setCanWrite(true);
//         });
//     };
//     const onClickReset = async () => {
//         setCanWrite(false);
//         dispatch({ type: CARGOS_INIT, payload: backup });
//     };
//     const onChangeName = event => {
//         if (canWrite) {
//             dispatch({ type: CARGO_CHANGE_NAME, payload: event.currentTarget.value.trim() });
//         }
//     };
//     const onChangeParent = event => {
//         const { value = {} } = event || {};
//         setParent(value);
//         dispatch({ type: CARGOS_CARGO_PARENT, payload: value });
//     };
//     const onChangePermisos = data => {
//         dispatch({ type: CARGOS_PERMISOS, payload: data });
//     };
//     const onSubmit = async (_data, event) => {
//         event.preventDefault();
//         try {
//             setLoader(true);
//             console.log(data);
//             const _valName = (await dbCargos.getAll()).find(
//                 x => x.id !== data.id && x.name === data.name,
//             );
//             if (_valName) {
//                 toast.error('El cargo ha ingresar se encuentra registrado');
//             } else {
//                 const result = await dbCargos.updateById(data.id, data);
//                 toast.success(result.message);
//             }
//         } catch (error) {
//             toast.error('Lo sentimos ah ocurrido un error');
//             console.error(error);
//         }
//         setLoader(false);
//     };
//     //#endregion

//     //#region Listeners
//     useEffect(() => {
//         const fetch = async () => {
//             const [_cargos, _permisos, _data] = await Promise.all([
//                 dbCargos.getAll(),
//                 dbPermisos.getAll(),
//                 dbCargos.getById(match.params.id),
//             ]);
//             if (Array.isArray(_permisos)) setPermisos(_permisos);
//             if (Array.isArray(_cargos)) setCargos(_cargos);
//             if (_data.exists) {
//                 const _result = Object.assign({},_data.data());
//                 setBackup(_result);
//                 setData({...data,..._result});
//             }
//         };
//         fetch();
//     }, []);

//     useEffect(() => {
//         if (Array.isArray(data.functions)) setTodoList(data.functions);
//         if (Array.isArray(data.permisos))
//             if (data.permisos.length > 0) setInitPermisos(data.permisos);
//         if (data.parent) setParent({ value: data.parent, label: data.parent.name });
//     }, [data]);
//     //#endregion

//     return (
//         <>
//             {/* <Loader show={loader} /> */}
//             <Breadcrumb parent="Cargos" childTitle={data.id} url={CARGOS_SHOW_ALL} />
//             <div className="container-fluid">
//                 <Modal active={loader} />
//                 <div className="row">
//                     <div className="col-12">
//                         <form
//                             className="needs-validation tooltip-validation validateClass"
//                             onSubmit={handleSubmit(onSubmit)}
//                         >
//                             <div className="row">
//                                 <div className="col-12 col-lg-10">
//                                     <div className="card">
//                                         <div className="card-header d-flex justify-content-between">
//                                             <h5 className="font-primary">
//                                                 Información General De Cargos
//                                             </h5>
//                                             <span hidden={canWrite} className="text-secondary">
//                                                 ¿Deseas{' '}
//                                                 <a
//                                                     href="#"
//                                                     onClick={onClickWantUpdate}
//                                                     className="text-dark font-weight-bold"
//                                                 >
//                                                     modificar
//                                                 </a>{' '}
//                                                 el registro?
//                                             </span>
//                                         </div>
//                                         <div className="card-body">
//                                             <div className="row">
//                                                 <div className="col-12 col-md-6">
//                                                     <div className="form row">
//                                                         <div className="col-12 mb-3">
//                                                             <label htmlFor="name">Cargo</label>
//                                                             <input
//                                                                 className="form-control bg-white"
//                                                                 id="name"
//                                                                 name="name"
//                                                                 type="text"
//                                                                 placeholder="Ingresa el nombre del cargo"
//                                                                 value={data.name}
//                                                                 readOnly={!canWrite}
//                                                                 onChange={onChangeName}
//                                                             />
//                                                             {errors.name && (
//                                                                 <span>
//                                                                     Nombre del cargo es requerido
//                                                                 </span>
//                                                             )}
//                                                             <div className="valid-feedback">
//                                                                 Looks good!
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-12 mb-3">
//                                                             <label htmlFor="cargo-superior">
//                                                                 Supervisor
//                                                             </label>
//                                                             <Select
//                                                                 id="cargo-superior"
//                                                                 placeholder="Selecione un cargo superior"
//                                                                 value={parent}
//                                                                 onChange={onChangeParent}
//                                                                 options={cargos
//                                                                     .filter(x => x.id != data.id)
//                                                                     .map(x => ({
//                                                                         value: x,
//                                                                         label: x.name,
//                                                                     }))}
//                                                                 isLoading={cargos.length <= 0}
//                                                                 isClearable={true}
//                                                                 isSearchable={true}
//                                                                 isDisabled={!canWrite}
//                                                             />
//                                                         </div>
//                                                         <div className="col-12">
//                                                             <div className="checkbox">
//                                                                 <input
//                                                                     id="dafault-checkbox"
//                                                                     type="checkbox"
//                                                                     checked={data.active}
//                                                                     onChange={(event)=>{
//                                                                         if(canWrite)dispatch({type:CARGOS_STATUS,payload:event.currentTarget.checked})
//                                                                     }}
//                                                                     readOnly={canWrite}
//                                                                 />
//                                                                 <label
//                                                                     className="mb-0"
//                                                                     htmlFor="dafault-checkbox"
//                                                                 >
//                                                                     El estado actual del cargo es {data.active?<span className="text-success">activo</span>:<span className="text-danger">inactivo</span>}
//                                                                 </label>
//                                                             </div>
//                                                         </div>
//                                                         <div className="col-12 my-3">
//                                                             <hr />
//                                                             <h6 className="text-dark">
//                                                                 Funciones de un cargo
//                                                             </h6>
//                                                             <small className="text-black-50">
//                                                                 Listado de funciones que debe
//                                                                 realizar un cargo
//                                                             </small>
//                                                             <div className="todo mt-4">
//                                                                 <div className="todo-list-wrapper">
//                                                                     <div className="todo-list-container">
//                                                                         <div
//                                                                             className="todo-list-body"
//                                                                             style={{
//                                                                                 minHeight: '0rem',
//                                                                                 maxHeight: '12rem',
//                                                                                 overflowY: 'auto',
//                                                                             }}
//                                                                         >
//                                                                             <ul id="todo-list">
//                                                                                 {todoList.length > 0
//                                                                                     ? todoList.map(
//                                                                                           (
//                                                                                               description,
//                                                                                               index,
//                                                                                           ) => (
//                                                                                               <li
//                                                                                                   className="task"
//                                                                                                   key={
//                                                                                                       index
//                                                                                                   }
//                                                                                               >
//                                                                                                   <div className="task-container">
//                                                                                                       <p
//                                                                                                           style={{
//                                                                                                               fontSize: 14,
//                                                                                                           }}
//                                                                                                       >
//                                                                                                           <b>{`${index +
//                                                                                                               1}. `}</b>
//                                                                                                           {
//                                                                                                               description
//                                                                                                           }
//                                                                                                       </p>
//                                                                                                       {canWrite && (
//                                                                                                           <span
//                                                                                                               className="task-action-btn"
//                                                                                                               onClick={() =>
//                                                                                                                   delFunctions(
//                                                                                                                       index,
//                                                                                                                   )
//                                                                                                               }
//                                                                                                           >
//                                                                                                               <span
//                                                                                                                   className="action-box large delete-btn"
//                                                                                                                   title="Eliminar función"
//                                                                                                               >
//                                                                                                                   <i className="icon">
//                                                                                                                       <i className="icon-trash" />
//                                                                                                                   </i>
//                                                                                                               </span>
//                                                                                                           </span>
//                                                                                                       )}
//                                                                                                   </div>
//                                                                                               </li>
//                                                                                           ),
//                                                                                       )
//                                                                                     : null}
//                                                                             </ul>
//                                                                         </div>
//                                                                         <div
//                                                                             className="todo-list-footer"
//                                                                             hidden={!canWrite}
//                                                                         >
//                                                                             <div className="new-task-wrapper visible">
//                                                                                 <textarea
//                                                                                     className="ng-untouched ng-pristine ng-valid border"
//                                                                                     style={{
//                                                                                         height:
//                                                                                             '70px',
//                                                                                     }}
//                                                                                     id="newFunction"
//                                                                                     placeholder="Ingresa la nueva funcion"
//                                                                                     value={fnText}
//                                                                                     readOnly={
//                                                                                         !canWrite
//                                                                                     }
//                                                                                     onChange={e =>
//                                                                                         setFnText(
//                                                                                             e
//                                                                                                 .currentTarget
//                                                                                                 .value,
//                                                                                         )
//                                                                                     }
//                                                                                 />
//                                                                             </div>
//                                                                             <div className="d-flex flex-row justify-content-end">
//                                                                                 <span className="add-task-btn">
//                                                                                     <button
//                                                                                         className="btn btn-outline-dark"
//                                                                                         type="button"
//                                                                                         onClick={
//                                                                                             canWrite
//                                                                                                 ? addFunctions
//                                                                                                 : null
//                                                                                         }
//                                                                                     >
//                                                                                         Agregar
//                                                                                     </button>
//                                                                                 </span>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-12 col-md-6">
//                                                     <div className="mb-3">
//                                                         <h6 className="text-dark">
//                                                             Permisos de un cargo
//                                                         </h6>
//                                                         <small className="text-black-50">
//                                                             Lista de permisos que tiene o tendrá
//                                                             acceso el cargo, no de manera estricta
//                                                             los permisos que usted le asigne acá
//                                                             tendran efecto en el usuario
//                                                         </small>
//                                                     </div>
//                                                     <NestedList
//                                                         init={permisos}
//                                                         value={data.permisos}
//                                                         onChange={onChangePermisos}
//                                                         readOnly={!canWrite}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="card-footer" hidden={!canWrite}>
//                                             <button className="btn btn-primary mr-1" type="submit">
//                                                 Actualizar
//                                             </button>
//                                             <button
//                                                 className="btn btn-danger mr-1"
//                                                 type="reset"
//                                                 onClick={onClickReset}
//                                             >
//                                                 Cancelar
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default withRouter(Handler);

export default () => {return (<h1>Hola</h1>)}