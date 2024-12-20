import { useState, useEffect } from "react";
import * as apiService from "../../service/apiService";
import {Link} from "react-router-dom";
import  "../../App.css"
import button from "bootstrap/js/src/button";
import {
    createOrder,
    updateOrder,
} from "../../service/apiService";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
export const OrderManager = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [currentProduct, setCurrentProduct] = useState("");
    const [showModal, setShowModal] = useState(false);

    const listTranSports = useSelector((state) => state?.order?.listTransport?.currentTransport);
    const listDiscounts = useSelector((state) => state?.order?.listDiscount?.currentDiscount);
    const listStatusOrder = useSelector((state) => state?.order?.listStatusOrder?.currentStatusOrder);
    const dispatch = useDispatch();


        const fetchOrders = async () => {
            try {
                const response = await apiService.getListOrder(user?.token, currentPage, pageSize);
                setOrders(response.content || []);
                setTotalPages(response.totalPages || 0);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
    useEffect( () => {
        setLoading(true)
        setTimeout(() => {
            fetchOrders();
        }, 200)
    }, [currentPage, pageSize]);

    const fetchListOption = async () =>{
        await apiService.getStatusOrder(dispatch, user?.token)
        await apiService.getDiscount(dispatch, user?.token)
        await apiService.getTransport(dispatch, user?.token)
    }
    useEffect( () => {
        fetchListOption();
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            id_user: 9,
            note:  '',
            full_name: '',
            email: '',
            phone_number: '',
            address: '',
            total_money: 0,
            shipping_method: "standard",
            shipping_address: '',
            shipping_date: '',
            active: null,
            id_transport: null,
            id_discount: null,
            id_status_order: 2,
            cart_items: [
                {
                    product_id: 2,
                    quantity: 5
                }
            ]
        },
        validationSchema: Yup.object({
            note: Yup.string()
                .max(500, 'Ghi chú không được vượt quá 500 ký tự'),

            full_name: Yup.string()
                .required('Tên đầy đủ là bắt buộc')
                .min(3, 'Tên đầy đủ phải có ít nhất 3 ký tự')
                .max(100, 'Tên đầy đủ không được vượt quá 100 ký tự'),

            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email là bắt buộc'),

            phone_number: Yup.string()
                .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Số điện thoại không hợp lệ')
                .required('Số điện thoại là bắt buộc'),

            address: Yup.string()
                .required('Địa chỉ là bắt buộc')
                .max(200, 'Địa chỉ không được vượt quá 200 ký tự'),

            shipping_address: Yup.string()
                .required('Địa chỉ giao hàng là bắt buộc')
                .max(200, 'Địa chỉ giao hàng không được vượt quá 200 ký tự'),

            // id_transport: Yup.number()
            //     .nullable()
            //     .integer('ID vận chuyển phải là một số nguyên'),
            //
            // id_discount: Yup.number()
            //     .nullable()
            //     .integer('ID giảm giá phải là một số nguyên'),
            //
            // id_status_order: Yup.number()
            //     .required('Trạng thái đơn hàng là bắt buộc')
            //     .oneOf([1, 2, 3], 'Trạng thái đơn hàng không hợp lệ')
        }),
        onSubmit: async (values) => {
            console.log("Submitting values:", values);
            console.log("Current Product:", currentProduct);

            try {
                if (currentProduct && (user.name === "Admin" || user.role.id === 1)) {
                    await updateOrder(currentProduct.id, values, user?.token);
                    toast.success(`Đơn hàng ${values.full_name} đã được cập nhật thành công.`);
                } else if (user.name === "Admin" || user.role.id === 1) {
                    await createOrder(values, user?.token);
                    toast.success(`Đơn hàng ${values.full_name} đã được thêm mới thành công.`);
                } else {
                    toast.error("Bạn không có quyền sử dụng chức năng này.");
                }
                handleCloseModal();
                await fetchOrders();
            } catch (error) {
                console.error("API Error:", error);
                toast.error("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    })

    const handleOpenModal = async (order) => {
        setCurrentProduct(order);

        if (order) {
            formik.setValues({
                id_user: order.id_user || 9,
                note: order.note || '',
                full_name: order.full_name || '',
                email: order.email || '',
                phone_number: order.phone_number || '',
                address: order.address || '',
                shipping_address: order.shipping_address || order.address,
                shipping_date: order.shipping_date || '',
                id_transport: order.id_transport || null,
                id_discount: order.id_discount || null,
                id_status_order: order.id_status_order || 2,
                cart_items: order.cart_items || [],
            });
        } else {
            formik.resetForm();
        }
        setShowModal(true);
    };
    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
        formik.resetForm();
    };

    const handleDelete = async (id, name) => {
        try {
            const result = await Swal.fire({
                title: `Bạn chắc chắn muốn xóa ${name} không?`,
                text: "Bạn sẽ không thể hoàn nguyên điều này!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                    await apiService.deleteByIdOrder(id, user?.token);
                    toast.success(`Đơn hàng ${name} đã được xóa.`);
                    await fetchOrders();
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            toast.error("Có lỗi xảy ra khi xóa, vui lòng thử lại.");
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page); 
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0); 
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="product-manager w-full">
            <div className="w-full flex justify-between items-center px-10 pt-[80px]">
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
                        <th className="px-6 py-3">Tên khách hàng</th>
                        <th className="px-6 py-3">Số điện thoại</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Địa chỉ</th>
                        <th className="px-6 py-3">Tổng tiền</th>
                        <th className="px-5 py-3">Ngày dự đoán giao hàng</th>
                        <th className="px-6 py-3">Trạng thái đơn hàng</th>
                        {/*<th className="px-6 py-3">Đơn vị vận chuyển</th>*/}
                        <th className="px-6 py-3">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, id) => {
                        const matchingStatus = listStatusOrder.find(statusOrder => statusOrder.id === order.id_status_order);
                        return (
                        <tr key={order.id || id} className="border-b bg-gray-50">
                            <td className="px-3 py-3">{order.id}</td>
                            <td className="px-6 py-3">{order.full_name}</td>
                            <td className="px-6 py-3">{order.phone_number}</td>
                            <td className="px-6 py-3">{order.email}</td>
                            <td className="px-3 py-3">{order.address}</td>
                            <td className="px-6 py-3">{order.total_money}</td>
                            <td className="px-0 py-3">{order.shipping_date}</td>
                            <td className="px-6 py-3">{matchingStatus ? matchingStatus.status : "Không xác định"}</td>
                            <td className="px-6 py-3 flex flex-1 pr-5 items-center justify-center gap-3">
                                <button type="button" onClick={() => handleOpenModal(order)} className="px-3 py-1 bg-blue-500 text-white rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                                    </svg>
                                </button>
                                {/*<button type="button"*/}
                                {/*        onClick={() => handleDelete(order.id, order.full_name)}*/}
                                {/*        className="px-3 py-1 bg-red-500 text-white rounded-md">*/}
                                {/*    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                                {/*         strokeWidth={1.5} stroke="currentColor" className="size-5">*/}
                                {/*        <path strokeLinecap="round" strokeLinejoin="round"*/}
                                {/*              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>*/}
                                {/*    </svg>*/}
                                {/*</button>*/}
                            </td>
                        </tr>
                    )})}
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
                {Array.from({length: totalPages}, (_, index) => (
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

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                            {currentProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                        </h2>
                        <form className="info" onSubmit={formik.handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Tên khách hàng</label>
                                <input
                                    type="text"
                                    id="full_name"
                                    name="full_name"
                                    value={formik.values.full_name}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formik.errors.full_name && (
                                    <p className="text-red-600">{formik.errors.full_name}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.email && (
                                        <p className="text-red-600">{formik.errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Số điện thoại</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={formik.values.phone_number}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.phone_number && (
                                        <p className="text-red-600">{formik.errors.phone_number}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Địa chỉ</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.address && (
                                        <p className="text-red-600">{formik.errors.address}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Địa chỉ cụ thể</label>
                                    <input
                                        type="text"
                                        id="shipping_address"
                                        name="shipping_address"
                                        value={formik.values.shipping_address}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.shipping_address && (
                                        <p className="text-red-600">{formik.errors.shipping_address}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Ghi chú</label>
                                <textarea
                                    name="note"
                                    id="note"
                                    value={formik.values.note}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                ></textarea>
                                {formik.errors.note && (
                                    <p className="text-red-600">{formik.errors.note}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-1">
                                <div>
                                    <label className="block text-gray-600 mb-1">Đơn vị vận chuyển</label>
                                    <select
                                        className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="id_transport"
                                        name="id_transport"
                                        value={formik.values.id_transport || ""}
                                        onChange={(e) => {
                                            formik.setFieldValue("id_transport", Number(e.target.value));
                                        }}
                                    >
                                        <option value="">-- Chọn vận chuyển --</option>
                                        {
                                            listTranSports.map((tranSport, index) => (
                                                <option key={tranSport.id || index}
                                                        value={tranSport.id}
                                                >
                                                    {tranSport.name}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.errors.id_transport && (
                                        <p className="text-red-600">{formik.errors.id_transport}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-1">Khuyến mãi áp dụng</label>
                                    <select
                                        className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="id_discount"
                                        name="id_discount"
                                        value={formik.values.id_discount || ""}
                                        onChange={(e) => {
                                            formik.setFieldValue("id_discount", Number(e.target.value));
                                        }}
                                    >
                                        <option value="">-- Chọn khuyến mãi --</option>
                                        {
                                            listDiscounts.map((discount, index) => (
                                                <option key={discount.id || index}
                                                        value={discount.id}
                                                >
                                                    {discount.name}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.errors.id_transport && (
                                        <p className="text-red-600">{formik.errors.id_transport}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-1">Trạng thái đơn hàng</label>
                                    <select
                                        className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="id_status_order"
                                        name="id_status_order"
                                        value={formik.values.id_status_order || ""}
                                        onChange={(e) => {
                                            console.log("Selected value for id_status_order:", e.target.value);
                                            formik.setFieldValue("id_status_order", Number(e.target.value));
                                        }}
                                    >
                                        <option>-- Chọn trạng thái đơn --</option>
                                        {
                                            listStatusOrder.map((statusOrder, index) => (
                                                <option key={statusOrder?.id || index}
                                                        value={statusOrder?.id}
                                                >
                                                    {statusOrder?.status}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.errors.id_status_order && (
                                        <p className="text-red-600">{formik.errors.id_status_order}</p>
                                    )}
                                </div>
                            </div>


                            {/* Actions */}
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    {currentProduct ? "Cập nhật" : "Thêm mới"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
