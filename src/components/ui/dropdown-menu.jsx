import { Menu, Transition } from "@headlessui/react";
import {
  PencilIcon as PencilIconOutline,
  TrashIcon as TrashIconOutline,
} from "@heroicons/react/outline";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { ConfirmDialog } from "components/ui";
import { Fragment, useEffect, useRef, useState } from "react";

export function DropdownMenu() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-bold text-white bg-black rounded-md bg-opacity-60 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white">
            Ubah
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-emerald-200 hover:text-emerald-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-emerald-500 text-white" : "text-gray-900"
                    } group flex flex-row space-x-2 rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <PencilIcon className="w-5 h-5" />
                    ) : (
                      <PencilIconOutline className="w-5 h-5" />
                    )}
                    <span>Ubah Data</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                <ConfirmDialog
                  isOpen={isOpen}
                  setOpen={setOpen}
                  handleConfirm={() => {
                    console.log("a");
                  }}
                  title="Konfirmasi"
                  message="Apakah anda benar-benar ingin menghapus data ini?"
                  titleAction="Hapus Data"
                  className="flex flex-row items-center w-full px-2 py-2 space-x-2 text-sm text-gray-900 rounded-md group hover:bg-red-500 hover:text-white"
                />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
