import React from 'react'
import { Link } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import  validator  from 'validator';

export const RegisterScreen = () => {

    const [formValues, handleInputChange, reset] = useForm({
      name: 'Lorena',
      email: 'lore.gomez@gmail.com',
      password: '123456',
      password2: '123456'
    });

    const handleRegister = (e) =>{
     e.preventDefault();
      console.log(name, email, password, password2);

      if(isFormValid()) {
        console.log('Formulario correcto');
      }
    }

    const isFormValid = () => {
      if(name.trim().length === 0){
        console.log('Name is required')
        return false;
      } else if( !validator.isEmail(email)) {
        console.log('Email is not valid');
        return false;
      } else if( password !== password2 || password.length < 5 ){
        console.log('Password not are the same');
        return false;
      }

      return true;
    }

    const {name, email, password, password2} = formValues;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(password2);


  return (
    <>
    <h3 className='auth__title'>Register</h3>
    <form onSubmit={handleRegister}>

      <div className="auth__alert-error">
          Hola mundo
      </div>

      <input onChange={handleInputChange} value={name} type="text" placeholder="Name" name="name" className="auth__input" autoComplete="off"/>
      <input onChange={handleInputChange} value={email} type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off"/>
      <input onChange={handleInputChange} value={password} type="password" placeholder="Password" name='password' className='auth__input'/>
      <input onChange={handleInputChange} value={password2} type="password" placeholder="Confirm password" name='password2' className='auth__input'/>


      <button className='btn btn-primary btn-block mb-5' type="submit"  >Register</button>

        <Link className='link mt-5' to="/auth/login">
          Already register?
        </Link>
        
    </form>
  </>
  )
}
