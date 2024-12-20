import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductCart, updateQuantity } from '../../../redux/cartSlice';
import './css/CartOverlay.css';
import {path} from "../../../ultis/path";
import {Link} from "react-router-dom";

const CartOverlay = ({ onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.cart?.cartArr);

    const totalPrice = cartItems.reduce((total, item) => total + item.priceDiscount * item.quantity, 0);

    const handleQuantityChange = (id, quantity) => {
        if (quantity < 1) return;
        dispatch(updateQuantity({ id, quantity }));
    };

    return (
        <div className="cart-overlay">
            <div className="cart-header">
                <h2>Giỏ hàng</h2>
                <button onClick={onClose} className="close-button">×</button>
            </div>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Giỏ hàng của bạn trống.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.nameProduct} />
                            <div className="item-details">
                                <h2 className="flex flex-row font-bold">{item.nameProduct}</h2>
                                <p className="mt-1">Size: {item.detailSizeProducts} | Màu: {item.color}</p>
                                <div className="flex flex-row mt-2 gap-2">
                                    <p>{(item.priceDiscount * item.quantity)?.toLocaleString()}đ</p>
                                    <div className="quantity-controls mt-2 flex flex-row gap-2 justify-center items-center">
                                        <button
                                            className="px-2 py-1 bg-gray-100 border-l hover:bg-gray-200"
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-
                                        </button>
                                        <span
                                            className="px-2 py-1 bg-gray-100 border-l hover:bg-gray-200"
                                        >{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-100 border-l hover:bg-gray-200"
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+
                                        </button>
                                    </div>
                                    <button onClick={() => dispatch(deleteProductCart({id: item.id}))}>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-footer">
                <h3>Tổng tiền: {totalPrice.toLocaleString()}đ</h3>
                <button className="checkout-button">
                    <Link to={path.CHECKOUT}>Thanh Toán</Link>
                </button>
            </div>
        </div>
    );
};

export default CartOverlay;