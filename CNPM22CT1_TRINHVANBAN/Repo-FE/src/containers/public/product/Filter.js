import {useSelector} from "react-redux";

export const Filter = ({productLength}) => {
    const classList = "hidden group-hover:block absolute bg-white rounded-md left-0 p-3 pr-5 w-max text-[14px] font-semibold z-50";
    const liSearch = "relative items-center justify-center text-[14px] group hover:block";
    const cate = [
        {
            id: 1,
            name: "Đầm"
        },
        {
            id: 2,
            name: "Áo kiểu"
        },
        {
            id: 3,
            name: "Chân váy"
        },
        {
            id: 4,
            name: "Quần"
        },
        {
            id: 5,
            name: "HomeWear"
        },
        {
            id: 6,
            name: "Phụ kiện"
        }
    ]

    const size = [
        {
            id: 1,
            name: "S"
        },
        {
            id: 2,
            name: "M"
        },
        {
            id: 3,
            name: "L"
        },
        {
            id: 4,
            name: "XL"
        },
        {
            id: 5,
            name: "XXL"
        }
    ]
    return (
      <div className="ProductFashion container">
          <div className="first-top p-3 px-10 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                  <b className="text-[22px]">Tất cả sản phẩm</b>
                  <p className="text-[16px]"><strong>{productLength} </strong>Sản phẩm</p>
              </div>
              <div className="flex gap-4 items-center">
                  <b className="text-[16px]">Bộ lọc: </b>
                  <div className="pr-10">
                      <ul className="flex gap-8 items-center justify-center text-[14px]">
                          <li className={liSearch}>Loại sản phẩm
                              <div className="absolute bottom-[0.25rem] left-[97px] hover:block">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                       className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                      <path fillRule="evenodd"
                                            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                            clipRule="evenodd"/>
                                  </svg>
                              </div>
                              <ul className="hidden group-hover:block absolute bg-white rounded-md left-0 p-3 pr-5 w-max text-[14px] z-50">
                                  {
                                      cate.map((item, index) => (
                                          <li key={item.name} className="flex items-center cursor-pointer gap-3 gap-y-1">
                                              <input className="cursor-pointer relative w-[18px] h-[18px] " type="checkbox" name="name" id={item.id} value={item.name} />
                                              <label className="cursor-pointer" for={item.id}>{item.name}</label>
                                          </li>
                                      ))
                                  }
                              </ul>
                          </li>
                          <li className={liSearch}>Size
                              <div className="absolute bottom-[0.25rem] left-[33px] hover:block">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                       className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                      <path fillRule="evenodd"
                                            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                            clipRule="evenodd"/>
                                  </svg>
                              </div>
                              <ul className="hidden group-hover:block absolute bg-white rounded-md w-[100px] left-0 p-3 pr-5 text-[14px] z-50">
                                  {
                                      size.map((item, index) => (
                                          <li key={item.name}
                                              className="flex items-center cursor-pointer gap-3 gap-y-1">
                                              <input className="cursor-pointer relative w-[18px] h-[18px] "
                                                     type="checkbox" name="name" id={item.id} value={item.name}/>
                                              <label className="cursor-pointer" htmlFor={item.id}>{item.name}</label>
                                          </li>
                                      ))
                                  }
                              </ul>
                          </li>
                          <li className={liSearch}>Khoảng giá
                              <div className="absolute bottom-[0.25rem] left-[76px] hover:block">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                       className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                      <path fillRule="evenodd"
                                            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                            clipRule="evenodd"/>
                                  </svg>
                              </div>
                          </li>
                          <li className={liSearch}>Theo dịp
                          <div className="absolute bottom-[0.25rem] left-[60px] hover:block">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                   className="size-3 transition-transform duration-300 group-hover:rotate-180">
                                  <path fillRule="evenodd"
                                        d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                                        clipRule="evenodd"/>
                              </svg>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
</div>
)
}