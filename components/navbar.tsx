import AuthButtonServer from "@/app/auth/AuthButton/AuthButtonServer";
import Link from "next/link";

const NavBar = async ({ session} : {session: any}) => {  
    return ( 
        <div>
            {/* Links here */}

            {session ? <> 
                <nav>This is the navbar available in all authenticated pages</nav>
                <button>
                <Link href="/waterTypes">Water Products</Link>
                </button>
            </>: <>You must login first</>}
           

            {/* Button for Login and Logout */}
            <AuthButtonServer/> 

        </div>
     );
}
 
export default NavBar;