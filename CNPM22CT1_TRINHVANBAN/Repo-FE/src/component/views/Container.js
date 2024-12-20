import {TopBar} from "../header/TopBar";
import {MainHeader} from "../header/MainHeader";
import {SlickCustom} from "../header/SlickCustom";
import {CategoryItem} from "../body/CategoryItem";
import {ProductList} from "./ProductList";
import {UpSale} from "../body/UpSale";
import {Footer} from "../header/Footer";

export const Container = () => {
  return (
      <div className="container w-full flex flex-col">
          <div className="z-0">
              <SlickCustom/>
          </div>
          <div>
              <CategoryItem/>
          </div>
          <div>
              <UpSale/>
          </div>
          {/*<ProductList/>*/}
      </div>
  )
}