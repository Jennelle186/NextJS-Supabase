import NavbarComponent from "./NavBarComponent";

const NavBar = async ({ session} : {session: any}) => {  
    return ( 
        <div>
            {/* Links here */}

            {session ? <> 
            <NavbarComponent/>
            </>: <>You must login first</>}
            {/* Button for Login and Logout */}
        </div>
     );
}
 
export default NavBar;
