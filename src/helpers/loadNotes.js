import { db } from "../firebase/firebaseConfig"

export const loadNotes = async ( uid ) => {
    //con el metodo get traemos la información que se tiene en la BD
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    //recorremos el resultado de lo que se trae en la BD
    notesSnap.forEach((snapHijo) => {
            //console.log(snapHijo.data(), snapHijo.id);
            //agregamos a nuestro arreglo esos datos de las notas que estan en la BD
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        });
    });
    
  
    
    console.log(notes);

    return notes;

}

