/*
    {
        notes: [], //es un arreglo donde se almacenarás todas las notas
        active: null, //si no hay nota seleccionada para mostrar esta será null
        active: {
            //si se selecciona una nota se debe mostrar lo siguiente en la pantalla
            id: 'ADASLDLKWLQW334',
            title: '',
            body: '',
            imageUrl: '',
            date: 123443
        }
    }

*/

import { types } from "../tytpes/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action ) => {
    switch (action.type) {
        case types.notesActive :
            return {
                ...state,
                active: {
                    //esto es lo mismo que id: action.payload.id, title: action.payload.title, body: action.payload.body todo lo que se mande en al payload
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            }
                

            //reducer para cuando se necesita cargas las notes desde la BD
        case types.notesLoad:
            return {
               ...state,
               notes: [...action.payload] 
            }

            //acción para actualizar la nota que se haya actualizado el usuario, y se muestre el cambio en el panel izquierdo
        case types.notesUpdate:
            return {
                ...state,
                //el campo de notes se le asigna la nota que ha sido modificada
                //de las notas que se tienen en el state hacemos un recorrido hasta encntrar la nota que tiene el mismo id de la que ha sido modifica, y con el map regresamos un nuevo arreglo con la nota encontrada nadamas
                //una vez que la encontró, nota ahora tendra esos valores de la nota actualizada
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }
        
        case types.notesDelete:
            return {
                ...state,
                //como  la nota se va a elimimnar tenemos que quitar el active, con todos los datos
                active: null,
                //con el filter lo que hacemos es que nos filtré y nos regrese todas las notas
                //que sea diferentes al id que se requiere eliminar
                notes: state.notes.filter( note => note.id !== action.payload)
            }
        
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }
        

        default:
            return state;
    }
}