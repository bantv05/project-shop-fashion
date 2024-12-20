import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="flex justify-center items-center fixed inset-0 bg-white">
            <div className="w-full max-w-md p-4">
                <h2 className="text-center text-xl font-semibold mb-4">Xin lỗi không tìm thấy trang</h2>
                <p className="text-center mb-4">
                    Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã gõ nhầm URL? Hãy chắc chắn để kiểm tra chính tả.
                </p>

                <Link
                    to="/"
                    className="block text-center border border-gray-300 py-2 px-4 rounded text-black"
                >
                    Quay lại trang chủ
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
