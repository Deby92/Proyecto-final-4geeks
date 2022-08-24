import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const customStyles = {
    content: {
        top: '45%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#app');

const Register = () => {

    const { store, actions } = useContext(Context);
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const validationSchema = Yup.object().shape({
        acceptTerms: Yup.bool()
            .oneOf([true], 'Debes aceptar los terminos y condiciones')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    function onSubmit(data) {
        alert('SUCCESS!!' + JSON.stringify(data, null, 4));
        return false;
    }


    let setOpen = () => {
        setIsOpen(true);
    }

    let closeModal = () => {
        setIsOpen(false);
    }

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState("");

    const checkValidation = (e) => {
        if (store.password !== confirmPassword) {
            setIsError("La contraseña debe coincidir");
        } else {
            setIsError(<i className="fas fa-check"></i>);
        }
    };
    return (
        <section className="vh-100 bg-transparent my-5 p-3" id="register_here">
            <div className="mask d-flex align-items-center h-70 gradient-custom-3">
                <div className="container h-70">
                    <div className="row d-flex justify-content-center align-items-center h-70">
                        <div className="col-12 col-md-6 col-md-6 col-md-4">
                            <div className="card" style={{ borderRadius: 15 }}>
                                <div className="card-body p-3">
                                    <h2 className="text-uppercase text-center mb-4">
                                        Create an account
                                    </h2>
                                    <div className='form-register'>
                                        <form onSubmit={e => { actions.handleSubmit(e, history) }}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <input
                                                    name='name'
                                                    type="text"
                                                    id="form3Example1cg"
                                                    className="form-control form-control me-5"
                                                    placeholder="Your Name"
                                                    onChange={e => actions.handleChange(e)}
                                                    value={store.name}
                                                />
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <input
                                                    name='email'
                                                    type="email"
                                                    id="form3Example3cg"
                                                    className="form-control form-control me-5"
                                                    placeholder="E-mail"
                                                    onChange={e => actions.handleChange(e)}
                                                    value={store.email}
                                                />
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <input
                                                    name='password'
                                                    id="form3Example4cg"
                                                    className="form-control form-control"
                                                    placeholder="Password"
                                                    onChange={e => { actions.handleChange(e) }}
                                                    onKeyUp={() => checkValidation()}
                                                    type={!show ? "password" : "text"}
                                                    value={store.password}

                                                />
                                                <span className='btn btn-light my-1 ms-1 btn-md float me-1' onClick={() => setShow(!show)}>{
                                                    !show ? (
                                                        <i className="fas fa-eye"></i>) : (
                                                        <i className="fas fa-eye-slash"></i>
                                                    )
                                                }
                                                </span>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-3"
                                                data-validate="Confirm data is required">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <input
                                                    name='confirmPassword'
                                                    id="form3Example4cdg"
                                                    className="form-control form-control"
                                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                                    onKeyUp={() => checkValidation()}
                                                    type={!show ? "password" : "text"}
                                                    placeholder="Confirm password"

                                                />
                                                <span className='ms-2 me-5'>{isError}</span>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5" onSubmit={handleSubmit(onSubmit)}>
                                                <input
                                                    name="acceptTerms"
                                                    className={`form-check-input me-2 ${errors.acceptTerms ? 'is-invalid' : ''}`}
                                                    type="checkbox" {...register('acceptTerms')}
                                                    defaultValue=""
                                                    id="acceptTerms" 
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="acceptTerms"
                                                >
                                                <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                                                    I agree all statements in{" "}
                                                    <Link to="/#" className="text-body link-info" onClick={setOpen}>
                                                        <u>Terms of service</u>
                                                    </Link>
                                                    <Modal
                                                        isOpen={modalIsOpen}
                                                        onRequestClose={closeModal}
                                                        style={customStyles}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <h2><strong>Terms of Service</strong></h2>
                                                        <div>
                                                            <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. <br />
                                                            Sed ullamcorper tempus turpis ac consequat. Proin pharetra eu ligula quis tincidunt.<br/>
                                                            Donec eu leo ipsum. Curabitur lacinia est nisi, vel laoreet odio consectetur ut.<br/>
                                                            Duis sed sem et nibh tempor pretium ut fermentum libero. Curabitur lobortis lobortis leo,<br/>
                                                            sit amet posuere est ullamcorper sit amet.<br/> 
                                                            <br/>
                                                            <strong>Fusce in erat dignissim</strong>, consectetur neque id, dictum metus. <br/>
                                                            Donec sodales neque nec metus semper, sed euismod leo elementum. Sed mauris odio,<br/>
                                                            bibendum id aliquet a, iaculis quis dui. In consectetur orci purus, sit amet mattis<br/>
                                                            diam viverra eget. Morbi lacus nunc, auctor in lacus nec, fermentum congue elit.<br/>
                                                            Suspendisse ipsum orci, venenatis non eros molestie, finibus porta quam.<br/>
                                                            <br/>
                                                            <strong>Sed quam justo, scelerisque vitae molestie vel, sagittis eu ex.</strong><br/>
                                                            Nunc vel faucibus ex. Donec ut augue pretium, vulputate felis at, maximus enim.<br/>
                                                            Quisque maximus eu justo nec fermentum. Duis interdum quam non nunc sodales pellentesque.<br/>
                                                            Duis suscipit tempus ex. Donec diam nulla, consectetur non sapien sed, pretium ullamcorper<br/> 
                                                            ex. Sed sem justo, mattis non pellentesque sit amet, semper auctor purus.
                                                        </div>
                                                        <button className='btn btn-outline-danger mt-2' onClick={closeModal}>close</button>
                                                    </Modal>
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                >
                                                    Register
                                                </button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Have already an account?{" "}
                                                <a href="/login" className="fw-bold text-body">
                                                    <u>Login here</u>
                                                </a>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register