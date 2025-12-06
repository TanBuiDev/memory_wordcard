import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, Loader2, User } from 'lucide-react';
import { supabase } from '../../../config/supabase';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        // Gọi API Đăng ký
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                // Lưu thêm tên người dùng vào metadata
                data: {
                    full_name: data.fullName,
                },
            },
        });

        if (error) {
            setErrorMsg(error.message);
            setIsLoading(false);
        } else {
            setSuccessMsg('Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác thực.');
            setIsLoading(false);
        }
    };

    const password = watch("password");

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center mb-6">
                    <BrainCircuit className="h-12 w-12 text-indigo-600" />
                </Link>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Tạo tài khoản mới
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">

                    {successMsg ? (
                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-green-800 font-medium mb-4">{successMsg}</p>
                            <Link to="/login" className="block w-full text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
                                Đến trang Đăng nhập
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            {errorMsg && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                    <p className="text-sm text-red-700">{errorMsg}</p>
                                </div>
                            )}

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register("fullName", { required: "Vui lòng nhập họ tên" })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>
                                {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message as string}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Vui lòng nhập email",
                                            pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                                        })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message as string}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        {...register("password", { required: "Vui lòng nhập mật khẩu", minLength: { value: 6, message: "Tối thiểu 6 ký tự" } })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message as string}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        {...register("confirmPassword", {
                                            required: "Vui lòng nhập lại mật khẩu",
                                            validate: value => value === password || "Mật khẩu không khớp"
                                        })}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message as string}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 transition-all"
                            >
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Đăng ký tài khoản'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;