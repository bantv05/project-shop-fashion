import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({
                                id,
                                nameProduct,
                                price,
                                priceDiscount,
                                description,
                                image,
                                tradeMake,
                                quantity,
                                color,
                                sold,
                                saleProduct,
                                newProduct,
                                statusProduct,
                                style,
                                category,
                            }) => {
    // Hàm fallback ảnh nếu lỗi
    const handleImageError = (e) => {
        e.target.src = "default-image.png";
    };

    // Các nhãn sản phẩm
    const labels = [
        { condition: saleProduct, text: "Sale", className: "bg-red-500" },
        { condition: newProduct, text: "New", className: "bg-yellow-500" },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/products/${id}`}>
                <div className="relative">
                    <img
                        src={image}
                        alt={nameProduct}
                        className="w-full h-64 object-cover"
                        onError={handleImageError}
                    />
                    {/* Hiển thị nhãn sản phẩm */}
                    {labels.map(
                        (label, index) =>
                            label.condition && (
                                <span
                                    key={index}
                                    className={`absolute top-2 ${
                                        index === 0 ? "left-2" : "right-2"
                                    } text-white text-xs font-semibold px-2 py-1 rounded ${
                                        label.className
                                    }`}
                                >
                  {label.text}
                </span>
                            )
                    )}
                </div>
                <div className="p-4 flex flex-col items-start justify-start">
                    <h3 className="text-gray-800 text-[16px] font-semibold">
                        {nameProduct}
                    </h3>
                    <div className="mt-2 flex flex-row items-center gap-4">
                        <p className="text-red-500 font-bold text-[16px] md:text-xl">
                            {priceDiscount
                                ? `${priceDiscount.toLocaleString()}₫`
                                : "Liên hệ"}
                        </p>
                        {price && (
                            <p className="text-gray-500 line-through text-[14px] md:text-base">
                                {`${price.toLocaleString()}₫`}
                            </p>
                        )}
                    </div>

                    {sold !== undefined && sold !== null && (
                        <p className="mt-2 text-gray-600 text-xs md:text-sm">
                            Đã bán: <span className="font-bold">{sold !== 0 ? sold : 0}</span>
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
};
