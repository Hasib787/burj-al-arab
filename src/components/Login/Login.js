import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';


const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        < form className="login-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" ref={register({ required: true })} placeholder ="Your name" />
            { errors.name && <span className="error">Name is required</span>}

            < input name="email" ref={register({ required: true })} placeholder ="Your email" />
            { errors.email && <span className="error">Email is required</span>}

            < input name="password" ref={register({ required: true })} placeholder ="Your password" />
            { errors.password && <span className="error">Password is required</span>}

            <input type="submit" />

           <div>
            <button>Sign In With Google</button>
            <button>Sign In With Facebook</button>
            <button>Sign In With Twitter</button>
            </div>

        </form >
    );
};

export default Login;