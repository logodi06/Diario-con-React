import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator  from 'validator';

export const LoginScreen = () => {
  
  //para  poder hacer un dispatch, ya redux genero un hook llamada useDispatch
  //el useDispatch lo que hace es darle acceso al dispatch, el cual sirve para hacer dispatch de acciones
  const dispatch = useDispatch();
  
  //el use selector sive para extrar los valores del state de uiReducer
  const { loading } = useSelector( state => state.ui );


  //en los input hay que colocar le onChange y los value con los valores obtenidos del useForm
  const [formValues, handleInputChange, reset]= useForm({
    email: 'lore@gmail.com',
    password: '123456'
  });

  const {email, password} = formValues;

  //se maneja el submit del formulario
  const handleLogin = (e) => {
    e.preventDefault();
    //se crea el startLoginEmailPassword para que sea una función que se resuelve de forma sincrona, 
    //y así despues poder mandarla en este dispatch
    dispatch(startLoginEmailPassword(email, password));
  }

  const handleGoogleLogin = () => {
    //lanza el dispatch con la función de startGoogleLogin, la cual viene de los actions auth
    dispatch(startGoogleLogin())
  }

  

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster'>
        <input onChange={handleInputChange} value={email} type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off"/>
        <input onChange={handleInputChange} value={password} type="password" placeholder="Password" name='password' className='auth__input'/>

        <button className='btn btn-primary btn-block' type="submit" disabled={loading} >Login</button>

          <div className='auth__social-networks'>
              <p>Login with social networks</p>

              <div className="google-btn" onClick={handleGoogleLogin}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
              </div>
          </div>

          <Link className='link' to="/auth/register">
            Create a new account
          </Link>
          
      </form>
    </>
  )
}
