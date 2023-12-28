import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { login, signUp } from "../api/user";
import toast from "react-hot-toast";
const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (e, value) => {
        e.preventDefault();
        if (email.trim().length < 1) {
            toast.error("Enter email");
            return;
        } else if (password.trim().length < 1) {
            toast.error("Enter password");
            return;
        }
        const data = { email, password };
        let result = null;
        if (value === 'login') {
            result = await login(data);
        } else {
            result = await signUp(data);
        }
        if (result) {
            toast.success(result.message);
            localStorage.setItem('wLoggedIn', 1);
            if(value==='login')props.hideModal();
        }
    };

    return (
        <div className="fixed z-50 bg-black w-full h-full grid place-content-center bg-opacity-40">
            <form className="bg-white w-fit p-10 rounded-lg flex flex-col gap-5 text-gray-700" onSubmit={(e) => loginHandler(e, 'login')}>
                <div className="flex justify-between mb-5 items-center">
                    <h1 className="text-lg font-semibold ">Login / SignUp</h1>
                    <h1 className="text-2xl cursor-pointer" onClick={props.hideModal}><IoCloseSharp /></h1>
                </div>
                <input className="border border-gray-300 h-10 focus:outline-none pl-3 rounded-lg" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="border border-gray-300 h-10 focus:outline-none pl-3 rounded-lg" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="border border-gray-300 py-1 bg-green-400 text-white hover:bg-green-500 rounded-lg" type="submit">Login</button>
                <button className="border border-gray-300 py-1 bg-blue-400 text-white hover:bg-blue-500 rounded-lg" type="button" onClick={(e)=>loginHandler(e,'signup')}>SignUp</button>
            </form>
        </div>
    );
};

export default Login;

