import {Sidebar} from "../../component/Sidebar";
import {Outlet} from "react-router-dom"
import Navbar from "../../component/Navbar";

export const HomeAdmin = () => {
  return (
      <>
          <div className="flex flex-col bg-gray-100">
              <div className="sticky top-0 z-10 bg-white shadow-md">
                  <Navbar/>
              </div>
              <div className="flex flex-1">
                  {/* Sidebar */}
                  <aside className="hidden lg:block w-1/4 xl:w-1/5 bg-white shadow-md p-4">
                      <Sidebar/>
                  </aside>

                  {/* Content */}
                  <main className="flex-1 pl-6 pb-6 overflow-auto">
                      <Outlet/>
                  </main>
              </div>

              {/* Footer */}
              <footer className="bg-white shadow-md p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 <a href="https://sinhvien.dau.edu.vn/dashboard.html" className="hover:underline">Trịnh Văn Ban - 22CT3</a>. Trường đại học Kiến trúc Đà Nẵng.
          </span>
                      {/*<ul className="flex mt-2 md:mt-0 space-x-4 text-sm text-gray-500 dark:text-gray-400">*/}
                      {/*    <li><a href="#" className="hover:underline">About</a></li>*/}
                      {/*    <li><a href="#" className="hover:underline">Privacy Policy</a></li>*/}
                      {/*    <li><a href="#" className="hover:underline">Licensing</a></li>*/}
                      {/*    <li><a href="#" className="hover:underline">Contact</a></li>*/}
                      {/*</ul>*/}
                  </div>
              </footer>
          </div>
      </>
  )
}