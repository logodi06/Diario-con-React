import React from 'react'
import  moment  from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';


export const JournalEntry = ({id, date, title, body, url}) => {

    const noteDate = moment(date);
    
    const dispatch = useDispatch();
    //console.log(id, date, title, body, url)

    const handleEntryClick = () => {
        //dispatch manda la acción de activar la nota para mostrarla 
        dispatch(
            activeNote(id, {
                date,title,body, url
            })
        );
        //console.log("diste  click nota");
    }

  return (
    <div className='journal__entry pointer animate__animated animate__fadeIn animate__faster' onClick={handleEntryClick}>

        {
            //si el url es diferente de undefined entonces que lo muestre
            url &&
            <div className='journal__entry-picture' style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${url})`
            }}> 
            </div>
        }

        <div className='journal__entry-body'>
            <p className='journal__entry-title'>{title}</p>

            <p className='journal__entry-content'>
                {body}
            </p>
        </div>
        <div className='journal__entry-date-box'>
            <span> { noteDate.format('dddd') } </span>
            <h4>{ noteDate.format('Do') }</h4>
        </div>
    </div>
  )
}
