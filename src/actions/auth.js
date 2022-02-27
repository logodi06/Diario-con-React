//alertas para mostrar al usuario si algo pasa, error, success
import Swal from 'sweetalert2' 

import { types } from "../tytpes/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from './notes';

//Iniciar sesión con Email y Password
//hacer una función que es asincrona  asincrona 
export const startLoginEmailPassword = (email, password) => {
    return(dispatch) => {

        //dispatch que ejecuta la acción de bloquer el boton mientras se autentica
        dispatch(startLoading());

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( ({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );

                //dispatch que ejecuta la acción de desbloquear el btn cuando ya terminó de autenticar
                dispatch(finishLoading());
            }).catch(e => {
                
                //dispatch que ejecuta la acción de desbloquear el btn cuando se haya producido un error
                dispatch(finishLoading());
                console.log(e);

                //si ocurre un error aquí se muestra la alerta de swal
                //Swal.fire( 'Error', 'Email o Contraseña incorrecta', 'error');
                Swal.fire( 'Error', e.message, 'error');

            })
       // dispatch(login(email, password))
    //    setTimeout(() => {
    //        dispatch(login(123, 'lorr'))
    //    }, 3500); 
    }
}

//iniciar el registro con email, password y name
export const startRegisterWithEmailPasswordName = ( email, password, name) => {
     //como esta acción es asíncrona, se necesita realizar o retornar un callback

     //gracias al redux thunk se puede tener acceso al dispatch
     return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
                 //para que podamos modificar el displayName que aparece como null, porque el createUserWithEmailandPassword
                 //solo nos da el email y el password pero no el displayname, ese displayName solo se puede obtener de alguna
                 //red social (face, instagram, etc)
                 //como esto regresa una promesa se podría seguir poniendo then y así, pero para eso ocupamos el async y await
                 //para esperar que se haga la actualización
                await user.updateProfile({ displayName: name})

                //console.log(user)
                //el dispatch es para que ridux o la store sepan cual es el usuario y name del usario
                dispatch(
                    login(user.uid, user.displayName)
                )
            }  )
            .catch(e => {
                console.log(e);
                Swal.fire( 'Error', e.message, 'error');
            })
     }
}


//Iniciar sesión utilizando cuenta de google
export const startGoogleLogin = () => {
    //el return recibe el dispatch el dispatch
    return (dispatch) => {
        //para proveer los valores que se reciben cuando se autentica con google
        //googleAuthProvider proviene del firebaseConfig
        firebase.auth().signInWithPopup(googleAuthProvider)
        //de toda información que se recibe, solo queremos la información del usuario que se autentico
        //por eso solo desestructuramos user
            .then(({user}) => {
                //Aquí se lanza el dispatch con la acción que se va a mandar, en este caso el login
                dispatch(
                    login(user.uid, user.displayName)
                );
                //console.log(user);
            });
    }
}

 //esta es la acción que se va allamar cuando se tenga el uid y displayName
 //acción que se manda en el dispatch
 export const login = (uid, displayName) => ({   
     //lo que  quiere decir que la función simplemente regresa un objeto que tiene esas especificaciones
        type: types.login,
        payload: {
            uid,
            displayName
        }
 });

 //como el return solo regresa ese objeto lo podemos hacer un poco mas corto como el de arriba
//  export const login = (uid, displayName) => {
//      return {
//          type: types.login,
//          payload: {
//              uid,
//              displayName
//          }
//      }
//  }

//acciones para el logout
//la primera tiene que ser asincrona porque en la parte de firebase tiene que ser disparada y ejecutar el logout
//con una instrucción de firebase que regresa una promesa
export const startLogout = () => {
    //para esperar que esto se ejecute se coloca el async y el await
    return async ( dispatch ) => {
        //función de firebase para cerrar la autenticación
        await firebase.auth().signOut();
        
        //una vez que se ejecuta se lanza el dispatch
        dispatch( logout() );
        //acción que al cerrar sesión coloque las notas en [] vacias en la store porque no debe tener guardadas niguna
        //asi mismo también se debe poner el active en null
        dispatch(noteLogout());
    } 
}

//acción que va a borar el displayName y el uid del store
export const logout = () => ({
    type: types.logout
});