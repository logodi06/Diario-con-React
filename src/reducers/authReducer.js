import { types } from "../tytpes/types";

/* {
    uid: ja12sadalsdad,
    name: 'Lorena'
}
*/

// const initalState = {
//     uid: 1234,
//     name: 'Lor',
//     dir: {
//         b:12
//     }
// }

//es importante inicializar el state
export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return {  }
    
        default:
            return state;
    }
}