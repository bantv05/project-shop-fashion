import { useState, useEffect } from "react";
import * as apiService from "../../service/apiService";
import {Link} from "react-router-dom";
import  "../../App.css"
import button from "bootstrap/js/src/button";
import {getListUser} from "../../service/apiService";
import {useDispatch, useSelector} from "react-redux";
export const UserManager = () => {
    const user = useSelector((state) => state?.auth?.login?.currentUser);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await apiService.getListUser(currentPage, pageSize, user.token, dispatch);
                setProducts(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        const usersList = useSelector((state) => state?.userSlice?.login?.currentUser);
    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize]);

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page); // Đặt trang hiện tại
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value)); // Đặt số lượng phần tử mỗi trang
        setCurrentPage(0); // Quay về trang đầu tiên
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-medium text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="product-manager w-full">
            <div className="w-full flex justify-between items-center px-10 pt-[80px]">
                <button type="button" className="px-3 py-2 bg-green-500 text-white rounded-md">
                    Thêm mới
                </button>
                <select
                    name="pageSize"
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="px-2 py-1 border border-gray-300 rounded-md"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12 mx-auto mt-4">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-3 py-3">ID</th>
                        <th className="px-6 py-3">Tên sản phẩm</th>
                        <th className="px-6 py-3">Giá gốc</th>
                        <th className="px-6 py-3">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b bg-gray-50">
                            <td className="px-3 py-3">{product.id}</td>
                            <td className="px-6 py-3">{product.nameProduct}</td>
                            <td className="px-6 py-3">{product.price}</td>
                            <td className="px-6 py-3">
                                <Link to={`/products/${product.id}`} className="text-blue-500">
                                    Xem chi tiết
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                    className={`px-3 py-2 rounded-md ${
                        currentPage === 0 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
                    }`}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageClick(index)}
                        className={`px-3 py-2 rounded-md ${
                            index === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-black"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`px-3 py-2 rounded-md ${
                        currentPage === totalPages - 1
                            ? "bg-gray-300 text-gray-500"
                            : "bg-blue-500 text-white"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
