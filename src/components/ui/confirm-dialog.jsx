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
          className="fixed inset-0 overflow-y-auto z-10"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
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
              className="align-middle h-screen inline-block"
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
              <div className="align-middle bg-white inline-block max-w-md my-8 overflow-hidden p-6 rounded-2xl shadow-xl text-left transform transition-all w-full">
                <Dialog.Title
                  as="h3"
                  className="font-bold leading-6 text-gray-900 text-lg"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">{message} </p>
                </div>

                <div className="flex flex-row mt-4 space-x-3">
                  <button
                    type="button"
                    className="btn btn-error"
                    onClick={handleConfirm}
                  >
                    Konfirmasi
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
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
