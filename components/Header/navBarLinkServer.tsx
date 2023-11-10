import NavbarComponent from "./NavBarComponent";
import HeaderLanding from './headerLanding'

const NavBar = async ({ session} : {session: any}) => {  
    return ( 
        <div>
            {/* Links here */}

            {session ? <> 
            <NavbarComponent/>
            
            </>: <><HeaderLanding/>You must login first
            
            </>}
            {/* Button for Login and Logout */}
        </div>
     );
}
 
export default NavBar;
