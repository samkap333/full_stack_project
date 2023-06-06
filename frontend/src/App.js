import { Routes, Route } from 'react-router-dom';
import { useEffect , useState } from 'react';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AuthLayout from './components/Layouts/AuthLayout';
import PanelLayout from './components/Layouts/PanelLayout';
import LoanOffer from './pages/LoanOffer.js';
import LoanActivity from './pages/LoanActivity.js';
import Admin from './pages/Admin';
import PageNotFound from './pages/PageNotFound';
import AdminAddPage from './pages/AdminAddPage';
import AdminEditPage from './pages/AdminEditPage';
import Announcement from './pages/Announcement';
import Banner from './pages/Banner';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Wallet from './pages/Wallet';






function App() {
 
const [userTypeState , setUserTypeState] = useState('')

  let userType ;

  useEffect(() => {
      userType = localStorage.getItem('loggedInUserRole');
   
     

      
      

      
      //alert( userType)
      setUserTypeState(userType)
  }, []);
  

  
  
  

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route path="/" element={<SignIn/>} />
          <Route path="/login" element={<SignIn/>} />

        
         
        </Route>

        


        {userTypeState && userTypeState ==='Admin' ? 

        
        <Route path="/" element={<PanelLayout />}>
       
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/loanoffer" element={<LoanOffer />} />
            <Route path="/loanactivity" element={<LoanActivity />} /> 
            <Route path="/admin" element={<Admin />} />
            <Route path="/addadmin" element={<AdminAddPage />} />
            <Route path="/editadmin/:userId" element={<AdminEditPage />} />
            <Route path="/notify" element={<Announcement />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/connect-wallet" element={<Wallet />} />
           
 

          </Route>
         :
          <Route path="/" element={<PanelLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/loanactivity" element={<LoanActivity />} /> 
          <Route path="/loanoffer" element={<LoanOffer />} />
          
        

          <Route path="*" element={<PageNotFound />} />
        
          
        </Route>}

        
      </Routes>
    </>
  );
}

export default App;
