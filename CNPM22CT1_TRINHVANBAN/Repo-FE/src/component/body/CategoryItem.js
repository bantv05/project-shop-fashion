export const CategoryItem = () => {
        const data = [
            {
                id: 1,
                img: "https://theme.hstatic.net/200000000133/1001205759/14/home_category_1_img.jpg?v=1210",
                name: "Đầm"
            },
            {
                id: 2,
                img: "https://theme.hstatic.net/200000000133/1001205759/14/home_category_2_img.jpg?v=1210",
                name: "Áo sơ mi"
            },
            {
                id: 3,
                img: "https://theme.hstatic.net/200000000133/1001205759/14/home_category_3_img.jpg?v=1210",
                name: "Áo kiểu"
            },
            {
                id: 4,
                img: "https://theme.hstatic.net/200000000133/1001205759/14/home_category_4_img.jpg?v=1210",
                name: "Quần"
            }
        ]
  return (
      <div className="categoryitem container p-[50px]">
          <div className="p-3 card-title text-[30px] font-semibold">
              Danh mục nổi bật
          </div>
          <div className="card-body flex">
              {
                  data.map((item, index) => (
                      <div className="relative">
                          <div className="p-3">
                              <a href="#"><img src={item.img} alt="cate"/></a>
                          </div>
                          <div className="absolute bottom-[12px] left-[12px] h-[75px] w-[340px] bg-white bg-opacity-50 z-1
                          flex items-center justify-between">
                              <a href="#"><strong className="text-[22px] p-3">{item.name}</strong></a>
                              <a href="#" className="bg-white rounded-3xl p-3 mr-8 hover:bg-black hover:text-white">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                       strokeWidth={1.5} stroke="currentColor" className="size-5 rotate-45">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/>
                                  </svg>
                              </a>
                          </div>
                      </div>
                  ))
              }
          </div>
      </div>
  )
}