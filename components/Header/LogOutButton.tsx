import React, { useState } from 'react';
import { Button } from '../ui/button';
import DialogComponent from '../Reusables/Modal';
import Link from 'next/link';

interface LogoutButtonProps {
  session: boolean;
  isMobile: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ session, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (event: any) => {
    event.preventDefault(); // Ensure that the default behavior is not preventing the dialog from opening
    setIsOpen(true);
  };
  const toggleClose = () => setIsOpen(false);

  console.log(isMobile, toggleOpen, "tried")

  return (
    <div className={isMobile ? 'flex justify-start pt-5' : 'hidden lg:flex lg:flex-1 lg:justify-end'}>
      {session ? (
        <>
          <Button onClick={toggleOpen}>Logout</Button>
          <div className={'absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'}>
            <DialogComponent isOpen={isOpen} onClose={toggleClose}>
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                Are you sure you want to log out?
              </h3>

              <div className="px-4 py-3 sm:flex sm:flex-row-reverse justify-start sm:px-6 gap-4">
                <div>
                  <form action="/auth/signout" method="post">
                    <Button type="submit" variant="destructive">
                      Sign out
                    </Button>
                  </form>
                </div>
                <div>
                  <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogComponent>
          </div>
        </>
      ) : (
        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
          Login <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
};

export default LogoutButton;
