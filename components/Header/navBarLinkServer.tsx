import NavbarComponent from "./NavBarComponent";

const NavBar = async ({ session} : {session: any}) => {  
    return ( 
        <div>
            {/* Links here */}
            
            <NavbarComponent session={session} />
            {/* Button for Login and Logout */}
        </div>
     );
}
 
export default NavBar;
