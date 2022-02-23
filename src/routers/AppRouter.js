import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

  import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    //estado local para saber si el usuario está logueado no, si no esta logueado mandarlo al auth
    //si esta logueado mandarlo al JournalSCreen. Esto es porque como se carga rápido, las rutas 
    //no sabrían cual mostrar puesto que se tiene que esperar a que el dispatch en el useEffect mande una respues si esta o no autenticado
    //el setchecking va a cambiar el estado a falso, cuando se tenga una respuesta deespues del dispatch
    //esto sirve para poder mostrar algo mientras esta cargando la info
    const [checking, setchecking] = useState(true)

    //useState para tener una condición del estado si está logueado o no de acuerdo al checking
     //el isLoggedIn es la variable que nos ayudará en las rutas para saber si está o no logueado
    const [isLoggedIn, setIsLoggedIn] = useState(false)

  //useEffect para saber cuando algo dentro dentro de la autenticación cambio (logout)
  useEffect(() => {
    //esto crea un observable que es un tipo especial que se puede disparar más de una vez,
    //es decir cuando la autenticación cambia se dispara, cuando se autentica se dispara, cuando hace logout se dispara
     firebase.auth().onAuthStateChanged((user) => {

      //el signo de ? evalua si el objeto user tiene algo, entonces pregunta si existe el uid 
      //si no existe, el user es null y automáticamente se va a salir.
        if(user?.uid) {
          dispatch(login(user.uid, user.displayName)); 

          //si esta a esta condición se pone que esta logueado de forma correcta con el setIsLoggedIn
          setIsLoggedIn(true);
        }else {
          //en caso de que no este autenticado
          setIsLoggedIn(false)
        }
        setchecking(false);
     });
   
  }, [dispatch, setchecking, setIsLoggedIn])
  
  //si el checking ya esta false significa que ya tiene respuesta por lo tanto
  if(checking){
      //si checking esta en true se hace el return de un nuevo objeto 
      return (
        //se puede colocar una pantalla que diga loginScreen mientras se esta autenticando, se puede poner
        //cualquier componente, un circulo que este girando y simule que esta cargando etc..
      <h1>Espere...</h1>
      )
  }
  return (
      <Router>
       <div>
            <Switch>
                <PublicRoute isAuthenticated={isLoggedIn} path="/auth" component={AuthRouter}
                />
                {/* declaración de ruta privada poniendo la condición si esta autenticado o no */}
                <PrivateRoute exact isAuthenticated={isLoggedIn} path="/" component={JournalScreen}
                />
                {/* Si en la busqueda se coloca otro path que no sea ninguno de esos 2
                automáticamente lo redireccionará al auth/login */}
                <Redirect to="/auth/login" />
                    
            </Switch>
        </div>
    </Router>
  )
}
