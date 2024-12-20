import './App.css';
import {useState, useEffect} from 'react'
import {Container} from "./component/views/Container";
import {Home, Public, Login, Register, RoleSelection} from "./containers/public/index";
import {ProductManager, HomeAdmin, OrderManager, UserManager, Sale} from "./containers/system/index";
import {Routes, Route} from "react-router-dom";
import {path} from './ultis/path';
import {ToastContainer} from "react-toastify";
import {DetailProduct} from "./containers/public/product/DetailProduct";
import {ProductList} from "./containers/public/product/ListProduct";
import NotFound from "./containers/public/NotFound";
import {ProductNew} from "./containers/public/product/ProductNew";
import {ProductSale} from "./containers/public/product/ProductSale";
import {CheckoutPage} from "./containers/public/product/CheckoutPage";


function App() {
  return (
      <>
        <div className="App">
          <Routes>
            <Route path="/role-selection" element={<RoleSelection />} />
            {/*<Route path="/detail-product" element={<DetailProduct/>} />*/}
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.REGISTER} element={<Register />} />
            <Route path={path.PUBLIC} element={<Public />}>
              <Route path={path.HOME} element={<Container/>} />
                <Route path={path.PRODUCT_LIST} element={<ProductList/>} />
                <Route path={path.PRODUCT_DETAIL} element={<DetailProduct/>} />
                <Route path={path.PRODUCT_NEW} element={<ProductNew/>} />
                <Route path={path.PRODUCT_SALE} element={<ProductSale/>} />
                <Route path={path.CHECKOUT} element={<CheckoutPage />} />
                <Route path='*' element={<NotFound/>}/>
            </Route>

            <Route path={path.ADMIN} element={<HomeAdmin />}>
                <Route path={path.ADMIN_PRODUCT} element={<ProductManager />} />
                <Route path={path.ADMIN_ORDER} element={<OrderManager />} />
                <Route path={path.ADMIN_USER} element={<UserManager />} />
                <Route path={path.ADMIN_SALE} element={<Sale />} />
            </Route>

          </Routes>
            <ToastContainer />
        </div>
      </>
  );
}

export default App;
