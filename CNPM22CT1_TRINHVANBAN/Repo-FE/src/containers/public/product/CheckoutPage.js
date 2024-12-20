import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../../redux/cartSlice";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createOrder, updateOrder} from "../../../service/apiService";
import {toast} from "react-toastify";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartArr);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const totalPrice = cartItems.reduce((total, item) => total + (item.priceDiscount || 0) * (item.quantity || 1), 0);

    // const formik = useFormik({
    //     initialValues: {
    //         id_user: 9,
    //         note:  '',
    //         full_name: '',
    //         email: '',
    //         phone_number: '',
    //         address: '',
    //         total_money: 0,
    //         shipping_method: "standard",
    //         shipping_address: '',
    //         shipping_date: '',
    //         active: null,
    //         id_transport: null,
    //         id_discount: null,
    //         id_status_order: 2,
    //         cart_items: [
    //             {
    //                 product_id: 2,
    //                 quantity: 5
    //             }
    //         ]
    //     },
    //     validationSchema: Yup.object({
    //         note: Yup.string()
    //             .max(500, 'Ghi chú không được vượt quá 500 ký tự'),
    //
    //         full_name: Yup.string()
    //             .required('Tên đầy đủ là bắt buộc')
    //             .min(3, 'Tên đầy đủ phải có ít nhất 3 ký tự')
    //             .max(100, 'Tên đầy đủ không được vượt quá 100 ký tự'),
    //
    //         email: Yup.string()
    //             .email('Email không hợp lệ')
    //             .required('Email là bắt buộc'),
    //
    //         phone_number: Yup.string()
    //             .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Số điện thoại không hợp lệ')
    //             .required('Số điện thoại là bắt buộc'),
    //
    //         address: Yup.string()
    //             .required('Địa chỉ là bắt buộc')
    //             .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),
    //
    //         shipping_address: Yup.string()
    //             .required('Địa chỉ giao hàng là bắt buộc')
    //             .max(200, 'Địa chỉ giao hàng không được vượt quá 200 ký tự'),
    //
    //         // id_transport: Yup.number()
    //         //     .nullable()
    //         //     .integer('ID vận chuyển phải là một số nguyên'),
    //         //
    //         // id_discount: Yup.number()
    //         //     .nullable()
    //         //     .integer('ID giảm giá phải là một số nguyên'),
    //         //
    //         // id_status_order: Yup.number()
    //         //     .required('Trạng thái đơn hàng là bắt buộc')
    //         //     .oneOf([1, 2, 3], 'Trạng thái đơn hàng không hợp lệ')
    //     }),
    //     onSubmit: async (values) => {
    //         console.log("Submitting values:", values);
    //         console.log("Current Product:", currentProduct);
    //
    //         try {
    //             if (currentProduct && (user.name === "Admin" || user.role.id === 1)) {
    //                 await updateOrder(currentProduct.id, values, user?.token);
    //                 toast.success(`Đơn hàng ${values.full_name} đã được cập nhật thành công.`);
    //             } else if (user.name === "Admin" || user.role.id === 1) {
    //                 await createOrder(values, user?.token);
    //                 toast.success(`Đơn hàng ${values.full_name} đã được thêm mới thành công.`);
    //             } else {
    //                 toast.error("Bạn không có quyền sử dụng chức năng này.");
    //             }
    //             handleCloseModal();
    //             await fetchOrders();
    //         } catch (error) {
    //             console.error("API Error:", error);
    //             toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    //         }
    //     }
    // })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
            alert('Vui lòng điền đầy đủ thông tin khách hàng.');
            return;
        }

        alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        dispatch(clearCart());
    }

    return (
        <div className="checkout-page p-6 max-w-screen-lg mx-auto bg-gray-50">
            <h1 className="text-2xl font-bold mb-6">Thanh Toán</h1>

            <div className="checkout-details mb-8">
                <h2 className="text-xl font-semibold mb-4">Sản phẩm trong giỏ hàng</h2>
                <div>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Giỏ hàng trống.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li key={item.id}
                                    className="checkout-item flex items-center p-4 bg-white rounded shadow">
                                    <img src={item.image} alt={item.nameProduct}
                                         className="w-20 h-20 rounded mr-4 object-cover"/>
                                    <div>
                                        <h4 className="text-lg font-semibold">{item.nameProduct}</h4>
                                        <p className="text-sm text-gray-600">
                                            Size: {item.detailSizeProducts} | Màu: {item.color}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Giá: <span
                                            className="text-red-500 font-semibold">{(item.priceDiscount * item.quantity).toLocaleString()}đ</span>
                                        </p>
                                        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="customer-info mb-8">
                <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên khách hàng:</label>
                        <input
                            type="text"
                            name="name"
                            value={customerInfo.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
                        <input
                            type="text"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
                        <input
                            type="text"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </form>
            </div>

            <div className="checkout-summary text-center bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Tổng thanh toán: <span
                    className="text-red-500">{totalPrice.toLocaleString()}đ</span></h2>
                <button
                    onClick={handleCheckout}
                    className="checkout-button px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Thanh Toán
                </button>
            </div>
        </div>

    );
};
