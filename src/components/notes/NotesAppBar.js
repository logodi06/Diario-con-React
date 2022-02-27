import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );

  const handleSave = () => { 
    //console.log(active);
    dispatch(startSaveNote( active ));
    console.log('Update success');
  }


  const handlePictureClick = () => {
    console.log('picturee');
    document.querySelector('#fileSelector').click();
  }

  //Para seleccionar una imagen
  const handleFileChange =  (e)  => {
    //aqui se encuentra la imagen que se requiere subir
      console.log(e.target.files)
    const file = e.target.files[0];
    if(file){
      dispatch(startUploading(file));
    }
  }

  return (
    <div className='notes__appbar'>
        <span>28 de agosto 2022</span>

        <input type='file' id='fileSelector' name='file' style={{ display: 'none' }} onChange={ handleFileChange }/>

        <div>
            <button className='btn' onClick={handlePictureClick}>Picture</button>
            <button onClick={handleSave} className='btn'>Save</button>

        </div>
    </div>
  )
}
