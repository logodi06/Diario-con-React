import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom'


export const PublicRoute = ( {
    isAuthenticated,
    component: Component,
    ...rest 
}) => {

    return (
        <Route {...rest }
            component={(props) => (
                (isAuthenticated)
                //si está autenticado debe redirrecionar al journalscreen que este caso es la raiz /
                ? (<Redirect to='/'/>)
                //si quiere acceder a una ruta pública lo deja pasar 
                : (<Component {...props } />)

            )}
             />
    )
}