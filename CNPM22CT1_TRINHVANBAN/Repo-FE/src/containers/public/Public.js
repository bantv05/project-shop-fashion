import {Outlet} from "react-router-dom"
import {MainHeader} from "../../component/header/MainHeader";
import {TopBar} from "../../component/header/TopBar";
import {Footer} from "../../component/header/Footer";
export const Public = () => {
    return (
        <div>
            <header className="fixed bg-white w-full z-50">
                <TopBar/>
                <MainHeader/>
            </header>
            <div className="pt-[120px]">
                <Outlet />
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}