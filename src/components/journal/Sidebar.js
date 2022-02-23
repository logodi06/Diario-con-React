
import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  //para poder usar el dispatch
  const dispatch = useDispatch();
  
  //cerrar sesión al presionar el boton de logour
  const handleLogout = () => {
      //se ejecuta el dispatch de startLogout
      dispatch(startLogout())
  }

  return (
    //   Indica que esto esá en un costado
    <aside className="journal__sidebar">
         <div className="journal__sidebar-navbar">
            <h3 className="mt-5">
                <i className='far fa-moon'></i>
                <span> Lorena</span>
            </h3>

            <button onClick={handleLogout} className='btn'>Logout</button>
         </div>

        <div className="journal__new-entry">
            <i className="far fa-calendar-plus fa-5x"></i>
            <p className='mt-5'>New entry</p>
        </div>

        <JournalEntries />

    </aside>
  )
}
