import {useState} from "react";
import "../App.css"
import {Link} from "react-router-dom";
import {path} from ".././ultis/path";

export const Sidebar = () => {

    const items = [
        {
            id: 1,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>,
            text: "Product management",
            path: path.ADMIN_PRODUCT
        },
        {
            id: 2,
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>,
            text: "Order management",
            path: path.ADMIN_ORDER
        }
        // {
        //     id: 3,
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        //     </svg>,
        //     text: "Quản lý người dùng",
        //     path: path.ADMIN_USER
        // },
        // {
        //     id: 4,
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        //     </svg>,
        //     text: "Quản lý giảm giá sản phẩm",
        //     path: path.ADMIN_SALE
        // },
        // {
        //     id: 5,
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        //     </svg>,
        //     text: "Hồ sơ",
        //     path: path.ADMIN_PROFILE
        // },
    ];
    const [activeId, setActiveId] = useState(0);
    return (
        <div className="sidebar h-screen">
            <div className="sidebar flex flex-col h-12 z-10">
                <Link to={path.ADMIN_PRODUCT}>
                    <div className='logo px-3 py-4 flex items-center justify-center'>
                        {/*<img src="https://cdn-icons-png.flaticon.com/512/24/24438.png" alt="logo"*/}
                        {/*     width="70"*/}
                        {/*     height="24"/>*/}
                        <div className="flex flex-col">
                            <p>𝓑𝓪𝓷 𝓢𝓽𝓸𝓻𝓮</p>
                            <p>𝓐𝓓𝓜𝓘𝓝-𝓕𝓐𝓢𝓗𝓘𝓞𝓝</p>
                        </div>
                    </div>
                </Link>
                {
                    items.map((item, i) => (
                        <Link key={item.id} to={item.path}>
                            <div key={item?.id || i}
                                 className={`flex px-3 py-4 gap-3 cursor-pointer box-content border-b-2 border-gray-200 border-r-0 hover:text-cyan-600 hover:border-l-[6px] hover:border-cyan-600 hover:border-0
                ${activeId === item.id ? 'border-l-[6px] border-cyan-600 border-0' : ''}`}
                                 onClick={() => {
                                     setActiveId(item.id)
                                 }}
                            >
                                <div>
                                    {item.icon}
                                </div>
                                <div>
                                    {item.text}
                                </div>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}