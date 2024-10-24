import React, { useState } from 'react';

function HomeIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 18V15"
                stroke='#2D5D90'
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
            <path
                d="M10.07 2.81997L3.14002 8.36997C2.36002 8.98997 1.86002 10.3 2.03002 11.28L3.36002 19.24C3.60002 20.66 4.96002 21.81 6.40002 21.81H17.6C19.03 21.81 20.4 20.65 20.64 19.24L21.97 11.28C22.13 10.3 21.63 8.98997 20.86 8.36997L13.93 2.82997C12.86 1.96997 11.13 1.96997 10.07 2.81997Z"
                strokeWidth="2"
                stroke='#2D5D90'
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
}

function ClassCard({ title, id, isActive, onClick }) {
    return (
        <div
            className="flex items-center justify-center p-6 h-12 cursor-pointer"
            style={{
                color: isActive ? "#2D5D90" : "#9CA3AF",
                borderBottom: isActive ? "2px solid #2D5D90" : "none"
            }}
            onClick={() => onClick(id)}
        >
            <p className="md:text-lg text-xs font-semibold ">{title}</p>
        </div>
    )
}

function MyCourses() {
    return (
        <div className="mt-5">
            <h2 className="text-xl font-bold text-sky-800 mb-4">Khóa học của tôi</h2>
            <div className="grid md:grid-cols-2 gap-5">
                <div className='flex gap-3 shadow-sm'>
                    <img src="/subject1.jpg" className='w-16 h-16 rounded-sm' alt="" />
                    <div>
                        <h1 className='font-bold text-sky-800'>Công phá vật lý 12 một cách toàn diện</h1>
                        <p className='text-sm font-medium text-sky-950'>Giáo viên: Nguyễn Văn A</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <img src="/subject1.jpg" className='w-16 h-16 rounded-sm' alt="" />
                    <div>
                        <h1 className='font-bold text-sky-800'>Công phá vật lý 12 một cách toàn diện</h1>
                        <p className='text-sm font-medium text-sky-950'>Giáo viên: Nguyễn Văn A</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <img src="/subject1.jpg" className='w-16 h-16 rounded-sm' alt="" />
                    <div>
                        <h1 className='font-bold text-sky-800'>Công phá vật lý 12 một cách toàn diện</h1>
                        <p className='text-sm font-medium text-sky-950'>Giáo viên: Nguyễn Văn A</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChangePassword() {
    return (
        <div className="mt-5">
            <h2 className="text-xl font-bold text-sky-800 mb-4">Đổi mật khẩu</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                    <input type="password" id="currentPassword" name="currentPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                    <input type="password" id="newPassword" name="newPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <button type="submit" className="px-4 py-2 bg-sky-700 text-white rounded-md hover:bg-blue-600">Đổi mật khẩu</button>
            </form>
        </div>
    );
}

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "Nguyễn Văn Hoàng",
        email: "hoang@gmail.com",
        description: "Nguyễn Văn Hoàng là một giáo viên tận tâm với hơn 10 năm kinh nghiệm trong lĩnh vực giáo dục. Anh đã giảng dạy tại nhiều trường học danh tiếng và có nhiều đóng góp quan trọng trong việc phát triển chương trình giảng dạy. Anh luôn nỗ lực để mang đến cho học sinh những bài học thú vị và bổ ích."
    });
    const [activeTab, setActiveTab] = useState('personal');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Ở đây bạn có thể thêm logic để gửi dữ liệu cập nhật lên server
        console.log("Updated user data:", userData);
    };

    return (
        <div className="pt-[70px]">
            <div className="flex items-center text-[#2D5D90] gap-3 w-full p-3">
                <HomeIcon />
                <div className="text-lg">&gt;</div>
                <span className="font-medium cursor-pointer">Thông tin cá nhân</span>
            </div>
            <div className='p-3 w-full' >
                <div className='flex gap-4'>
                    <img src="/teacher1.png" className='rounded-full w-20 h-20' alt="" />
                    <div className='w-full'>
                        <h1 className='font-bold text-sky-800'>{userData.name}</h1>
                        <p className='text-sm font-medium text-sky-950'>Giáo viên</p>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className="flex">
                        <ClassCard title="Thông tin cá nhân" id="personal" isActive={activeTab === 'personal'} onClick={setActiveTab} />
                        <ClassCard title="Khóa học đã mua" id="courses" isActive={activeTab === 'courses'} onClick={setActiveTab} />
                        <ClassCard title="Đổi mật khẩu" id="password" isActive={activeTab === 'password'} onClick={setActiveTab} />
                    </div>
                    <div className=" h-[1px] bg-[rgba(0,0,0,0.1)]"></div>
                </div>
                <div>
                    <div className="mt-5">
                        {activeTab === 'personal' && (
                            <div className="flex flex-col justify-center gap-2">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Chọn Avatar</label>
                                            <input
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={userData.name}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={userData.email}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={4}
                                                value={userData.description}
                                                onChange={handleInputChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Lưu
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <img src="/teacher1.png" className='w-52 h-52 rounded-md' alt="" />
                                        <p className="text-lg font-medium text-sky-950">Họ và tên: {userData.name}</p>
                                        <p className="text-md font-medium text-sky-950">Email: {userData.email}</p>
                                        <p className="text-md font-medium text-sky-950">Mô tả: {userData.description}</p>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="ml-auto w-[150px] mt-4 px-4 py-2 bg-sky-700 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Chỉnh sửa
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                        {activeTab === 'courses' && <MyCourses />}
                        {activeTab === 'password' && <ChangePassword />}
                    </div>
                </div>
            </div>
        </div>
    )
}