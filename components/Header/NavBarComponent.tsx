'use client'
import { Dialog, Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import DialogComponent from '../Reusables/Modal'
import SubmitButton from '../Reusables/SubmitButton'
import { Button } from '../ui/button'
import LandingPage from '../Pages/landingPage'
import LogoutButton from './LogOutButton'


const authenticatedNavigationItems = [
  { name: 'Home', href: '/', },
  { name: 'Water Types', href: '/waterTypes'},
  { name: 'Water Refilling Station Information', href: '/water_station'},
];

const notAuthenticatedNavigationItems = [
  { name: 'Home', href: '/', },
  {name: 'View all Water Stations', href: '/water-station-list'} ,
];

export default function NavbarComponent({ session} : {session: any}) {
  const pathname = usePathname();

      
  const navigationItems = session ? authenticatedNavigationItems : notAuthenticatedNavigationItems

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  //for the modal to work
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef(null)
  
  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleClose = () => {
    setIsOpen(false);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
 

  return (


    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigationItems.map((item) => (
              <a key={item.name} href={item.href} 
              // className="text-sm font-semibold leading-6 text-gray-900
              className={classNames(
                item.href === pathname ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={item.href === pathname ? 'page' : undefined}>
                {item.name}
              </a>
            ))}
          </div>

          {/* Login Link */}
          <LogoutButton session={session} isMobile={mobileMenuOpen}/>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Water Refilling Station</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigationItems.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    {session ? (
                      <form action="/auth/signout" method="post">
                       <Button type="submit" variant="destructive">
                         Sign out
                       </Button>
                   </form>
                    ) : (
                        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                        Login <span aria-hidden="true">&rarr;</span>
                      </Link>
                    )}
                   
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>

      </header>
    </div>
  )
}
