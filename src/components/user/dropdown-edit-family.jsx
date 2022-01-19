import {
  Button,
  Divider,
  Dropdown,
  IconEdit,
  IconTrash,
  IconSettings,
} from "@supabase/ui";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useAuthStore from "stores/useAuthStore";
import useCitizen from "hooks/user/useCitizen";
import { useHistory, Link } from "react-router-dom";

export function DropdownFamilyMenu({ dataId, userData }) {
  userData.id = dataId;
  const [isOpen, setOpen] = useState(false);
  let [count, setCount] = useState(0);
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
    await deleteFamily(dataId, token);
    closeModal();
    setCount(count++);
  }

  useEffect(() => {
    if (count > 0) {
      history.push("/user/family-member");
    }
  }, [count]);

  return (
    <>
      <Dropdown
        overlay={[
          <Dropdown.Item icon={<IconEdit stroke="green" />}>
            <Link
              to={{
                pathname: `/user/family-member/edit`,
                state: userData,
              }}
            >
              <Button>Ubah Data</Button>
            </Link>
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
