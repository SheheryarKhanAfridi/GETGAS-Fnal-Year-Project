import React , {useState} from 'react';
import Nav from './Component/Navbar.jsx';
import Home from './Component/Home.jsx';
import About from './Component/About.jsx'; 
import Contact from './Component/Contact.jsx'; 
import Login from './Component/Login.jsx'; 
import { Route, Routes } from 'react-router-dom';
import Register from './Component/Register.jsx';
import Footer from './Component/Footer.jsx';
import Error from './Component/Error.jsx'
import Account from './Component/Account.jsx';
import Signout from './Component/Signout.jsx';
import Order from './Component/Order.jsx';
import Shop from './Component/Shop.jsx';
import VendorForm from './Component/VendorForm.jsx';
import VendorLogin from './Component/VendorLogin.jsx';
import VendorLoginPage from './Component/VendorLoginPage.jsx';
import VendorHome from './Component/VendorHome.jsx';
import NAV from './Component/NAV.jsx';
import ViewOrder from './Component/ViewOrder.jsx';
import PlaceOrder from './Component/PlaceOrder.jsx';
import ViewOrderCard from './Component/ViewOrderCard.jsx';
import EditShop from './Component/EditShop.jsx';
import Ohistory from './Component/Ohistory.jsx';
import Example from './Component/Example.jsx';
import HistoryCard from './Component/HistoryCard.jsx';
import Inspection from './Component/Inspection.jsx';
import HistoryDeatils from './Component/HistoryDeatils.jsx';
import Admin from '../src/Admin/Admin.jsx';
import AdminHome from './Admin/AdminHome.jsx'
import InspectionAdmin from './Admin/InspectionAdmin.jsx';
import InspectionDetailsAdmin from './Admin/InpectionDetailsAdmin.jsx'
import QueryAdmin from './Admin/QueryAdmin.jsx';
import UserDetailsAdmin from './Admin/UserDetailsAdmin.jsx';
import ShopDetailsAdmin from './Admin/ShopDetailsAdmin.jsx';
import InspectionDeatilsUser from './Component/InspectionDeatilsUser.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [VendorLoginCheck, setVendorLoginCheck] = useState(false)

  const handleVendor=()=>{
    if(VendorLoginCheck===false){
      setVendorLoginCheck(true)
    }
    else{
      setVendorLoginCheck(false)
    }
  }

  const toggleLogin = () => {
    console.log(isLoggedIn,'app.jsx')
    if(isLoggedIn==false){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
    console.log(isLoggedIn,'app.jsx')
  };

  return (
    <div >
      <Routes>
        {isLoggedIn?<>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/placeorder' element={<PlaceOrder/>} />
    <Route path='/OrderCard' element={<ViewOrderCard/>}/>
    <Route path='/orderhistory' element={<Ohistory/>}/>
    <Route path='/InspectionCheck' element={<InspectionDeatilsUser/>}/>
    <Route path='/inspection' element={<Inspection/>}/>
    <Route path='/historyDetails' element={<HistoryDeatils/>}/>
    <Route path='/Account' element={<Account />} />
    <Route path='/Order' element={<Order />} />

        </>:
        <>
    <Route path='/*' element={<Error />} />
        </>}
        {VendorLoginCheck?
        <>
    <Route path='/Shop' element={<Shop/>} />
    <Route path='/VendorForm' element={<VendorForm/>} />
    <Route path='/vendorhome' element={<VendorHome/>} />
    <Route path='/vieworder' element={<ViewOrder/>} />
    <Route path='/EditShop' element={<EditShop/>}/>
        </>:
        <>
    <Route path='/*' element={<Error />} />
        
        </>}
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={< About/>}/>
    <Route path='/Login' element={<Login toggleLogin={toggleLogin} />} />
    <Route path='/*' element={<Error />} />
    <Route path='/Register' element={<Register/>}/>
    <Route path='/signout' element={<Signout />} />
    <Route path='/vendorLoginPAGE' element={<VendorLoginPage handleVendor={handleVendor}/>} />
    <Route path='/vendorlogin' element={<VendorLogin/>} />
    
    <Route path='/OH' element={<HistoryCard/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/AdminHome' element={<AdminHome/>}/>
    <Route path='/inspection-request-admin' element={<InspectionAdmin/>}/>
    <Route path='/InspectionDeatils-Admin' element={<InspectionDetailsAdmin/>}/>
    <Route path='/QueryAdmin' element={<QueryAdmin/>}/>
    <Route path='/HnadleUserDetailsAdmin' element={<UserDetailsAdmin/>}/>
    <Route path='/ShopDetailsAdmin' element={<ShopDetailsAdmin/>}/>
    <Route path='/AllOrderAdmin' element={<ShopDetailsAdmin/>}/>
   

  </Routes>
  <Footer/>
    </div>
  );
}

export default App;
