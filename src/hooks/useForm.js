import React, { useState } from 'react';

export const useForm = (initialState = {}) => {
     const [values, setvalues] = useState(initialState);

      //aquí se recibe el nuevo estado del formulario => newFormState
      //con eso newFormState se pueden establecer los valores que nostros queramos en el formulario
     const reset = ( newFormState = initialState) => {
       setvalues( newFormState );
     }


     const handleInputChange = ({target}) => {
       
        setvalues( {
         ...values,
           [target.name]: target.value
       });
      }
    
      return [values, handleInputChange, reset];
};