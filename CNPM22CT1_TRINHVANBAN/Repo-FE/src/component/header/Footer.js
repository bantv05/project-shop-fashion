import React from "react";

export const Footer = () => {
    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Văn phòng</h2>
                        <img
                            src="//theme.hstatic.net/200000000133/1001205759/14/logo-footer.png?v=1456"
                            alt="Eva De Eva"
                            className="mb-4 w-48"
                        />
                        <ul className="text-sm space-y-2">
                            <li>
                                <strong>CÔNG TY TNHH MTV MỸ PHỤC</strong>
                            </li>
                            <li>
                                <strong>Trụ sở chính:</strong> 133 Thái Hà, Phường Trung Liệt,
                                Quận Đống Đa, Thành phố Hà Nội
                            </li>
                            <li>
                                <strong>Điện thoại:</strong> 1800 1731
                            </li>
                            <li>
                                <strong>Email:</strong> onlinesale@evadeeva.com.vn
                            </li>
                        </ul>
                    </div>

                    {/* Thông tin liên hệ */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>
                        <ul className="text-sm space-y-2">
                            <li>
                                <a href="/pages/gioi-thieu" className="hover:underline">
                                    Về chúng tôi
                                </a>
                            </li>
                            <li>
                                <a href="/pages/cau-hoi-thuong-gap" className="hover:underline">
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                            <li>
                                <a href="/blogs/tin-tuc" className="hover:underline">
                                    Sự kiện
                                </a>
                            </li>
                            <li>
                                <a href="/blogs/bai-viet-noi-bat" className="hover:underline">
                                    Tin tức
                                </a>
                            </li>
                            <li>
                                <a href="/blogs/sao-eva" className="hover:underline">
                                    SAO & Eva
                                </a>
                            </li>
                            <li>
                                <a href="/pages/he-thong-showroom" className="hover:underline">
                                    Hệ thống Showroom
                                </a>
                            </li>
                            <li>
                                <a href="/pages/tuyen-dung" className="hover:underline">
                                    Tuyển dụng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Chính sách bán hàng */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Chính sách bán hàng</h2>
                        <ul className="text-sm space-y-2">
                            <li>
                                <a href="/pages/chinh-sach-thanh-toan" className="hover:underline">
                                    Chính sách thanh toán
                                </a>
                            </li>
                            <li>
                                <a href="/pages/chinh-sach-van-chuyen" className="hover:underline">
                                    Chính sách vận chuyển
                                </a>
                            </li>
                            <li>
                                <a href="/pages/chinh-sach-doi-tra" className="hover:underline">
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a href="/pages/chinh-sach-bao-mat" className="hover:underline">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="/pages/chuong-trinh-vip" className="hover:underline">
                                    Chương trình thẻ VIP
                                </a>
                            </li>
                            <li>
                                <a href="/pages/huong-dan-chon-size" className="hover:underline">
                                    Hướng dẫn chọn size
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Đăng ký nhận tin */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h2>
                        <p className="text-sm mb-4">
                            Để cập nhật những sản phẩm mới, nhận thông tin ưu đãi đặc biệt và
                            thông tin giảm giá khác.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-l focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600">
                                Đăng ký
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-facebook-square text-xl"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-tiktok text-xl"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-youtube text-xl"></i>
                            </a>
                        </div>
                        <div className="mt-4">
                            <img
                                src="https://via.placeholder.com/120x40?text=Đã+thông+báo"
                                alt="Đã thông báo"
                                className="inline-block"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
                    <p>
                        Copyright © 2024{" "}
                        <a href="https://evadeeva.com.vn" className="hover:underline">
                            Eva De Eva
                        </a>
                        . Powered by{" "}
                        <a
                            href="https://www.haravan.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Haravan
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
