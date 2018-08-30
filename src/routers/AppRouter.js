import React from 'react';
import { Route, BrowserRouter , Switch} from 'react-router-dom';
import NotesDashBoardPage from '../components/NotesDashBoardPage';
import Login from '../components/Login';
import Header from '../components/Header';



const NotFoundPage = () => (<div>NOTFOUNDPAGE</div>);
                            
                            
export default  () => (
  <BrowserRouter>
    <div>
    <Header/>
      <Switch>
        <Route path="/" component={Login} exact={true} />
        <Route path="/:id" component={NotesDashBoardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)
                            





