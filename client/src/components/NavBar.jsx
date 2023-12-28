import toast from "react-hot-toast";
import { logout } from "../api/user";

const NavBar = (props) => {
    const logoutHandler = async () => {
        const result = await logout();
        if (result) {
            localStorage.removeItem('wLoggedIn')
            toast.success(result.message);
            props.logoutFn();
        }
    };
    
    return (
        <div className="w-full text-white flex justify-end mt-5 mb-5">
            {
                props.isLoggedIn === true ?
                    <button className="border px-4 py-1 rounded-full hover:bg-white hover:bg-opacity-20" onClick={logoutHandler}>Logout</button>
                    :
                    <button className="border px-4 py-1 rounded-full hover:bg-white hover:bg-opacity-20" onClick={props.openLogin}>Login</button>
            }
        </div>
    );
};

export default NavBar;
