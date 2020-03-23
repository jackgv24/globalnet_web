import { default as React, useState, useCallback, useEffect,useLayoutEffect } from 'react';
import { default as Cropper } from 'react-easy-crop';
import Dropzone from 'react-dropzone-uploader';
import { default as getCroppedImg } from '../../helpers/cropImg';

import '../../assets/scss/components/avatar.scss';
import 'react-dropzone-uploader/dist/styles.css';
import user from '../../assets/images/user/user.png';
import neutral from '../../assets/pattern/neutral.jpg';

const Avatar = ({ file = null, onChange = null, height = null, width = null, canEsc = true }) => {
    const [canShow, setCanShow] = useState(false);
    const [toCropperUrl, setToCropperUrl] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [zoom, setZoom] = useState(1.5);
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    const getUploadParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' };
    };
    const onClickCancel = () => {
        if (!croppedImage) setCroppedImage(null);
        setCanShow(false);
    };
    const onClickDone = async () => {
        if (toCropperUrl) setCroppedImage(await showCroppedImage());
        else setCroppedImage(null);
        setCanShow(false);
    };
    const onCropComplete = (area, areaPixel) => {
        setCroppedAreaPixels(areaPixel);
    };
    const handleChangeStatus = ({ meta }, status) => {
        if (status === 'done') {
            setToCropperUrl(meta.previewUrl);
        }
    };
    const showCroppedImage = useCallback(async () => {
        try {
            if (!toCropperUrl) {
                return null;
            } else {
                let croppedImage = await getCroppedImg(toCropperUrl, croppedAreaPixels, 0);
                return croppedImage;
            }
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels]);

    useLayoutEffect(()=>{
        if(!file){
            setCroppedImage(null);
        } else if((file instanceof Blob || file instanceof File) && !Object.is(file,croppedImage) ){
            if(file instanceof File || file instanceof Blob) {
                if(!file.type.includes('image')) return;
            }
            setCroppedImage(file);
        }
    },[file])

    useEffect(() => {
        if (canShow) {
            document.onkeydown = evt => {
                if (evt.keyCode == 27 && canEsc) {
                    onClickCancel();
                }
            };
        } else {
            document.onkeydown = null;
        }
    }, [canShow]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(croppedImage);
        }
    }, [croppedImage]);

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="avatar rounded-circle">
                    <img
                        className="shadow-sm bg-ligth w-100 h-100 "
                        src={croppedImage ? URL.createObjectURL(croppedImage) : user}
                    />
                    <div className="option" onClick={() => setCanShow(true)}>
                        <i className="fa fa-camera"></i>
                    </div>
                </div>
            </div>
            <div id="modal" className={`${!canShow ? 'd-none' : 'cropper-modal'}`}>
                <div className="cropper-container d-flex justify-content-center align-items-center">
                    <div className="cropper-content">
                        <div className="card" style={{ overflow: 'hidden' }}>
                            <div className="card-body p-0" style={{ overflowX: 'hidden' }}>
                                <div className="form-row">
                                    <div
                                        className="col-12 mb-4"
                                        style={{
                                            backgroundImage: `url(${neutral})`,
                                            backgroundRepeat: 'repeat',
                                            height: '30rem',
                                        }}
                                    >
                                        <div
                                            className="position-relative h-100 w-100"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                                        >
                                            <Cropper
                                                tabIndex={0}
                                                image={toCropperUrl}
                                                crop={crop}
                                                zoom={zoom}
                                                cropShape="round"
                                                cropSize={{ width: 450, height: 450 }}
                                                onCropChange={setCrop}
                                                onZoomChange={setZoom}
                                                onCropComplete={onCropComplete}
                                                zoomWithScroll={true}
                                                showGrid={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 p-4">
                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div
                                                    className="dz-message needsclick w-100"
                                                    style={{ backgroundColor: 'white' }}
                                                >
                                                    <Dropzone
                                                        getUploadParams={getUploadParams}
                                                        maxFiles={1}
                                                        multiple={false}
                                                        canCancel={false}
                                                        canRemove={true}
                                                        accept="image/*"
                                                        inputContent="Agrega la foto de tu colaborador"
                                                        styles={{
                                                            dropzone: {
                                                                height: '80px',
                                                                width: '100%',
                                                                minHeight: 0,
                                                            },
                                                            inputLabel: {
                                                                marginBottom: 0,
                                                            },
                                                        }}
                                                        onChangeStatus={handleChangeStatus}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-auto">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={onClickDone}
                                                >
                                                    Hecho
                                                </button>
                                            </div>
                                            <div className="col-auto">
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={onClickCancel}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
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

export default Avatar;
