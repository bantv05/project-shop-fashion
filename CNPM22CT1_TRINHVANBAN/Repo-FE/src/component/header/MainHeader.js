import {Link, useNavigate} from "react-router-dom";
import {path} from "../../ultis/path";
import CartOverlay from "../../containers/public/product/CartOverlay";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export const MainHeader = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const cartItems = useSelector((state) => state?.cart?.cartArr);
    const [isCartOpen, setCartOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const navigate = useNavigate();

    const handleDx = () => {
        navigate("/login");
    }

  return (
      <header className="main-header">
          <div className="w-full max-h-75">
              <div className="mx-5 flex items-center justify-between">
                  <div className="">
                      <a href="#"><img className="pl-10 h-20 w-auto"
                                       src="https://i.pinimg.com/736x/22/de/7e/22de7e34a7554c7818aeaf89e3d0ad29.jpg"
                                       alt="logo"/></a>
                  </div>
                  <div className="mx-3">
                      <div className="text-[15px]">
                          <ul className="flex items-center justify-center uppercase gap-6 font-semibold">
                              <li><Link to={path.HOME}>Trang chủ</Link></li>
                              <li><Link to={path.PRODUCT_NEW}>Hàng mới về</Link></li>
                              <li className="relative group z-5"><Link to={path.PRODUCT_LIST}>Sản phẩm</Link>
                                  <div className="absolute bottom-1 -right-3 hover:block">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                           className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                          <path fillRule="evenodd"
                                                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                                clipRule="evenodd"/>
                                      </svg>
                                  </div>
                                  <ul className="hidden group-hover:block absolute bg-white rounded-md left-0 p-3 pr-5 w-max z-50">
                                      <li className="py-1"><a href="#">EOSS Đầm</a></li>
                                      <li className="py-1"><a href="#">EOSS Áo</a></li>
                                      <li className="py-1"><a href="#">EOSS Váy</a></li>
                                      <li className="py-1"><a href="#">EOSS Quần</a></li>
                                      <li className="py-1"><a href="#">EOSS Bộ vest</a></li>
                                  </ul>
                              </li>
                              <li><a href="#">Bộ sưu tâm</a></li>
                              <li><a href="#">lady me</a></li>
                              <li className="relative group">
                                  <Link to={path.PRODUCT_SALE}>sale</Link>
                                  <div className="absolute bottom-1 left-11 hover:block ">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                           className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                          <path fillRule="evenodd"
                                                d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                                clipRule="evenodd"/>
                                      </svg>
                                  </div>
                                  {/*<ul className="hidden group-hover:block absolute bg-white rounded-md left-0 p-3 pr-5 w-max text-[14px] font-semibold z-50">*/}
                                  {/*    <li className="py-1 block"><a href="#">EOSS Đầm</a></li>*/}
                                  {/*    <li className="py-1 block"><a href="#">EOSS Áo</a></li>*/}
                                  {/*    <li className="py-1 block"><a href="#">EOSS Váy</a></li>*/}
                                  {/*    <li className="py-1 block"><a href="#">EOSS Quần</a></li>*/}
                                  {/*    <li className="py-1 block"><a href="#">EOSS Bộ vest</a></li>*/}
                                  {/*</ul>*/}
                              </li>
                              <li><a href="#">showroom</a></li>
                          </ul>
                      </div>
                  </div>
                  <div className="flex items-center justify-center p-5 w-max gap-5">
                      <a href="#">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                               className="size-6">
                              <path fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"/>
                          </svg>
                      </a>
                      <a href="#" onClick={toggleDropdown}>
                          {
                              user && <b className="absolute right-[175px] text-red-700">Hi, {user.name}</b>
                          }
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                               className="size-6">
                              <path fillRule="evenodd"
                                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                    clipRule="evenodd"/>
                          </svg>
                      </a>
                      <div>
                          <span className="absolute top-[62px] right-[52px] bg-red-600 p-2 rounded-full text-white text-[10px]">{cartItems.length}</span>
                          <button onClick={() => setCartOpen(true)}
                                  style={{background: "none", border: "none", cursor: "pointer"}}>
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6"
                              >
                                  <path
                                      fillRule="evenodd"
                                      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                                      clipRule="evenodd"
                                  />
                              </svg>
                          </button>

                          {isCartOpen && (
                              <CartOverlay onClose={() => setCartOpen(false)}/>
                          )}
                      </div>
                  </div>
                  {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white rounded-md w-48 z-10">
                          <ul>
                              <li>
                                  <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                      Hồ sơ
                                  </a>
                              </li>
                              <li>
                                  <a
                                      href="#"
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                      Bài viết
                                  </a>
                              </li>
                              <li>
                                  <p
                                      onClick={handleDx}
                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                      Đăng xuất
                                  </p>
                              </li>
                          </ul>
                      </div>
                  )}
              </div>
          </div>
      </header>
  )
}