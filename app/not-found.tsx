import Link from "next/link"

export default function NotFound(){
    return (
        <div>
            <h1>Not found</h1>
            <p>Sorry, this page does not exist </p>
            <Link href="/">
            <button>Go back to the homepage</button>
            </Link>
          
        </div>
    )
}