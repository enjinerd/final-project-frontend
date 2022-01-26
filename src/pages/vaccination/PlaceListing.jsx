import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { ExpandableArea, ConfirmDialog } from "components/ui";
import { useState, useEffect } from "react";
import { useCitizen } from "hooks/user";
import { useFetchHFById } from "hooks/vaccination";
import useAuthStore from "stores/useAuthStore";
import { toGmapURL } from "helpers";

export function PlaceListing({ match }) {
  const [isOpen, setOpen] = useState(false);
  const sessionId = match.params.sessionId;
  const { token, isAuthenticated } = useAuthStore();
  const [isRegistered, setRegistered] = useState(false);

  const { registerVaccination, vaccinationSession } = useCitizen();

  const { data, isLoading, error } = useFetchHFById({ id: sessionId });
  const handleRegisterSession = async (jwt, sessionId) => {
    await registerVaccination(jwt, sessionId);
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  useEffect(async () => {
    let data = await vaccinationSession(token);
    if (data?.session.length > 0) {
      setRegistered(true);
    }
  }, [data]);

  return (
    <Page>
      <PageContent>
        {isLoading ? (
          <div className="text-center">
            <div className="flex justify-center items-center p-12">
              <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin dark:border-white"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
            <div className="flex flex-col px-10 py-6 space-y-1 w-full h-auto bg-blue-500 rounded-lg border-b-4 border-blue-800 shadow-md">
              <p className="font-primary text-2xl font-bold">{data?.name}</p>
              <p className="font-primary text-gray-200">{data?.address}</p>
              <a
                href={toGmapURL(data?.latitude, data?.longitude)}
                target="_blank"
                className="btn"
              >
                {" "}
                Lokasi{" "}
              </a>
            </div>
            <h2 className="font-primary text-xl font-semibold">
              Sesi Vaksinasi{" "}
            </h2>
            <div className="flex flex-col space-y-2 w-full">
              {data?.vaccine_session.length == 0 ? (
                <p className="alert alert-error">
                  Belum ada Sesi Vaksinasi yang tersedia.
                </p>
              ) : (
                <>
                  {data?.vaccine_session.map((item) => (
                    <ExpandableArea
                      title={
                        data?.vaccine.filter((v) => v.id == item.vaccine_id)[0]
                          .name
                      }
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col justify-between">
                          <p className="font-medium">
                            {formatDate(item.start_date)} WIB -{" "}
                            {formatDate(item.end_date)} WIB
                          </p>
                          <p className="font-semibold">Kuota : {item.quota}</p>
                        </div>
                        {isAuthenticated && !isRegistered && (
                          <ConfirmDialog
                            isOpen={isOpen}
                            setOpen={setOpen}
                            title="Apakah anda yakin ingin mendaftar?"
                            message="Konfirmasi jika anda ingin mendaftar, anda tidak bisa membatalkan sesi vaksinasi yang sudah terdaftar"
                            handleConfirm={() =>
                              handleRegisterSession(token, item.id)
                            }
                            titleAction="Daftar"
                            className="btn btn-info"
                          />
                        )}
                        {!isAuthenticated && (
                          <div
                            data-tip="Anda harus mendaftar akun dahulu"
                            className="tooltip"
                          >
                            <button className="btn btn-disabled">Daftar</button>
                          </div>
                        )}
                        {isRegistered && (
                          <div
                            data-tip="Anda sudah mendaftar sesi vaksinasi"
                            className="tooltip"
                          >
                            <button className="btn btn-disabled">Daftar</button>
                          </div>
                        )}
                      </div>
                    </ExpandableArea>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
