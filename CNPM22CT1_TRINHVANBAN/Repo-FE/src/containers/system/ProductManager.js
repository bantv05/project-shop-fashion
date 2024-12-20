import { useState, useEffect } from "react";
import { storage } from "../../ultis/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "firebase/compat/storage";
import * as apiService from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import "../../App.css";
import {useDispatch, useSelector} from "react-redux";
import {
    createProduct,
    getByIdProduct,
    getCategory,
    getSize,
    getStatusProduct,
    getStyle, updateProduct
} from "../../service/apiService";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";


export const ProductManager = () => {
    const user = useSelector((state) => state?.auth?.login?.currentUser);
    // const products = useSelector((state) => state?.product?.listProducts?.currentListProduct || []);
    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    // const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState("");

    const statusProducts= useSelector((state) => state?.list?.list?.currentList);
    const styles= useSelector((state) => state?.list?.listStyle?.currentList);
    const categories = useSelector((state) => state?.list?.listCate?.currentList);
    const detailSizeProducts= useSelector((state) => state?.list?.listSize?.currentList);
    const getIdProduct = useSelector((state) => state?.getById?.byProduct?.currentUser);
    const [urlImage, setUrlImage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true); // Indicate loading state
        try {
            await apiService.getListProduct(currentPage, pageSize, dispatch, user.token);
            // `totalPages` is derived from the Redux state
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const products = useSelector((state) => state.productsReducer.listProducts?.currentListProduct?.currentListProduct || []);
    const totalPages = useSelector((state) => state.productsReducer.listProducts.currentListProduct?.totalPages || 0);

    useEffect(() => {
        fetchProducts(); // Trigger fetch on component mount or dependency change
    }, [currentPage, pageSize]);



    const formik = useFormik({
        initialValues: {
            nameProduct:  '',
            image: '',
            price: '',
            priceDiscount: '',
            description: '',
            tradeMake: '',
            quantity: '',
            color: '#000000',
            saleProduct: null,
            sold: 0,
            newProduct: null,
            statusProduct: null,
            style: null,
            category: null,
            detailSizeProducts: "M,L,S,XL"
        },
        validationSchema: Yup.object({
            nameProduct: Yup.string().required("Tên sản phẩm là bắt buộc"),
            // image: Yup.string().required("Hình ảnh là bắt buộc"),
            price: Yup.number().positive("Giá sản phẩm phải là số dương").required("Giá sản phẩm là bắt buộc"),
            priceDiscount: Yup.number().positive("Giá giảm phải là số dương").required("Giá giảm là bắt buộc"),
            description: Yup.string().required("Mô tả là bắt buộc"),
            tradeMake: Yup.string().required("Thương hiệu là bắt buộc"),
            quantity: Yup.number().positive("Số lượng phải là số dương").required("Số lượng là bắt buộc"),
            color: Yup.string().required("Màu sắc là bắt buộc"),
            sold: Yup.number().default(0),
            newProduct: Yup.boolean().required("Trạng thái mới là bắt buộc"),
            saleProduct: Yup.boolean().required("Trạng thái giảm giá là bắt buộc")
        }),
        onSubmit: async (values) => {
            try {
                if (currentProduct && (user.name === "Admin" || user.role.id === 1)) {
                    await updateProduct(values, user?.token);
                    toast.success(`Sản phẩm ${values.nameProduct} đã được cập nhật thành công.`);
                } else if(user.name === "Admin" || user.role.id === 1){
                    await createProduct(values, dispatch, user?.token);
                    toast.success(`Sản phẩm ${values.nameProduct} đã được thêm mới thành công.`);
                } else {
                    toast.error("Bạn không có quyền sửa dụng các chức năng này.");
                }
                handleCloseModal(); // Close modal after success
                await fetchProducts(); // Refresh product list
            } catch (error) {
                console.error("Error in submitting form:", error);
                toast.error("Có lỗi xảy ra, vui lòng thử lại.");
            }
        }
    })
    console.log(products);

    const handleImageChange = async (event) => {
        const file = event.currentTarget.files[0];
        if (!file) {
            alert("No file selected!");
            return;
        }

        try {
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Error during upload:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at", downloadURL);
                    setUrlImage(downloadURL);
                    await formik.setFieldValue("image", downloadURL)
                }
            );
        } catch (error) {
            console.error("Firebase upload error:", error);
        }
    };

    const handleDelete = async (id, name) =>{
        Swal.fire({
            title: "Bạn chắc chắn xóa "+name+" không",
            text: "Bạn sẽ không thể hoàn nguyên điều này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed && (user.name === "Admin" || user.role.id === 1)) {
                Swal.fire({
                        title: "Deleted!",
                        text: "Bạn muốn xóa",
                        icon: "success"
                    }
                );
                apiService.deleteByIdProduct(id, user?.token);
            }else if(user.role.id !== 1){
                toast.error("Bạn không thể xóa khi không có quyền");
            }
        });
        await fetchProducts();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi các hàm async đồng thời bằng Promise.all
                await Promise.all([
                    getStatusProduct(user.token, dispatch),
                    getSize(user.token, dispatch),
                    getStyle(user.token, dispatch),
                    getCategory(user.token, dispatch)
                ]);
            } catch (error) {
                console.error("Có lỗi khi gọi các API:", error);
            }
        };

        fetchData();
    }, [dispatch]);


    // Open modal (for add/update)
    const handleOpenModal = async (id) => {
        setCurrentProduct(id)
        if (id){
            await getByIdProduct(id, dispatch, user.token);
        }else {
            formik.resetForm();
        }
        setShowModal(true);
    };
    useEffect(() => {
        if (getIdProduct && currentProduct) {
            formik.setValues({
                id: getIdProduct.id,
                nameProduct: getIdProduct.nameProduct || '',
                image: '',
                price: getIdProduct.price || '',
                priceDiscount: getIdProduct.priceDiscount || '',
                description: getIdProduct.description || '',
                tradeMake: getIdProduct.tradeMake || '',
                quantity: getIdProduct.quantity || '',
                color: getIdProduct.color || '#000000',
                saleProduct: getIdProduct.saleProduct || '',
                sold: 0,
                newProduct: getIdProduct.newProduct || false,
                statusProduct: getIdProduct.statusProduct || false,
                style: getIdProduct.style || null,
                category: getIdProduct.category || null,
                detailSizeProducts: getIdProduct.detailSizeProducts || "M,L,S,XL",
            });
        }else {
            formik.resetForm();
        }
    }, [getIdProduct, currentProduct]);


    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
        formik.resetForm();
    };

    // const handleSizeChange = (e, sizeName) => {
    //     const { checked } = e.target;
    //     const selectedSizes = formik.values.detailSizeProducts.filter(Boolean); // Loại bỏ phần tử trống
    //
    //     if (checked) {
    //         // Thêm kích thước vào mảng nếu chưa có
    //         if (!selectedSizes.includes(sizeName)) {
    //             formik.setFieldValue("detailSizeProducts", [...selectedSizes, sizeName]);
    //         }
    //     } else {
    //         // Loại bỏ kích thước khỏi mảng nếu đã chọn
    //         formik.setFieldValue(
    //             "detailSizeProducts",
    //             selectedSizes.filter((size) => size !== sizeName)
    //         );
    //     }
    // };


    // Pagination controls
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
            <div className="w-full flex justify-center items-center pt-20 flex-col gap-4">

                <div className="w-full">
                    <form className="max-w-md mx-auto">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search Mockups, Logos..." required/>
                            <button type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Add new product button */}
                <div className="ml-[800px] flex justify-end">
                    <button
                        type="button"
                        onClick={() => handleOpenModal()}
                        className="px-3 py-2 flex flex-1 bg-green-500 text-white rounded-md"
                    >
                        Thêm mới
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
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

                {/* Product table */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-11/12">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                        <tr>
                            <th className="px-3 py-3">ID</th>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-3 py-1">New (1/0)</th>
                            <th className="px-6 py-3">Original price</th>
                            <th className="px-6 py-2">Discount</th>
                            <th className="px-3 py-2">Quantity</th>
                            <th className="px-6 py-3">On sale</th>
                            <th className="px-6 py-6">Sales</th>
                            <th className="px-6 py-2">Date added</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-2 py-3">Style</th>
                            <th className="px-6 py-3">Act</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200">
                                <td className="px-3 py-3">{product.id}</td>
                                <td className="px-6 py-3">
                                    <img
                                        src={product.image}
                                        alt={product.nameProduct}
                                        className="w-10 h-10 object-cover rounded-md"
                                    />
                                </td>
                                <td className="px-0 py-3 font-bold">{product.nameProduct}</td>
                                <td className={`px-6 py-6 font-bold ${product.newProduct ? "text-blue-500" : "text-red-800"}`}>{product.newProduct ? "Yes" : "No"}</td>
                                <td className="px-6 py-2">{product.price}</td>
                                <td className="px-6 py-2">{product.priceDiscount}</td>
                                <td className="px-6 py-2">{product.quantity}</td>
                                <td className={`px-6 py-3 font-bold ${product.saleProduct ? "text-blue-500" : "text-red-800"}`}>{product.saleProduct ? "Yes" : "No"}</td>
                                <td className="px-6 py-2">{product.sold}</td>
                                <td className="px-1 py-3">{product?.created_at === ""? product.updated_at:product?.created_at}</td>
                                <td className={`px-6 py-3
                                ${product.statusProduct?.name === "Hết hàng" ? "text-red-800" : product.statusProduct?.name === "Còn hàng" ? "text-green-500" : "text-blue-500"}`}>{product.statusProduct?.name || "N/A"}</td>
                                <td className="px-2 py-3">{product.style?.name || "N/A"}</td>
                                <td className="px-6 py-3 flex flex-1 pr-5 items-center justify-center gap-3">
                                    <button type="button"
                                            onClick={() => handleOpenModal(product.id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                                        </svg>
                                    </button>
                                    <button type="button"
                                            onClick={() => handleDelete(product.id, product.nameProduct)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pt-5 flex gap-2">
                    <button
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className={`px-3 py-2 rounded-md ${
                            currentPage === 0
                                ? "bg-gray-300 text-gray-500"
                                : "bg-blue-500 text-white"
                        }`}
                    >
                        Previous
                    </button>
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            type="button"
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
                        type="button"
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                            {currentProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                        </h2>
                        <form className="info" onSubmit={formik.handleSubmit}>
                            {/* Tên sản phẩm */}
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    id="nameProduct"
                                    name="nameProduct"
                                    value={formik.values.nameProduct}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formik.errors.nameProduct && (
                                    <p className="text-red-600">{formik.errors.nameProduct}</p>
                                )}
                            </div>

                            {/* Giá và giá giảm */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Giá</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.price && (
                                        <p className="text-red-600">{formik.errors.price}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Giá giảm còn</label>
                                    <input
                                        type="text"
                                        id="priceDiscount"
                                        name="priceDiscount"
                                        value={formik.values.priceDiscount}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.priceDiscount && (
                                        <p className="text-red-600">{formik.errors.priceDiscount}</p>
                                    )}
                                </div>
                            </div>

                            {/* Mô tả */}
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Mô tả</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={4}
                                ></textarea>
                                {formik.errors.description && (
                                    <p className="text-red-600">{formik.errors.description}</p>
                                )}
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Hình ảnh</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                                />
                                {formik.values.image && (
                                    <div className="mt-2">
                                        <p>Ảnh đã tải lên:</p>
                                        <img
                                            src={formik.values.image}
                                            alt="Uploaded"
                                            className="w-32 h-32 object-cover mt-2"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Brand */}
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Brand</label>
                                <input
                                    type="text"
                                    id="tradeMake"
                                    name="tradeMake"
                                    value={formik.values.tradeMake}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {formik.errors.tradeMake && (
                                    <p className="text-red-600">{formik.errors.tradeMake}</p>
                                )}
                            </div>

                            {/* Số lượng và màu sắc */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Số lượng</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {formik.errors.quantity && (
                                        <p className="text-red-600">{formik.errors.quantity}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Màu</label>
                                    <input
                                        type="color"
                                        name="color"
                                        value={formik.values.color}
                                        onChange={formik.handleChange}
                                        className="w-full h-10 border rounded-lg"
                                    />
                                    {formik.errors.color && (
                                        <p className="text-red-600">{formik.errors.color}</p>
                                    )}
                                </div>
                            </div>

                            {/* Radio Group */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Giảm giá</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                id="true"
                                                type="radio"
                                                name="saleProduct"
                                                value="true"
                                                onChange={formik.handleChange}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                            True
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                id="false"
                                                type="radio"
                                                name="saleProduct"
                                                value="false"
                                                onChange={formik.handleChange}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                            False
                                        </label>
                                        {formik.errors.saleProduct && (
                                            <p className="text-red-600">{formik.errors.saleProduct}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-600 mb-1">Sản phẩm mới</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                id="newtrue"
                                                type="radio"
                                                name="newProduct"
                                                value="true"
                                                onChange={formik.handleChange}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                            True
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                id="newfalse"
                                                type="radio"
                                                name="newProduct"
                                                value="false"
                                                onChange={formik.handleChange}
                                                className="focus:ring-2 focus:ring-blue-500"
                                            />
                                            False
                                        </label>
                                        {formik.errors.newProduct && (
                                            <p className="text-red-600">{formik.errors.newProduct}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/*<div className="gap-4">*/}
                            {/*    <label className="text-gray-600">Size:</label>*/}
                            {/*    {detailSizeProducts.map((size, i) => (*/}
                            {/*        <label key={size.id || i} className="px-3">*/}
                            {/*            <input*/}
                            {/*                id={`size-${size.id}`}*/}
                            {/*                name="detailSizeProducts"*/}
                            {/*                type="checkbox"*/}
                            {/*                value={size.name}*/}
                            {/*                checked={formik.values.detailSizeProducts*/}
                            {/*                    // Kiểm tra và chuyển đổi thành mảng nếu là chuỗi*/}
                            {/*                    ? formik.values.detailSizeProducts*/}
                            {/*                        .toString() // Chuyển thành chuỗi nếu cần*/}
                            {/*                        .split(",")*/}
                            {/*                        .map(item => item.trim())*/}
                            {/*                        .includes(size.name)*/}
                            {/*                    : false} // Nếu là giá trị không hợp lệ, trả về false*/}
                            {/*                onChange={(e) => handleSizeChange(e, size.name)} // Truyền tên kích thước*/}
                            {/*            />*/}
                            {/*            {size.name}*/}
                            {/*        </label>*/}
                            {/*    ))}*/}
                            {/*    {formik.errors.detailSizeProducts && (*/}
                            {/*        <p className="text-red-600">{formik.errors.detailSizeProducts}</p>*/}
                            {/*    )}*/}
                            {/*</div>*/}


                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Trạng thái</label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="statusProduct"
                                        name="statusProduct"
                                        value={formik.values.statusProduct?.name}
                                        onChange={(e) => {
                                            const selectedStatus = statusProducts.find(
                                                (status) => status.name === e.target.value
                                            )
                                            formik.setFieldValue("statusProduct", selectedStatus);
                                        }}
                                    >
                                        <option value="">-- Chọn trạng thái --</option>
                                        {statusProducts.map((statusPro) => (
                                            <option key={statusPro.id}>
                                                {statusPro.name}
                                            </option>

                                        ))}
                                    </select>
                                    {formik.errors.statusProduct && (
                                        <p className="text-red-600">{formik.errors.statusProduct}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Phong cách</label>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="style"
                                        name="style"
                                        value={formik.values.style?.name || ""}
                                        onChange={(e) => {
                                            const style = styles.find(
                                                (status) => status.name === e.target.value
                                            )
                                            formik.setFieldValue("style", style);
                                        }}
                                    >
                                        <option value="">-- Chọn phong cách --</option>
                                        {
                                            styles.map((style, index) => (
                                                <option key={style.id || index}>
                                                    {style.name}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.errors.style && (
                                        <p className="text-red-600">{formik.errors.style}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Loại</label>
                                    <select
                                        className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        id="category"
                                        name="category"
                                        value={formik.values.category?.nameCategory || ""}
                                        onChange={(e) => {
                                            const cate = categories.find(
                                                (item) => item.nameCategory === e.target.value
                                            )
                                            formik.setFieldValue("category", cate);
                                        }}
                                    >
                                        <option value="">-- Chọn loại --</option>
                                        {
                                            categories.map((category, index) => (
                                                <option key={category.id || index}>
                                                    {category.nameCategory}
                                                </option>
                                            ))}
                                    </select>
                                    {formik.errors.category && (
                                        <p className="text-red-600">{formik.errors.category}</p>
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
