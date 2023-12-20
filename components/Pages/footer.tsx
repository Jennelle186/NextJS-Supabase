import Link from "next/link";

const Footer = () => {
    return ( 
        <footer className="text-center">
            <hr />
            <p className="text-center py-5">Created by <span className="font-black">
            <Link href="https://twitter.com/salnetxyz">Balan, Jaafar & Lorenzo</Link></span></p>
        </footer>
     );
}
 
export default Footer;