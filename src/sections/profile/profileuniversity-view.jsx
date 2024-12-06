
import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileUniversity, actupdateProfileUniversity, actdeleteProfileUniversity, actcreateProfileUniversity, actChangePassword } from '../../services/profileService';
import { actGetRegionAsync } from '../../store/region/action';
import { validateFormData, isRequired, isEmail, isPhone } from '../formValidation';
import { actUniversityUpdateAsync } from '../../store/university/action';


export default function ProfileUniversityView() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileUniversity, setProfileUniversity] = useState([]);
    const [universityLocations, setuniversityLocations] = useState([]);
    const [errors, setErrors] = useState({});

    let accountId = localStorage.getItem('accountId');
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
        const response = await actChangePassword({ newPassword, id: accountId });
        if (response.status === 200) {
            closeDialog();
        }


    };

    const dispatch = useDispatch();
    const { regions = [] } = useSelector((state) => state.regionReducer);
    console.log(regions);

    let userId = localStorage.getItem('userId');

    console.log('profileUniversity', profileUniversity);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        type: "",
        code: "",
        establishedYear: "",
        description: "",
    });
    const [formDataLocation, setFormDataLocation] = useState([]);
    console.log('formDataLocation', formDataLocation);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const rules = {
        name: [isRequired('Tên')],
        email: [isRequired('Email'), isEmail],
        phone: [isRequired('Số điện thoại'), isPhone],
    };

    const validateForm = () => {
        const newErrors = validateFormData(formData, rules);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateProfileUniversity = (e) => {
        e.preventDefault();
        // if (!validateForm()) return;
        dispatch(actUniversityUpdateAsync({ formData, id: userId }));
    }


    const universityType = [
        { Type: 1, name: 'Trường công lập' },
        { Type: 2, name: 'trường tư thục' },
    ];

    const establishedYearUni = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

    // Hàm cập nhật dòng dữ liệu
    const handleUpdate = async (index) => {
        const updatedItem = universityLocations[index];
        const payload = {
            regionId: updatedItem?.regionId,
            address: updatedItem?.address,
        };


        try {
            const response = actupdateProfileUniversity({ id: updatedItem?.id, formData: payload });
            if (response.status === 200) {
                const updatedData = await response?.data.json();

                // Cập nhật state trong giao diện
                setuniversityLocations((prev) =>
                    prev.map((item, i) => (i === index ? updatedData : item))
                );
            }
        } catch (error) {
            console.error("Error updating location:", error);
        }
    };

    // Hàm xử lý xóa dòng dữ liệu
    const handleDelete = async (index) => {
        const deletedItem = universityLocations[index];
        console.log('deletedItem', deletedItem);
        try {
            const response = await actdeleteProfileUniversity(deletedItem?.id);
            if (response.status === 200) {
                // Xóa item trong state
                setuniversityLocations((prev) => prev.filter((_, i) => i !== index));
            }
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };

    const [reloadpage, setReloadPage] = useState(false);


    const handleCreateLocation = async () => {
        const response = await actcreateProfileUniversity({ formDataLocation, id: userId });
        if (response.status === 200) {
            setFormDataLocation([]);
            setReloadPage((prev) => !prev);
        }
    }
    // Hàm xử lý thêm dòng mới
    const addRow = () => {
        setFormDataLocation((prev) => [...prev, { regionId: "", address: "" }]);
    };
    // Hàm xử lý tạo mới

    const deleteRow = (index) => {
        setFormDataLocation((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        // code here
        fetchProfileUniversity(userId).then((data) => {
            setProfileUniversity(data);
        });
    }, [reloadpage]);

    useEffect(() => {
        if (profileUniversity) {
            setFormData({
                name: profileUniversity?.account?.name || "",
                email: profileUniversity?.account?.email || "",
                phone: profileUniversity?.account?.phone || "",
                code: profileUniversity?.code || "",
                establishedYear: profileUniversity?.establishedYear || "",
                description: profileUniversity?.description || "",
                type: profileUniversity?.type || "",
            });
            setuniversityLocations(profileUniversity?.universityLocations || []);
        }
    }, [profileUniversity]);

    useEffect(() => {
        dispatch(actGetRegionAsync());
    }, []);

    return (
        <div className='flex justify-center  py-20 sm:grid-cols-6 '>
            <form className="w-full max-w-3xl" onSubmit={updateProfileUniversity}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Hồ sơ</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Đây là thông tin sẽ được trình bày tới mọi người.
                        </p>

                        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8">
                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mã trường
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        value={formData?.code || ""}
                                        onChange={handleChange}
                                        autoComplete="code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tên trường đại học
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData?.name || ""}
                                        onChange={handleChange}
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                    Mô tả
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        value={formData?.description || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Số điểm
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="point"
                                        name="point"
                                        type="text"
                                        defaultValue={profileUniversity?.account?.wallet?.goldBalance || ""}
                                        readOnly
                                        autoComplete="point"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Địa chỉ email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData?.email || ''}
                                        autoComplete="email"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mật khẩu
                                </label>

                                <button
                                    type="button"
                                    onClick={openDialog}
                                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Đổi mật khẩu
                                </button>

                                {/* Dialog */}
                                <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" open={isDialogOpen} onClose={closeDialog}>
                                    <DialogBackdrop className="fixed inset-0 bg-opacity-30" transition >
                                        <DialogPanel className="flex items-center justify-center min-h-screen">
                                            <div className="bg-white p-4 rounded-md shadow-lg w-96">
                                                <DialogTitle className="flex items-center gap-2">
                                                    <Typography variant="h6">Vui lòng nhập mật khẩu mới của bạn</Typography>
                                                </DialogTitle>
                                                {/* Input mật khẩu mới */}
                                                <div className="mt-4">
                                                    <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mật khẩu mới
                                                    </label>
                                                    <input
                                                        id="newPassword"
                                                        name="newPassword"
                                                        type="password"
                                                        autoComplete="newPassword"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="block w-full rounded-md border py-1.5 mt-2"
                                                    />

                                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Xác nhận mật khẩu
                                                    </label>
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="block w-full rounded-md border py-1.5 mt-2"
                                                    />

                                                    <div className="mt-4 flex justify-end gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={closeDialog}
                                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                        >
                                                            Hủy
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleSave}
                                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                                        >
                                                            Lưu
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogPanel>
                                    </DialogBackdrop>
                                </Dialog>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Số điện thoại
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        value={formData?.phone || ""}
                                        autoComplete="phone"
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Thể loại trường
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="type"
                                        name="type"
                                        onChange={handleChange}
                                        value={formData?.type || ""}
                                        autoComplete="regionId-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        {universityType.map((item) => (
                                            <option key={item.Type} value={item.Type}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Năm thành lập
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="type"
                                        name="type"
                                        onChange={handleChange}
                                        value={formData?.establishedYear || ""}
                                        autoComplete="regionId-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        {establishedYearUni.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                {universityLocations.map((item, index) => (
                                    <div key={index} className="col-span-full border p-4 rounded-md shadow-sm mb-4">
                                        {/* Chọn vùng */}
                                        <div>
                                            <label htmlFor={`regionId-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                Vùng
                                            </label>
                                            <select
                                                id={`regionId-${index}`}
                                                name="regionId"
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    setuniversityLocations((prev) =>
                                                        prev.map((loc, i) =>
                                                            i === index ? { ...loc, regionId: value } : loc
                                                        )
                                                    );
                                                }}
                                                value={item.regionId || ""}
                                                className="block w-full rounded-md border py-1.5 mt-2"
                                            >
                                                {regions.map((region) => (
                                                    <option key={region.id} value={region.id}>
                                                        {region.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Nhập địa chỉ */}
                                        <div className="mt-4">
                                            <label htmlFor={`address-${index}`} className="block text-sm font-medium leading-6 text-gray-900">
                                                Địa chỉ
                                            </label>
                                            <input
                                                id={`address-${index}`}
                                                name="address"
                                                type="text"
                                                value={item.address || ""}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    setuniversityLocations((prev) =>
                                                        prev.map((loc, i) =>
                                                            i === index ? { ...loc, address: value } : loc
                                                        )
                                                    );
                                                }}
                                                className="block w-full rounded-md border py-1.5 mt-2"
                                            />
                                        </div>

                                        {/* Nút Update và Delete */}
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                type='button'
                                                onClick={() => handleUpdate(index)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            >
                                                Cập nhật
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => handleDelete(index)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {formDataLocation.map((item, index) => (
                                    <div key={index} className="col-span-full border p-4 rounded-md shadow-sm mb-4">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Vùng
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id={`regionId-${index}`}
                                                name="regionId"
                                                onChange={(e) =>
                                                    setFormDataLocation((prev) =>
                                                        prev.map((row, i) =>
                                                            i === index
                                                                ? { ...row, regionId: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                value={item.regionId || ""}
                                                className="block w-full rounded-md border py-1.5 mt-2 mb-4"
                                            >
                                                {regions.map((region) => (
                                                    <option key={region.id} value={region.id}>
                                                        {region.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Địa chỉ
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                value={item.address || ""}
                                                onChange={(e) =>
                                                    setFormDataLocation((prev) =>
                                                        prev.map((row, i) =>
                                                            i === index
                                                                ? { ...row, address: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                className="block w-full rounded-md border py-1.5 mt-2 mb-4"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <button
                                                type="button"
                                                onClick={() => deleteRow(index)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addRow}
                                    className="mt-4 mr-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Thêm dòng địa chỉ mới
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCreateLocation}
                                    className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Tạo địa chỉ mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}
