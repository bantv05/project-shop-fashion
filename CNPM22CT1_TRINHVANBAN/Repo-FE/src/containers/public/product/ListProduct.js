import React, {useEffect, useState} from 'react';
import { ProductCard } from './ProductCard';
import { useDispatch, useSelector } from "react-redux";
import * as apiService from "../../../service/apiService";
import {Filter} from "./Filter";


export const ProductList = () => {
    const user = useSelector((state) => state?.auth?.login?.currentUser);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const products = useSelector((state) => state.productsReducer.listProducts?.currentListProduct?.currentListProduct || []);
    const totalElements = useSelector((state) => state.productsReducer.listProducts.currentListProduct?.totalElements || 0);
    const fetchProducts = async () => {
        try {
            await apiService.getListProduct(currentPage, pageSize, dispatch, user.token);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
        }
    };
    useEffect(() => {
        fetchProducts(); // Trigger fetch on component mount or dependency change
    }, [currentPage, pageSize]);
    const handle = () => {
        setPageSize((pageSize) => pageSize + 5);
    }


    return (
        <div className="bg-gray-100 py-10">
            <Filter productLength={totalElements}/>
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Danh sách sản phẩm</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </div>
            <button className="mt-16 relative overflow-hidden border border-black py-2 px-16 rounded-xl group"
            onClick={() => handle()}
            >
                <span
                    className="absolute inset-0 w-full h-full bg-black -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
                <span
                    className="relative text-black group-hover:text-white transition-colors duration-500">Xem thêm sản phẩm</span>
            </button>
        </div>
    );
};
