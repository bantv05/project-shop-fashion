const Test = () => {
    return (
        <div className="fashion flex items-center justify-center h-screen">
            <div className="p-10 bg-white rounded-xl shadow-xl text-center relative">
                <div className="w-full items-center justify-centerf flex">
                    <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/03/Logo-DH-Kien-Truc-Da-Nang-DAU.png"
                        alt="example"
                        className="h-16 w-16"
                    />
                </div>
                <h1 className="text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Trường đại học kiến trúc đà nẵng
                </h1>
                <p className="mt-4 text-lg text-gray-700">
                    Công nghệ phần mềm 22CT1 - Trịnh Văn Ban
                    React JS và Tailwind CSS.
                </p>
            </div>
        </div>
    )
}
export default Test;