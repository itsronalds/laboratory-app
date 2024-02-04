import { Switch, Route, useLocation } from 'react-router-dom';
import Header from './../components/Header/Header';
import Home from './../routes/public/Home/Home';
import EmployeeLogIn from './../routes/public/EmployeeLogIn/EmployeeLogIn';
import AdminLogIn from './../routes/public/AdminLogIn/AdminLogIn';
import background from './../assets/image-1.jpg';

const publicRoutesBackground = {
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
};

const Public = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/admin/login' && (
        <Route path="/admin/login">
          <AdminLogIn />
        </Route>
      )}

      {pathname !== '/admin/login' && (
        <>
          <Header mode="public" />

          <div className="flex" style={publicRoutesBackground}>
            <div className="bg-black bg-opacity-75 w-full flex justify-center items-center">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>

                <Route path="/login">
                  <EmployeeLogIn />
                </Route>
              </Switch>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Public;
