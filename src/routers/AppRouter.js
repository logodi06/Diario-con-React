import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';


export const AppRouter = () => {
  return (
      <Router>
       <div>
            <Switch>
                <Route path="/auth" component={AuthRouter}
                />

                <Route exact path="/" component={JournalScreen}
                />
                {/* Si en la busqueda se coloca otro path que no sea ninguno de esos 2
                automáticamente lo redireccionará al auth/login */}
                <Redirect to="/auth/login" />
                    
            </Switch>
        </div>
    </Router>
  )
}
