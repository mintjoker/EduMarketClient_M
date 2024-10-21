import Categories from "../../components/user/Categories/Categories.jsx";
import CourseCatalog from "../../components/user/Course/CourseCatalog.jsx";
import FilterSidebar from "../../components/user/Course/FilterSidebar.jsx";
import CourseTabs from "../../components/user/Course/CourseTabs.jsx";

function CourseList() {
    return (
        <div className="w-full">

        </div>
    )
}

export default function Course() {
    return (
        <div className="pt-[70px] m-3">
            <Categories />
            <div className="m-6 mt-12">
                <h3 className="text-[#355676] text-[17.5px] font-bold">DANH MỤC</h3>
                <div className="flex gap-6">
                    <FilterSidebar />
                    <div className="w-full flex justify-center flex-wrap">
                        <div className="w-[90%]">
                            <div style={{ width: 'calc(100% - 20px)' }}>
                                <CourseTabs />
                            </div>
                            <div style={{ width: 'calc(100% - 20px)' }}>
                                <CourseList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}