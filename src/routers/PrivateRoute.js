import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom'


export const PrivateRoute = ( {
    isAuthenticated,
    component: Component,
    ...rest 
}) => {

    return (
        <Route {...rest }
            component={(props) => (
                (isAuthenticated)
                 //si esta autenticado se deja pasar a la ruta que quiere 
                    ?(<Component {...props } />)
                    //si no esta autenticado lo redicciona al login
                    :(<Redirect to='/auth/login'/>)
            )}
             />
    )
}