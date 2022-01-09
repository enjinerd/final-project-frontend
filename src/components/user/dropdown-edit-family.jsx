import {
  Button,
  Divider,
  Dropdown,
  IconEdit,
  IconTrash,
  IconSettings,
} from "@supabase/ui";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useAuthStore from "stores/useAuthStore";
import useCitizen from "hooks/user/useCitizen";
import { useHistory } from "react-router-dom";

export function DropdownFamilyMenu({ dataId }) {
  const [isOpen, setOpen] = useState(false);
  const { token } = useAuthStore();
  const { deleteFamily } = useCitizen();
  const history = useHistory();

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }
  async function handleConfirm() {
    await deleteFamily({ token, id: dataId });
    closeModal();
    history.go(0);
  }
  return (
    <>
      <Dropdown
        overlay={[
          <Dropdown.Item icon={<IconEdit stroke="green" />}>
            <Button>Ubah Data</Button>
          </Dropdown.Item>,
          <Divider light />,
          <Dropdown.Item icon={<IconTrash stroke="red" />}>
            <Button
              className="text-red-600"
              onClick={() => setOpen(true)}
              danger={true}
            >
              Hapus Data
            </Button>
          </Dropdown.Item>,
        ]}
      >
        <Button type="primary">
          <IconSettings />
        </Button>
      </Dropdown>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Hapus Anggota Keluarga
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Apakah anda yakin ingin menghapus ?
                  </p>
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
