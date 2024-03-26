import React, {useContext} from 'react'
import { Button, TextInput, Label, Checkbox, Spinner } from 'flowbite-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { customAlert } from '../../config/alerts/alert';
import { useNavigate } from 'react-router-dom';
import AxiosClient from '../../config/http-client/axios-client';
import AuthContext from '../../config/context/auth-context'


const SignInPage = () => {
    //Formik nos ayuda a controlar los formularios 

    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("Campo obligatorio"),
            password: yup.string().required("Campo obligatorio")
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await AxiosClient({
                    url: "/auth/signin",
                    method: "POST",
                    data: values
                });
                if(!response.error){
                    /**
                     * Tenemos que validar que rol tiene -> Redireccionarlo a su página principal
                     */
                    dispatch({type: "SIGNIN", payload: response.data});     //Es el metodo que utiliza nuestro contexto para indicar si un usuario inicio sesión y con que metodo inicio sesión
                    navigate("/", {replace: true});
                } else throw Error("Error");
            } catch (error) {
                customAlert("Iniciar sesión",
                "Usuario y/o contraseña incorrectos",
                'info'
                );
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-md text-wrap">
                    <p className='flex justify-center items-center p-4 font-bold text-xl'>Inicio de sesión</p>
                    <form className="flex max-w-md w-full flex-col gap-4" onSubmit={formik.handleSubmit} noValidate>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Usuario:" />
                            </div>
                            <TextInput
                                id="email1"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  //Indica si ya se interactuo con el input
                                helperText={
                                    formik.errors.username && formik.touched.username ?
                                        (<span className='text-red-600'>{formik.errors.username}</span>) : null
                                }
                                type="email"
                                placeholder="name@gmail.com"
                                required />
                        </div>
                        <div className='mb-5'>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Contraseña:" />
                            </div>
                            <TextInput
                                id="password1"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={
                                    formik.errors.password && formik.touched.password ?
                                        (<span className='text-red-600'>{formik.errors.password}</span>) : null
                                }
                                type="password"
                                required />
                        </div>
                        <Button gradientDuoTone="greenToBlue" className="mt-5" type="submit" disabled={formik.isSubmitting || !formik.isValid}>
                            {
                                formik.isSubmitting ? (<Spinner />) : (<>
                                    <svg className="w-6 h-6 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                                    </svg>
                                    <p className='text-lg'>Iniciar</p>
                                    
                                </>)
                            }
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignInPage