import AuthButtonServer from "@/app/auth/AuthButton/AuthButtonServer";
import Link from "next/link";


const NavBar = () => {
    return ( 
        <div>
            This is the Navbar
            {/* Links here */}

            <Link href="/waterTypes">Water Products</Link>


            {/* Button for Login and Logout */}
            <AuthButtonServer/> 

        </div>
     );
}
 
export default NavBar;