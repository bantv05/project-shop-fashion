import React, { useState } from "react";
import { useSelector } from "react-redux";

export const TopBar = () => {
    // Fetch the list of products safely from the Redux store
    const lastProduct = useSelector(
        (state) =>
            state.productsReducer.listProducts?.currentListProduct?.[2]
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <div className="topbar w-full text-[13px]">
            <div className="container bg-black text-white p-1">
                <div className="flex justify-between items-center mx-4">
                    <div className="hotline p-1 flex">
                        <span>
                            <p>
                                Hotline CSKH: <strong>18001731</strong> - Hotline mua hàng: <strong>18001732</strong>
                            </p>
                        </span>
                        <span className="mx-3">|</span>
                        <span className="contact text-white">
                            <a className="text-white" href="#">
                                Hệ thống showroom
                            </a>
                        </span>
                    </div>
                    <div className="flex contact text-white gap-3 mr-3 items-center justify-end">
                        <button onClick={toggleDropdown}>
                            <span className="absolute top-[-6px] right-[126px] bg-red-600 p-1 rounded-full text-white text-[10px]">
                                1 {/* Example placeholder for notifications count */}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p>Thông báo của tôi</p>
                        </button>
                    </div>
                </div>

                {isDropdownOpen && lastProduct && (
                    <div className="absolute right-0 mt-2 bg-white rounded-md w-48 shadow-md z-50">
                        <div>
                            <p>{lastProduct.nameProduct} - {lastProduct.price}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
