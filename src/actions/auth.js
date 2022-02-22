import { types } from "../tytpes/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";

//hacer una función que es asincrona  asincrona 
export const startLoginEmailPassword = (email, password) => {
    return(dispatch) => {
       setTimeout(() => {
           dispatch(login(123, 'lorr'))
       }, 3500); 
    }
}


export const startGoogleLogin = () => {
    //el return recibe el dispatch el dispatch
    return (dispatch) => {
        //para proveer los valores que se reciben cuando se autentica con google
        //googleAuthProvider proviene del firebaseConfig
        firebase.auth().signInWithPopup(googleAuthProvider)
        //de tola información que se recibe, solo queremos la información del usuario que se autentico
        //por eso solo desestructuramos user
            .then(({user}) => {
                //Aquí se lanza el dispatch con la acción que se va a mandar, en este caso el login
                dispatch(
                    login(user.uid, user.displayName)
                )
                console.log(user);
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