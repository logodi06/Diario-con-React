import { db } from "../firebase/firebaseConfig";
import Swal from 'sweetalert2' 

import { loadNotes } from "../helpers/loadNotes";
import { types } from "../tytpes/types";
import { fileUpload } from "../helpers/fileUpload";

//react-journal

export const startNewNote = () => {
    //getState función para llamar el State
     return async (dispatch, getState) => {
      
        //usamos el getState para poder traer todos los datos del state, extraemos solo el id del usuario que es lo que  nos intereesa
        const uid = getState().auth.uid;
        //console.log(uid)

        //se crea una nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        //utilizamos la referencia a la BD la cual esta en firebaseConfig
        //utilizamos senteencias para firebase, para estructurar la colección, el documento, el journal, notes
        //como el docRef (doc) regresa una promesa podemos utilizar el async y el await
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        //console.log(doc)
        dispatch(activeNote(doc.id, newNote));
        //acción para agregar la nueva nota al store
        dispatch(addNewNote( doc.id, newNote ));
     }
}

//función para que al agregar una nota, esta la guarde en la store y se pueda mostrar en el sidebar izquierdo
export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    } 
});

//creamos una acción sincrona, sincrona porque como ya se tiene la información creada en la bd se le va 
//a mandar algo al notesReducer
export const activeNote = (id, note ) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

//recibe el id de usuario para saber que notas debe cargar para el store
export const startLoadingNotes = ( uid ) => {
    return async ( dispatch ) => {
        //aquí es donde se van a cargas las notas en base a ese uid recibido
        const notes = await loadNotes( uid ); 
        dispatch(setNotes(notes));
    }
}

//se crea un nueva acción de las notas que se tiene el usuario para almacenarlas en la store
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    //esto es una tarea asincrona
    //el getState se utiliza para obtener el id del usuario
    return async (dispatch, getState) => {
        
        //usamos el getState para poder traer todos los datos del state, extraemos solo el id del usuario que es lo que  nos intereesa
        const uid = getState().auth.uid;

        if( !note.url ){
            delete note.url;
        }

        //para insertar los cambios en la bd de firestore, no necesitamos agregar el id de la nota, por lo tanto se hace un clon de la nota y se guarda en una nueva variable
        //por lo tanto tenemos que evitar enviarlo, haciendo el delete del id
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        //actualizamos la nota del usuario con los nuevos valores,  esto en la BD
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore )

        dispatch(refreshNote( note.id, noteToFirestore ));
        Swal.fire( 'Saved', note.title, 'success');

    }
}

//acción para refrescar los cambios que se modificaron, al darle guardar los cambios se deben reflejar
//en el panel del izquierdo donde esta la lista de las notas, pero solo se debe refrescar la nota que ha sido modificada no todas
export const refreshNote = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        //como necesitamos que la nota tenga su id y esta por defecto no lo tiene
        //se lo agregamos como un campo id que es de donde obtener  ese id de la nota
        note: {
            id,
            ...note
        }
    }
});

//archivo a subir acción, tarea asíncrona
export const startUploading = ( file ) => {
    return  async ( dispatch, getState ) => {
        //const activeNote = getState().notes.active;
        //esto es lo mismo que lo de arriba pero escrito diferente
        const { active:activeNote } = getState().notes;

        //muestra una ventana de cargando, y esto debe ser mientras se carga la img
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
            // onBeforeOpen: () => {
            //     Swal.showLoading();
            // },
        });

        //se crea un helper que ayude a la subida del archivo de la imagen
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        //console.log(fileUrl);

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
}

//acción de eliminar una nota
export const startDeleting = ( id ) => {
    return async (dispatch, getState) => {

        const uid = getState().auth.uid;
        //eliminar una nota en la BD
        await db.doc(`${uid}/journal/notes/${ id }`).delete();

        dispatch(deteleNote( id ));
    }
};

//acción que va a modificar el store al elminar una nota, esta acción es sincrona porque ya teniendo los
//datos solo se va a modificar en la store pero lo asincrono lo hizo la de arriba
export const deteleNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});
