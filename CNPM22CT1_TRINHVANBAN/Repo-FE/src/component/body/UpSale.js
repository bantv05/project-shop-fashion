import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as apiService from "../../service/apiService";
import Slider from "react-slick";
import {ProductCard} from "../../containers/public/product/ProductCard";

export const UpSale = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.auth?.login?.currentUser);
    const products = useSelector((state) => state.productsReducer.listProducts?.currentListProduct?.currentListProduct || []);

    const [timeLeft, setTimeLeft] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(20); // Page size remains constant

    const calculateTimeLeft = () => {
        const countdownTime = new Date().getTime() + 9 * 60 * 60 * 1000; // Replace with a dynamic value if needed
        const now = new Date().getTime();
        const timeLeft = countdownTime - now;

        return {
            days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
        };
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

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

    const saleProducts = products.filter((product) => product.saleProduct);

    const settings = {
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="container h-[555px] flex-col bg-[#FAEFEC] px-3 py-6">
            <div className="selection-title flex items-center justify-between px-20">
                <div className="flex align-items-lg-start gap-7">
                    <h2 className="text-[30px]">SS24 Sale 70%</h2>
                    <div className="flex items-center gap-2">
                        {Object.entries(timeLeft).map(([unit, value], index) => (
                            <div key={index} className="bg-[#E70505] w-25 h-50 rounded-md px-4 py-5 relative">
                                <div className="absolute flex-col text-white text-[10px] text-center top-1 right-[5px]">
                                    <p className="text-[13px] font-bold">{value}</p>
                                    <p className="mb-1">
                                        {unit === "days" ? "Ngày" :
                                            unit === "hours" ? "Giờ" :
                                                unit === "minutes" ? "Phút" : "Giây"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {saleProducts.length > 0 ? (
                <div className="w-full px-8 py-4">
                    <Slider {...settings}>
                        {saleProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-center">
                                <div className="w-[200px] h-[300px]">
                                    <ProductCard {...product} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <p className="text-center text-gray-500">No products available for sale.</p>
            )}
        </div>
    );
};
