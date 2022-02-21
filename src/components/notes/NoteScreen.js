import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        <NotesAppBar />

        <div className='notes__content'>
            <input type="text" placeholder='Some awesome title' className='notes__title-input' autoComplete='off'/>

            <textarea placeholder='What happened today?' className='notes__textarea'></textarea>

            <div className='notes__image'>
                <img alt='imagen' src='https://1.bp.blogspot.com/-p03I5mOC9e0/YPr1qBEGrLI/AAAAAAAAF0k/C1GPnfWpRNoLyO4iZ7D43fso9Xhfh_qzwCLcBGAsYHQ/s672/Screenshot_20210723-175118_1.png' />
            </div>
        </div>
    </div>
  )
}
