import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { ExpandableArea, ConfirmDialog } from "components/ui";
import { useState, useEffect } from "react";
import { useFetchHFById } from "hooks/vaccination";

export function PlaceListing({ match }) {
  const [isOpen, setOpen] = useState(false);
  const sessionId = match.params.sessionId;
  console.log(
    "🚀 ~ file: PlaceListing.jsx ~ line 38 ~ PlaceListing ~ sessionId",
    sessionId
  );
  const { data, isLoading, error } = useFetchHFById({ id: sessionId });

  useEffect(() => {
    console.log(sessionId);
  }, [sessionId]);

  return (
    <Page>
      <PageContent>
        {isLoading ? (
          <p>Loading...</p>
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
              {data?.vaccine_session.map((item) => (
                <ExpandableArea
                  title={
                    data?.vaccine.filter((v) => v.id == item.vaccine_id)[0].name
                  }
                >
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col justify-between">
                      <p className="font-medium">
                        {item.start_date}
                        <br />
                        {item.ende_date}
                      </p>
                      <p className="font-semibold">Kuota : {item.quota}</p>
                    </div>
                    <ConfirmDialog
                      isOpen={isOpen}
                      setOpen={setOpen}
                      title="Apakah anda yakin ingin mendaftar?"
                      message="Konfirmasi jika anda ingin mendaftar, anda tidak bisa membatalkan sesi vaksinasi yang sudah terdaftar"
                      handleConfirm={() => alert("yes")}
                      titleAction="Daftar"
                      className="btn btn-info"
                    />
                  </div>
                </ExpandableArea>
              ))}
            </div>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
