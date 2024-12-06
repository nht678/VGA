
import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { fetdataProfileHighSchool, actChangePassword } from '../../services/profileService';
import { actGetRegionAsync } from '../../store/region/action';
import { actHighSchoolUpdateAsync } from '../../store/highschool/action';
import { validateFormData, isRequired, isEmail, isPhone, isValidPassword } from '../formValidation';


export default function ProfileHighSchoolView() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileHighSchool, setProfileHighSchool] = useState([]);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const { regions = [] } = useSelector((state) => state.regionReducer);
    console.log(regions);

    let userId = localStorage.getItem('userId');

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

    const [formData, setFormData] = useState({
        regionId: "", // Giá trị mặc định là chuỗi rỗng
        name: "",
        email: "",
        address: "",
        phone: "",
    });
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
        regionId: [isRequired('Vùng')],
        address: [isRequired('Địa chỉ')],
    };

    const validateForm = () => {
        debugger
        const newErrors = validateFormData(formData, rules);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateProfileHighSchool = (e) => {
        e.preventDefault();
        debugger
        if (!validateForm()) return;
        dispatch(actHighSchoolUpdateAsync({ formData, id: userId }));
    }
    useEffect(() => {
        // code here
        fetdataProfileHighSchool(userId).then((data) => {
            setProfileHighSchool(data);
        });
    }, []);

    useEffect(() => {
        if (profileHighSchool) {
            setFormData({
                name: profileHighSchool?.account?.name || "",
                email: profileHighSchool?.account?.email || "",
                address: profileHighSchool?.address || "",
                phone: profileHighSchool?.account?.phone || "",
                regionId: profileHighSchool?.regionId, // Hoặc giá trị mặc định
            });
        }
    }, [profileHighSchool]);

    useEffect(() => {
        dispatch(actGetRegionAsync());
    }, []);



    return (
        <div className='flex justify-center  py-20 sm:grid-cols-6 '>
            <form className="w-full max-w-3xl" onSubmit={updateProfileHighSchool}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Hồ sơ</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Đây là thông tin sẽ được trình bày tới mọi người.
                        </p>

                        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8">
                            <div className="sm:col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Tên trường cấp 3
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
                            <div className="sm:col-span-full">
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
                            <div className="sm:col-span-full">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Địa chỉ
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        name="address"
                                        type="address"
                                        autoComplete="address"
                                        value={formData?.address || ""}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
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
                                    Vùng
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="regionId"
                                        name="regionId"
                                        onChange={handleChange}
                                        value={formData?.regionId || ""}
                                        autoComplete="regionId-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        {regions?.map((region) => (
                                            <option key={region.id} value={region?.id}>
                                                {region.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.regionId && <p className="text-red-500 text-sm">{errors.regionId}</p>}
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
