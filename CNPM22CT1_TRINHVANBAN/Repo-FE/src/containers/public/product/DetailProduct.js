import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFindByIdProduct } from "../../../service/apiService";
import {useDispatch, useSelector} from "react-redux";
import {addProductCart} from "../../../redux/cartSlice";

export const DetailProduct = () => {
    const user = useSelector((state) => state?.auth?.login?.currentUser);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const param = useParams();
    const cartProduct = useSelector((state) => state?.cart?.cartArr);
    console.log(cartProduct);

    const dispatch = useDispatch();
    const getProduct = async () => {
        try {
            const res = await getFindByIdProduct(param.id, user.token);
            setProduct(res);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        console.log("Updated product:", product);
    }, [product]); // Chạy mỗi khi product thay đổi

    useEffect(() => {
        getProduct();
    }, [param.id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setQuantity(Math.max(1, value));
    };

    // Nếu không có sản phẩm, hiển thị thông báo đang tải
    if (!product) {
        return <div className="text-center py-10">Đang tải dữ liệu...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="lg:flex">
                    {/* Image Section */}
                    <div className="lg:w-1/2">
                        <img
                            src={product?.image || '/path/to/default-image.jpg'} // Thêm ảnh mặc định nếu không có ảnh
                            alt={product?.nameProduct || "Sản phẩm không có tên"}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="lg:w-1/2 p-6 flex flex-col">
                        <div>
                            <h1 className="text-2xl flex flex-col justify-start items-start font-semibold text-gray-800 mb-4">
                                {product?.nameProduct || "Tên sản phẩm không tồn tại"}
                            </h1>
                            <h2>{product?.created_at}</h2>
                            <div className="text-gray-600 flex flex-row justify-start items-start text-sm gap-4">
                                <p><strong>Mã sản phẩm:</strong> {product?.id || "Không xác định"}</p>
                                <p><strong>Tình trạng:</strong> {product?.statusProduct?.name || "Không rõ"}</p>
                                <p><strong>Thương hiệu:</strong> {product?.tradeMake || "Không rõ"}</p>
                            </div>
                            <div className="mt-16 flex flex-row justify-start items-center text-sm gap-6">
                                <span className="text-md font-semibold text-gray-700">Giá:</span>
                                <p className="text-[21px] text-red-500 font-bold">
                                    {product?.priceDiscount
                                        ? `${product?.priceDiscount.toLocaleString()}₫`
                                        : "Liên hệ"}
                                    {product?.price && (
                                        <span className="line-through text-gray-400 ml-4">
                                            {product?.price.toLocaleString()}₫
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Quantity */}
                            {/*<div className="mt-16 flex flex-row justify-start items-center text-sm gap-6">*/}
                            {/*    <label className="text-md font-semibold text-gray-700">Số lượng:</label>*/}
                            {/*    <div className="flex items-center border rounded-md mt-2">*/}
                            {/*        <button*/}
                            {/*            className="px-3 py-2 bg-gray-100 border-r hover:bg-gray-200"*/}
                            {/*            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}*/}
                            {/*        >*/}
                            {/*            -*/}
                            {/*        </button>*/}
                            {/*        <input*/}
                            {/*            type="text"*/}
                            {/*            className="w-12 text-center focus:outline-none"*/}
                            {/*            value={quantity}*/}
                            {/*            onChange={handleQuantityChange}*/}
                            {/*        />*/}
                            {/*        <button*/}
                            {/*            className="px-3 py-2 bg-gray-100 border-l hover:bg-gray-200"*/}
                            {/*            onClick={() => setQuantity((prev) => prev + 1)}*/}
                            {/*        >*/}
                            {/*            +*/}
                            {/*        </button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>

                        <div className="mt-[280px] flex space-x-4">
                            <button
                                className="w-full relative overflow-hidden border border-black py-3 rounded-md group">
                                <span
                                    className="absolute inset-0 w-full h-full bg-black -translate-x-full group-hover:translate-x-0 transition-all duration-300"></span>
                                <span
                                    className="relative text-black group-hover:text-white transition-colors duration-300 font-bold" onClick={() => dispatch(addProductCart(product))}>Thêm vào giỏ</span>
                            </button>

                            <button
                                className="w-full bg-black text-white py-3 rounded-md font-bold">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
