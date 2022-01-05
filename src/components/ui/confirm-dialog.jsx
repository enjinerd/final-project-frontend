import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export function ConfirmDialog({
  isOpen,
  setOpen,
  handleConfirm,
  message,
  title,
  className,
  titleAction,
  disabled,
}) {
  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  return (
    <>
      <button
        type="btn btn-block"
        onClick={openModal}
        disabled={disabled}
        className={className}
      >
        {titleAction}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          onClose={closeModal}
        >
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message} </p>
                </div>

                <div className="flex flex-row mt-4 space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-400 via-red-500 to-yellow-600 rounded-md border border-transparent transition duration-500 transform hover:bg-yellow-400 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={handleConfirm}
                  >
                    Konfirmasi
                  </button>
                  <button
                    type="button"
                    className="text-blue inline-flex justify-center px-4 py-2 text-sm font-medium bg-blue-100 rounded-md border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
