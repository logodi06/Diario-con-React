import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

  //se extrae notes  const notes = useSelector( state => state.notes );
  const { active } = useSelector( state => state.notes );
  //
  //console.log(notes)

  return (
    <div className="journal__main__content animate__animated animate__fadeIn animate__faster">
        <Sidebar />

        <main>
          {
            //Si hay una nota seleccionada, debe mostrar información de la nota, si no solo la pantalla de que no hay nada
            (active) ? (<NoteScreen />) : (<NothingSelected />)
              
          }
          {/* <NothingSelected /> */}
        
        </main>


    </div>
  )
}
