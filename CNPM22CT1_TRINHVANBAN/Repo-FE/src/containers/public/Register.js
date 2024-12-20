import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../service/apiService";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ho, setHo] = useState('');
    const [ten, setTen] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const register = {
            first_name: ho,
            last_name: ten,
            gender: gioiTinh,
            date_of_birth: ngaySinh,
            email: email,
            password: password,
            retype_password: confirmPassword,
            facebook_account_id: 0,
            google_account_id: 0,
            role_id: 'USER'
        }
        console.log(register);
        await registerUser(register, dispatch, navigate);
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
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 z-50 text-left">
              <div className="container w-full bg-white rounded-xl px-9 py-6 mx-6 my-3">
                  <h1 className="text-blue-600 font-bold text-2xl text-center pb-6">Đăng ký</h1>
                  <form className="max-w-md mx-auto" onSubmit={handleSubmitRegister}>
                      <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-5 group">
                              <input type="text" name="floating_first_name" id="floating_first_name"
                                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                     onChange={(e) => setHo(e.target.value)}
                                     placeholder=" " required/>
                              <label htmlFor="floating_first_name"
                                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                  Họ
                              </label>
                          </div>
                          <div className="relative z-0 w-full mb-5 group">
                              <input type="text" name="floating_last_name" id="floating_last_name"
                                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                     onChange={(e) => setTen(e.target.value)}
                                     placeholder=" " required/>
                              <label htmlFor="floating_last_name"
                                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                  Tên</label>
                          </div>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                          <label className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                              Giới tính:
                          </label>
                          <div className="flex items-center">
                              <input
                                  type="radio"
                                  id="male"
                                  name="gioiTinh"
                                  value="Nam"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => setGioiTinh(e.target.value)}
                              />
                              <label
                                  htmlFor="male"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                  Nam
                              </label>
                          </div>
                          <div className="flex items-center mt-2">
                              <input
                                  type="radio"
                                  id="female"
                                  name="gioiTinh"
                                  value="Nữ"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={(e) => setGioiTinh(e.target.value)}
                              />
                              <label
                                  htmlFor="female"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                  Nữ
                              </label>
                          </div>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                          <label htmlFor="floating_birth"
                                 className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                              Ngày sinh
                          </label>
                          <input type="date" name="floating_birth" id="floating_birth"
                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                 onChange={(e) => setNgaySinh(e.target.value)}

                                 placeholder=" " required/>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                          <input type="email" name="floating_email" id="floating_email"
                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder=" " required/>
                          <label htmlFor="floating_email"
                                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Email
                          </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                          <input type="password" name="floating_password" id="floating_password"
                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder=" " required/>
                          <label htmlFor="floating_password"
                                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Mật khẩu</label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                          <input type="password" name="repeat_password" id="floating_repeat_password"
                                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                                 placeholder=" " required/>
                          <label htmlFor="floating_repeat_password"
                                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                              Nhập lại mật khẩu
                          </label>
                      </div>
                      <button type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                      </button>
                  </form>
                  <p className="pt-3 text-center text-sm font-medium text-gray-500">  <br></br>
                      <Link to="/login" className="hover:text-blue-600 hover:decoration-4">Đã có tài khoản?</Link></p>
              </div>
          </div>
      </div>
  );
};
