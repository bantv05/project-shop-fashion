import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../service/apiService";
import {toast} from "react-toastify";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const newUser = {
            email: username,
            password: password,
        }
        await loginUser(newUser, dispatch, navigate);

    }
  return (
      <div>
          <div className="relative flex justify-between items-center h-screen px-4 z-0 bg-cover"
               style={{
                   backgroundImage: "url('https://media.dau.edu.vn/Media/1_TH1057/FolderFunc/202411/Images/dh-kien-truc-web-20241122110208-e.png')",
                   backgroundSize: "cover",
                   backgroundPosition: "center",
                   filter: "blur(3px)",
               }}
          >
          </div>
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-DH-Kien-Truc-Da-Nang-DAU.png"
               alt="Logo DHKT"
               className="absolute left-4 top-4 w-1/6 z-10w-1/6 z-20"/>
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 z-50">
              <div className="container w-full bg-white rounded-xl px-9 py-6 mx-6 my-3">
                  <h1 className="text-blue-600 font-bold text-2xl text-center pb-6">Đăng nhập</h1>
                  <form className="max-w-sm mx-auto"
                    onSubmit={handleLogin}
                  >
                      <div className="mb-5">
                          <label htmlFor="email"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
                          <input type="email" id="email"
                                 onChange={(e) => setUsername(e.target.value)}
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 placeholder="name@gmail.com" required/>
                          <p className="py-2 text-sm text-red-600">{error}</p>
                      </div>
                      <div className="mb-5">
                          <label htmlFor="password"
                                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật
                              khẩu:</label>
                          <input type="password" id="password"
                                 onChange={(e) => setPassword(e.target.value)}
                                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                 required/>
                          <p className="py-2 text-sm text-red-600">{error}</p>
                      </div>
                      <button type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                      </button>
                  </form>
                  <p className="pt-3 text-sm font-medium text-gray-500">Bạn có thể đăng ký tài khoản ở đây <br></br> <Link to="/register" className="font-bold text-indigo-700 hover:text-blue-600 hover:decoration-4">Đăng ký tài khoản</Link></p>
              </div>
          </div>
      </div>
  )
      ;
};
