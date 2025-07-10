import {Routes, Route, Navigate} from 'react-router-dom';
import Welcome from './components/Welcome';
import Products from './components/Products';
import MainHeader from './components/MainHeader';
import ProjectDetails from './components/ProductDetails';
import LoginDetails from './components/login/LoginDetails';
import LoginPage from './components/login/LoginPage';
import ProfilePage from './components/login/ProfilePage';
import ForgotPasswordPage from './components/login/ForgotPasswordPage';
import AuthContext from './store/AuthContext';
import { useContext } from 'react';


function App() {

  const Authcnt  = useContext(AuthContext);
  console.log(Authcnt.isLogin);
  
  return (
    <div>
      <MainHeader/>
          <Routes> 
            <Route path="/" element={<Navigate to="/welcome" replace/>} exact></Route>
            <Route path="/welcome" element={<Welcome/>}></Route>
            <Route path="/products" element={<Products/>}></Route>
            <Route path="/products/:productId" element={<ProjectDetails/>}></Route>
            <Route path ="/login/:student" element={<LoginDetails/>}/>
            <Route path="/login" element ={<LoginPage/>} />
            <Route path="/profilepage" element={Authcnt.isLogin ? <ProfilePage /> : <Navigate to="/login" replace />}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>

    </div>
  );
};


export default App;
