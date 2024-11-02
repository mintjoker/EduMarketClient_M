import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Book, Clock, FileText, Paperclip, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CourseManager() {
    const [course, setCourse] = useState({
        id: '',
        name: '',
        instructor: 'Chọn',
        description: '',
        students: null,
        status: false,
        fee: '',
        image: '',
        sections: []
    });


    const [isInstructorDropdownOpen, setIsInstructorDropdownOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(course.image);
    const fileInputRef = useRef(null);

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        async function callApiGetInstructors() {
            const res = await fetch(`${process.env.VITE_API}/api/v1/users/instructor`, {
                method: "GET"
            });

            const data = await res.json();
            if (data.status == true) {
                setInstructors(data.data.instructors);
            } else {
                alert("Lỗi máy chủ chúng tôi sẽ chuyển hướng sang đội ngũ hỗ trợ");
                window.location.href = 'https://github.com/zunohoang';
            }
        }
        callApiGetInstructors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleInstructorSelect = (instructor) => {
        setCourse(prev => ({ ...prev, instructor }));
        setIsInstructorDropdownOpen(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setCourse(prev => ({ ...prev, image: file.name }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const addLesson = (sectionIndex) => {
        const newLesson = {
            title: '',
            document: '',
            url: 'none',
            description: ''
        };
        const newSections = [...course.sections];
        newSections[sectionIndex].lessons.push(newLesson);
        setCourse(prev => ({ ...prev, sections: newSections }));
    };

    const updateLesson = (sectionIndex, lessonIndex, field, value) => {
        const newSections = [...course.sections];
        newSections[sectionIndex].lessons[lessonIndex][field] = value;
        setCourse(prev => ({ ...prev, sections: newSections }));
    };

    const removeLesson = (sectionIndex, lessonIndex) => {
        const newSections = [...course.sections];
        newSections[sectionIndex].lessons.splice(lessonIndex, 1);
        setCourse(prev => ({ ...prev, sections: newSections }));
    };

    const addSection = () => {
        const newSection = {
            title: '',
            lessons: []
        };
        setCourse(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
    };

    const updateSection = (sectionIndex, field, value) => {
        const newSections = [...course.sections];
        newSections[sectionIndex][field] = value;
        setCourse(prev => ({ ...prev, sections: newSections }));
    };

    const removeSection = (sectionIndex) => {
        const newSections = [...course.sections];
        newSections.splice(sectionIndex, 1);
        setCourse(prev => ({ ...prev, sections: newSections }));
    };

    const handleCreateCourse = async () => {
        // console.log('Course created', course);
        // get image file
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('course', JSON.stringify(course));

        const res = await fetch(`${process.env.VITE_API}/api/v1/courses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        const data = await res.json();
        console.log(data);
        if (data.status) {
            alert('Khóa học đã được tạo');
            window.location.href = '/admin/courses';
        }
    }

    return (
        <div className="course-manager bg-gray-100 min-h-screen p-6">
            <h1 className="font-medium text-2xl mb-6 text-gray-800">Khóa học</h1>
            <div className="mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">Thêm khóa học</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên khóa học</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={course.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Giáo viên</label>
                        <div className="mt-1 relative">
                            <button
                                type="button"
                                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onClick={() => setIsInstructorDropdownOpen(!isInstructorDropdownOpen)}
                            >
                                <span className="block truncate">
                                    {course.instructor.role ? "[" : "Chọn"}{course.instructor.role}{course.instructor.role ? "]" : ""} {course.instructor.fullName} - {course.instructor.email}
                                </span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </button>
                            {isInstructorDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {instructors.map((instructor) => (
                                        <div
                                            key={instructor._id}
                                            className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
                                            onClick={() => handleInstructorSelect(instructor)}
                                        >
                                            [{instructor.role}] {instructor.fullName} - {instructor.email}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={course.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                            rows="4"
                        />
                    </div>
                    <div>
                        <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Học phí</label>
                        <input
                            type="number"
                            id="fee"
                            name="fee"
                            value={course.fee}
                            placeholder='200'
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="mt-1 block w-full"
                        />
                        {previewImage && (
                            <img src={previewImage} alt="Preview" className="mt-4 h-32 w-32 object-cover" />
                        )}
                    </div>
                    <div>
                        <p className="block text-sm font-medium text-gray-700">Bài giảng</p>
                        <div className="flex flex-col gap-3 mt-4">
                            {course.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="p-3 mb-6 border border-gray-200 rounded-md overflow-hidden items-center">
                                    <div className="bg-gray-50 p-4 flex items-center gap-3 justify-between">
                                        <input
                                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={section.title}
                                            onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                                        />
                                        <button onClick={() => addLesson(sectionIndex)} className="flex gap-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                            <PlusCircle /> Bài học
                                        </button>
                                        <button onClick={() => removeSection(sectionIndex)} className="flex gap-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                                            <Trash2 /> Xóa
                                        </button>
                                        <button onClick={() => setCourse(prev => ({
                                            ...prev,
                                            sections: prev.sections.map((sec, i) =>
                                                i === sectionIndex ? { ...sec, expanded: !sec.expanded } : sec
                                            )
                                        }))} className="flex gap-2 p-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300">
                                            {section.expanded ? <ChevronUp /> : <ChevronDown />}
                                        </button>
                                    </div>
                                    {section.expanded && section.lessons.map((lesson, lessonIndex) => (
                                        <div key={lessonIndex} className="ml-10 flex flex-col gap-2 mt-2 p-4 border-t border-gray-200">
                                            <div className='flex items-center'>
                                                <Book className="mr-2 text-blue-500" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Tiêu đề bài học"
                                                    value={lesson.title}
                                                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'title', e.target.value)}
                                                    className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className='flex items-center'>
                                                <Paperclip className="mr-2 mt-2 text-purple-500" size={20} />
                                                <input
                                                    type="file"
                                                    placeholder="Tài liệu"
                                                    value={lesson.document}
                                                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'document', e.target.value)}
                                                    className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className='flex items-center w-full'>
                                                <Clock className="mr-2 text-green-500" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="URL"
                                                    value={lesson.url}
                                                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'url', e.target.value)}
                                                    className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className='flex items-center'>
                                                <FileText className="mr-2 text-yellow-500" size={20} />
                                                <textarea
                                                    placeholder="Mô tả bài học"
                                                    value={lesson.description}
                                                    onChange={(e) => updateLesson(sectionIndex, lessonIndex, 'description', e.target.value)}
                                                    className="p-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    rows="2"
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeLesson(sectionIndex, lessonIndex)}
                                                className="self-end mt-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                                            >
                                                <Trash2 />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <button
                                onClick={addSection}
                                className="gap-2 bg-sky-700 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
                            >
                                <PlusCircle /> Thêm chương
                            </button>
                        </div>
                    </div>
                    <button onClick={handleCreateCourse} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Lưu khóa học
                    </button>
                </form>
            </div>
        </div>
    );
}