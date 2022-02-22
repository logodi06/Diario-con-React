import React from 'react'

//El provide cumple lo mismo que se hacia con el context, el cual proveia información a toda 
//nuestra aplicación
import { Provider } from "react-redux";
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter'

export const JournalApp = () => {
  return (
    <Provider store = { store }>
       <AppRouter />
    </Provider>
  )
}
