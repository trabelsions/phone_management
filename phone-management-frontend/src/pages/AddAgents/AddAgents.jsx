import React, { useState } from 'react'
import Dropzone from "react-dropzone";
import { registerAgent } from 'features/user/api'
import { toast, ToastContainer } from "react-toastify";

export default function AddAgents() {
    const [selectedFile, setSelectedFile] = useState([]);
    const [file, setfile] = useState([]);
    const [errors, setErrors] = useState();

    const [data, setData] = useState({
        phone: "",
        email: "",
        group: "",
        name: "",
        registrationDate: new Date(),
        canCall: true,
        photo: ""
    });
    const changeHandler = (event) => {
        setSelectedFile(event);
        // setIsSelected(true);
        
      
        setfile({ file: window.URL.createObjectURL(event[0]) });

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const validateForm = () => {
        let formErrors = { phone: "", email: "", group: "" };
        let isValid = true;
        if (!data?.phone?.trim()) {
            formErrors.phone = "Phone is required";
            isValid = false;
        }
        if (!data?.name?.trim()) {
            formErrors.name = "name is required";
            isValid = false;
        }
        if (!data?.email?.trim()) {
            formErrors.email = "email is required";
            isValid = false;
        }
        if (!data?.group) {
            formErrors.group = "groups is required";
            isValid = false;
        }
        setErrors(formErrors);
        return isValid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            registerAgent(data)
                .then(res => toast.success("agent ajouter avec success")
                )
                .catch(err => toast.error("probleme d'ajouter un agenet est survenue"))
        }
    };
    return (
        <div className='bg-dashbord '

        >
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <form onSubmit={handleSubmit}>
                <div className='row p-3 vh-80'>
                    <div className="col-lg-6  d-none d-lg-block">
                        <div className='d-flex  justify-content-center align-items-center height-80'>
                            <div>
                                <Dropzone
                                    onDrop={changeHandler}
                                    accept={["image/*"]}
                                    minSize={1024}
                                    maxSize={3072000}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps({ className: "dropzone" })}>

                                            <input {...getInputProps()} />

                                            <p className="btn btn-large">
                                                <i className='bx bx-plus-circle'></i>
                                            </p>
                                        </div>
                                    )}
                                </Dropzone>

                                {selectedFile.length > 0 && selectedFile[0].type !== "application/pdf" ? (
                                    <img
                                        alt="Preview"
                                        src={file.file}
                                        width="200px"
                                        height="200px"
                                        className="rounded-circle photo-facture"
                                    />
                                ) : ""}
                            </div>
                        </div>
                        <div className="input-group mb-3">

                            <input
                                type="text"
                                className="form-control form-control-lg fs-6 transparent-input"
                                placeholder="Nom De L’agent"
                                name="name"
                                value={data?.name}
                                onChange={handleChange}
                            />

                            {errors?.name && (
                                <div className="text-danger w-100">{errors.name}</div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center mb-5">
                            <h3 className="fw-bold">Ajouter les données d'un agent</h3>

                        </div>
                        <label>Numéro de téléphone</label>
                        <div className="input-group mb-3">

                            <input
                                type="text"
                                className="form-control form-control-lg fs-6 transparent-input"
                                placeholder="Entrez le numéro de téléphone"
                                name="phone"
                                value={data?.phone}
                                onChange={handleChange}
                            />

                            {errors?.phone && (
                                <div className="text-danger w-100">{errors.phone}</div>
                            )}
                        </div>
                        <label>Email</label>

                        <div className="input-group mb-3">

                            <input
                                type="email"
                                className="form-control form-control-lg fs-6 transparent-input"
                                placeholder="Entrez l’adresse email"
                                name="email"
                                required
                                value={data?.email}
                                onChange={handleChange}
                            />

                            {errors?.email && (
                                <div className="text-danger w-100">{errors.email}</div>
                            )}
                        </div>
                        <label>Groupe de destination</label>

                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg fs-6 transparent-input"
                                placeholder="Entrez le groupe de destination "
                                name="group"
                                value={data?.group}
                                onChange={handleChange}
                            />

                            {errors?.group && (
                                <div className="text-danger w-100">{errors.group}</div>
                            )}
                        </div>
                        <div className="d-flex justify-content-between">
                            <input
                                type="reset"
                                className=" btn  btn-outline-secondary btn-lg mb-3"
                                value={"Annuler"}
                            >
                                
                            </input>
                            <button
                                type="submit"
                                className="btn btn-success-roundesk  btn-lg mb-3"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <img src="/images/EarningAdd.png" alt="projet" />


        </div>
    )
}
