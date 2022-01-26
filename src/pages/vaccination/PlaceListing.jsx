import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { ExpandableArea, ConfirmDialog } from "components/ui";
import { useState, useEffect } from "react";
import { useCitizen } from "hooks/user";
import { useFetchHFById } from "hooks/vaccination";
import useAuthStore from "stores/useAuthStore";

export function PlaceListing({ match }) {
  const [isOpen, setOpen] = useState(false);
  const sessionId = match.params.sessionId;
  const { token, isAuthenticated } = useAuthStore();
  const [isRegistered, setRegistered] = useState(false);

  const { registerVaccination, vaccinationSession } = useCitizen();

  const { data, isLoading, error } = useFetchHFById({ id: sessionId });
  const handleRegisterSession = async (jwt, sessionId) => {
    console.log(jwt);
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
            <div className="flex items-center justify-center p-12">
              <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
            <div className="flex flex-col w-full h-auto px-10 py-6 bg-blue-500 border-b-4 border-blue-800 rounded-lg shadow-md">
              <p className="text-2xl font-bold font-primary">{data?.name}</p>
              <p className="text-gray-200 font-primary">{data?.address}</p>
            </div>
            <h2 className="text-xl font-semibold font-primary">
              Sesi Vaksinasi{" "}
            </h2>
            <div className="flex flex-col w-full space-y-2">
              {data?.vaccine_session.length == 0 ? (<p className="alert alert-error">Belum ada Sesi Vaksinasi yang tersedia.</p>) : (
                <>
                {data?.vaccine_session.map((item) => (
                  <ExpandableArea
                    title={
                      data?.vaccine.filter((v) => v.id == item.vaccine_id)[0].name
                    }
                  >
                    <div className="flex flex-row items-center justify-between">
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
                ))}</>
              )}
            </div>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
