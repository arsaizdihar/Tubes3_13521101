import { Dialog, Disclosure } from "@headlessui/react";
import { Fragment, useState } from "react";
import Sidebar from "./Sidebar";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <Disclosure as={Fragment}>
      {({ open, close }) => (
        <>
          <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
            <Disclosure.Button className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open sidebar</span>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Disclosure.Button>
            <h1 className="flex-1 text-center text-base font-normal">
              New chat
            </h1>
            <button type="button" className="px-3">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          <Dialog open={open} onClose={() => close()} className="relative z-40">
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75 opacity-100" />
            <div className="fixed inset-0 z-40 flex">
              <Dialog.Panel
                className={
                  "relative flex w-full max-w-xs flex-1 translate-x-0 flex-col bg-gray-900"
                }
              >
                <div className="absolute right-0 top-0 -mr-12 pt-2 opacity-100">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    tabIndex={0}
                    onClick={() => close()}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <Sidebar mobile />
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
