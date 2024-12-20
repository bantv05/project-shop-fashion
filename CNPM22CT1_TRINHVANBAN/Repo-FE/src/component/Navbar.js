import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    const user = useSelector((state) => state.auth?.login?.currentUser); // Lấy thông tin người dùng từ Redux
    const navigate = useNavigate();

    const handleDx = () => {
        navigate("/login"); // Điều hướng đến trang login khi người dùng đăng xuất
    }

    useEffect(() => {
        if (user?.token) {
            if (user?.role?.code === "USER") {
                // Nếu là user, điều hướng đến trang chủ ("/")
                navigate("/");
            } else if (user?.role?.code === "ADMIN") {
                // Nếu là admin, điều hướng đến trang quản lý đơn hàng
                navigate("/admin/orders");
            }
        }
    }, [user, navigate]); // Phụ thuộc vào `user` và `navigate` để tránh lỗi điều hướng liên tục

    return (
        <nav className="bg-white shadow-md rounded-lg ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                {/* Search Input */}
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search for something..."
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                </div>

                {/* Right side with notifications and profile */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button className="relative text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                            </svg>
                            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 text-gray-700"
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src={user?.avatar || "https://via.placeholder.com/150"} // Avatar người dùng
                                alt="User avatar"
                            />
                            <b>Hi, </b><span className="hidden md:block">{user?.name}</span>
                            <svg
                                className="w-4 h-4 text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white rounded-md w-48">
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
            </div>
        </nav>
    );
};

export default Navbar;
