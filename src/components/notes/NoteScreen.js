import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  //de  todas las notas que tengo en el store, solo me interesa la nota activa
  //se renombra la nota activa por note
  const { active: note } = useSelector( state => state.notes );
  //console.log(note);


  //el useForm recibe el argumento en el cual se deberia tener los campos del formulario 
  //en este caso se puede mandar note porque esa ya tiene los campos que se necesitan
  const [formValues, handleInputChange, reset ] = useForm( note );

  //console.log(formValues);
  const { title, body, id } = formValues;

  //creamos una variable que guarde el id que se tiene seleccionado
  const activeId = useRef( note.id )
  
  /******************************************* */
  //hay que tener cuidado porque este useEffect puede causar un ciclo infinito
  useEffect(() => {
    //esta acción solo se debe de ejecutar si y solo si el ID de la nota es diferente a la que se tenía seleccionada
    //caso contrario no se tienee que disparar
    if(note.id !== activeId.current){
      reset (note);
      activeId.current = note.id
    }

  }, [note, reset])
  
  //useEffect para ir modificando el store de acuerdo a lo que el usuario escriba
  useEffect(() => {
    //cada que el valor del form cambio se hace un dispatch para actualizar la nota activa
    dispatch(activeNote(formValues.id, {...formValues}));
    
  }, [formValues, dispatch])
  
  const handleDelete = () => {
    dispatch(startDeleting( id ));
  }

  return (
    <div className='notes__main-content'>
        <NotesAppBar />

        <div className='notes__content'>
            <input 
              type="text" 
              name='title'
              placeholder='Some awesome title' 
              className='notes__title-input' 
              autoComplete='off'
              value={title}
              onChange={ handleInputChange }
            />

            <textarea 
              name='body'
              placeholder='What happened today?' 
              className='notes__textarea'
              value={body}
              onChange={ handleInputChange }
            ></textarea>

           { 
              (note.url) &&
              <div className='notes__image'>
                    <img 
                      alt='imagen' 
                      src={note.url} 
                    />
              </div>
            }
        </div>

        <button className='btn btn-danger' onClick={ handleDelete }>Delete</button>
      
    </div>
  )
}
