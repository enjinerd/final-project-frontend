import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

export function ExpandableArea({ children, title }) {
  return (
    <div className="w-full">
      <div className="w-full p-2 mx-auto bg-white border-b-2 border-gray-300 rounded-lg">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-emerald-200 text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                <span>{title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-emerald-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
