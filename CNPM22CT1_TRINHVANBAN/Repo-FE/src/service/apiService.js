import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess
} from "../redux/authSlice";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  listCateError,
  listCateStart, listCateSuccess,
  listError,
  listSizeError,
  listSizeStart,
  listSizeSuccess,
  listStart, listStyleError, listStyleStart, listStyleSuccess,
  listSuccess
} from "../redux/listSlice";
import {
  createProductError,
  createProductStart,
  createProductSuccess,
  listProductsError, listProductsStart, listProductsSuccess,

} from "../redux/productSlice";
import {
  byProductError,
  byProductStart,
  byProductSuccess,
} from "../redux/getByIdSlice";
import {
  listDiscountError,
  listDiscountStart, listDiscountSuccess,
  listStatusOrderError,
  listStatusOrderStart,
  listStatusOrderSuccess, listTransportError, listTransportStart, listTransportSuccess
} from "../redux/orderSlice";
import {listUserError, listUserStart, listUserSuccess} from "../redux/userSlice";

export const createProduct = async (data, dispatch, token) => {
  dispatch(createProductStart())
  try {
    const response = await axios.post(process.env.REACT_APP_POST_PRODUCT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } );
    console.log("API Response:", response.data);
    dispatch(createProductSuccess(response.data))
  } catch (error) {
    dispatch(createProductError())
  }
}

export const updateProduct = async (data, token) => {
  try {
    const url = process.env.REACT_APP_PUT_PRODUCT;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data: errorMessage } = error.response;
      if (status === 404) {
        throw new Error(`Sản phẩm không tìm thấy: ${errorMessage}`);
      }
      if (status === 400) {
        throw new Error(`Dữ liệu không hợp lệ: ${errorMessage}`);
      }
    }
    throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm.");
  }
};


export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/api/v1/users/login", user);
    const userData = res.data;

    if (userData?.role[0]?.code === "USER") {
      navigate('/');
    } else if (userData?.role[0]?.code === "ADMIN") {
      navigate('/admin');
    }
    dispatch(loginSuccess(userData));
    toast.success('Login successful!')
  } catch (error) {
    dispatch(loginFailed(error));
    toast.error("Email hoặc password đang bị sai!");
  }
}

export const registerUser = async (userData, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post(process.env.REACT_APP_POST_REGISTER_USER, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    dispatch(registerSuccess());
    navigate("/login")
  }catch (error) {
    dispatch(registerFailed(error))
  }
}

export const getListProduct = async (pageNumber, pageSize, dispatch, token) => {
  dispatch(listProductsStart());
  try {
    const baseURL = process.env.REACT_APP_LIST_PRODUCT;
    const response = await axios.get(baseURL, {
      headers: { Authorization: `Bearer ${token}` },
      params: { pageNumber, pageSize },
    });

    // Cập nhật đầy đủ dữ liệu
    dispatch(
        listProductsSuccess({
          currentListProduct: response.data.content, // Danh sách sản phẩm
          totalPages: response.data.totalPages || 0, // Tổng số trang
          totalElements: response.data.totalElements || 0, // Tổng số trang
        })
    );
  } catch (error) {
    dispatch(listProductsError());
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

export const getListOrder = async (token, pageNumber, pageSize) => {
  try {
    const baseURL = process.env.REACT_APP_LIST_ORDER;
    const response = await axios.get(baseURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageNumber,
        pageSize,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    return { content: [], totalElements: 0 };
  }
};

export const createOrder = async (order, token) => {
  try {
    const res = await axios.post(process.env.REACT_APP_POST_ORDER , order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data;
  }catch (error){
    if (error.response) {
      const { status, data: errorMessage } = error.response;
      if (status === 404) {
        throw new Error(`Sản phẩm không tìm thấy: ${errorMessage}`);
      }
      if (status === 400) {
        throw new Error(`Dữ liệu không hợp lệ: ${errorMessage}`);
      }
    }
    throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm.");
  }
}

export const updateOrder = async (id, order, token) => {
  try {
    const url = `${process.env.REACT_APP_PUT_ORDER}/${id}`;
    const res = await axios.put(url, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data;
  }catch (error){
    if (error.response) {
      const { status, data: errorMessage } = error.response;
      if (status === 404) {
        throw new Error(`Sản phẩm không tìm thấy: ${errorMessage}`);
      }
      if (status === 400) {
        throw new Error(`Dữ liệu không hợp lệ: ${errorMessage}`);
      }
    }
    throw new Error("Có lỗi xảy ra khi cập nhật sản phẩm.");
  }
}

export const getTransport = async (dispatch, accessToken) => {
  dispatch(listTransportStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_TRANSPORT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    dispatch(listTransportSuccess(response.data));
  }catch (error) {
    dispatch(listTransportError());
  }
}

export const getStatusOrder = async (dispatch, accessToken) => {
  dispatch(listStatusOrderStart())
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_STATUS_ORDER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    dispatch(listStatusOrderSuccess(response.data))
  }catch (error) {
    dispatch(listStatusOrderError())
  }
}

export const getDiscount = async (dispatch, accessToken) => {
  dispatch(listDiscountStart())
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_DISCOUNT,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(listDiscountSuccess(response.data))
  }catch (error) {
    dispatch(listDiscountError())
  }
}

export const getUserByRole = async (accessToken) => {
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_USER_BY_ROLE,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }catch (error) {
    throw error
  }
}

export const getStatusProduct = async (accessToken, dispatch) => {
  dispatch(listStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_STATUS_PRODUCT,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(listSuccess(response.data));
    // return response.data;
  }catch (error) {
    dispatch(listError());
  }
}

export const getSize = async (accessToken, dispatch) => {
  dispatch(listSizeStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_SIZE,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(listSizeSuccess(response.data));
    // return response.data;
  }catch (error) {
    dispatch(listSizeError());
  }
}

export const getCategory = async (accessToken, dispatch) => {
  dispatch(listCateStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_CATEGORY,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(listCateSuccess(response.data));
    // return response.data;
  }catch (error) {
    dispatch(listCateError());
  }
}

export const getStyle = async (accessToken, dispatch) => {
  dispatch(listStyleStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_STYLE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(listStyleSuccess(response.data))
    // return response.data;
  }catch (error) {
    dispatch(listStyleError())
  }
}

export const getByIdProduct = async (id, dispatch, accessToken) => {
  dispatch(byProductStart());
  try {
    const response = await axios.get("http://localhost:8080/api/v1/public/get-detail-product/"+id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(byProductSuccess(response.data))
  }catch (error) {
    dispatch(byProductError())
  }
}

export const deleteByIdProduct = async (id, accessToken) => {
  try {
    const url = `${process.env.REACT_APP_DELETE_PRODUCT}/${id}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    toast.success(`Bạn đã xóa sản phẩm có mã ${id} thành công !`);
  }catch (error) {
    toast.error("Bạn không có quyền xóa !");
  }
}

export const deleteByIdOrder = async (id, accessToken) => {
  try {
    const url = `${process.env.REACT_APP_DELETE_ORDER}/${id}`;
    console.log("API URL:", url);

    // Use DELETE method and pass headers correctly
    await axios.put(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // Pass token correctly
      },
    });

    toast.success("Đơn hàng đã được xóa thành công.");
  } catch (error) {
    console.error("Error deleting order:", error);

    // Handle specific error responses
    if (error.response?.status === 403) {
      toast.error("Bạn không có quyền xóa!");
    } else if (error.response?.status === 404) {
      toast.error("Đơn hàng không tồn tại!");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
  }
};

export const getListUser = async (pageNumber, sizePage, accessToken, dispatch) => {
  dispatch(listUserStart());
  try {
    const response = await axios.get(process.env.REACT_APP_LIST_STATUS_PRODUCT,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        pageNumber: pageNumber,
        sizePage: sizePage,
      }
    });
    dispatch(listUserSuccess(response.data));
    // return response.data;
  }catch (error) {
    dispatch(listUserError());
  }
}

export const getFindByIdProduct = async (id, accessToken) => {
  try {
    const url = `${process.env.REACT_APP_DETAIL_PRODUCT_BY_ID}/${id}`
    const response = await axios.get(url,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    console.log(response.data)
    return response.data;
    // return response.data;
  }catch (error) {
    return error;
  }
}