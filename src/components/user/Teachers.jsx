import Teacher1 from '../../assets/teacher1.png'

function TeacherCard({ fullName, img }) {
    return (
        <div className="w-[120px] h-[174px] min-w-[120px] rounded-xl flex justify-center items-end p-2" style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
            <b className='text-white text-[12px] font-bold w-[80%] text-center'>Thầy {fullName}</b>
        </div>
    )
}

export default function Teachers() {
    return (
        <div className="bg-[#FFFFFF] rounded-xl p-5 pb-0 mt-8 w-full">
            <div className="flex">
                <h3 className="text-[#355676] text-[15.75px] font-bold">Giáo viên EduMarket</h3>
                <i className="ml-auto text-[#2D5D90]">Xem tất cả</i>
            </div>
            <div className="flex pt-4 pb-6 gap-6 hover:overflow-x-auto overflow-x-hidden h-[220px]">
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
                <TeacherCard fullName={"Hoàng"} img={Teacher1} />
            </div>
        </div>
    )
}