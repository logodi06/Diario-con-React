import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import  validator  from 'validator';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    //treaemos el dispatch para poder implementarlo con nuestra acción a ejecutar
    const dispatch = useDispatch();

    //el useSelector va a disparar un callback en el cual se tiene el state  
    //en este caso el state de los errores del uiReducer
    //del state solo se requiere lo del ui, porque tambien muestra auth
    //le decimos state.ui para regresar solo eso y desestructuramos solo el msgError
    const {msgError} = useSelector( (state) => state.ui );
    console.log(msgError);



    const [formValues, handleInputChange, reset] = useForm({
      name: 'Lorena',
      email: 'lore@gmail.com',
      password: '123456',
      password2: '123456'
    });

    const {name, email, password, password2} = formValues;


    const handleRegister = (e) =>{
     e.preventDefault();
      //console.log(name, email, password, password2);

      if(isFormValid()) {

        dispatch(startRegisterWithEmailPasswordName(email, password, name));
        console.log('Formulario correcto');
      }
    }

    const isFormValid = () => {
      if(name.trim().length === 0){
        //console.log('Name is required');
        //se manda el dispatch con setError el cual se encuentra en la carpeta actions dentro de ui.js, así se declaran las funciones de las acciones
        dispatch(setError('Name is required'));
        return false;
      } else if( !validator.isEmail(email)) {
        //console.log('Email is not valid');
        dispatch(setError('Email is not valid'));
        return false;
      } else if( password !== password2 || password.length < 5 ){
        //console.log('Password not are the same');
        dispatch(setError('Password not are the same'));
        return false;
      }
      dispatch(removeError());
      return true;
    }

  
    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(password2);


  return (
    <>
    <h3 className='auth__title'>Register</h3>
    <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>

     {
       //el  mensaje de error se va a mostrar si es diferente de null
        msgError && 
        (
          <div className="auth__alert-error">
            {msgError}
          </div>
        )
      }

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
