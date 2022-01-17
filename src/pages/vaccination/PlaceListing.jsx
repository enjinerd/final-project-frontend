import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { ExpandableArea, ConfirmDialog } from "components/ui";
import { useState, useEffect } from "react";

const mockData = {
  hfName: "RSUP Dr. Kariadi",
  address:
    "Jl. DR. Sutomo No.16, Randusari, Kec. Semarang Sel., Kota Semarang, Jawa Tengah 50244",
  session: [
    {
      name: "Sinovac",
      date: "20/1/2022",
      time: "10:00 - 12:00",
      quota: "50",
      booked: "17",
    },
    {
      name: "Moderna",
      date: "22/1/2022",
      time: "09:00 - 11:00",
      quota: "45",
      booked: "31",
    },
    {
      name: "Astrazeneca",
      date: "22/1/2022",
      time: "13:00 - 15:30",
      quota: "82",
      booked: "27",
    },
  ],
};
export function PlaceListing({ match }) {
  const [isOpen, setOpen] = useState(false);
  const sessionId = match.params.sessionId;

  useEffect(() => {
    console.log(sessionId);
  }, [sessionId]);

  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
          <div className="flex flex-col w-full h-auto px-10 py-6 bg-blue-500 border-b-4 border-blue-800 rounded-lg shadow-md">
            <p className="text-2xl font-bold font-primary">{mockData.hfName}</p>
            <p className="text-gray-200 font-primary">{mockData.address}</p>
          </div>
          <h2 className="text-xl font-semibold font-primary">
            Sesi Vaksinasi{" "}
          </h2>
          <div className="flex flex-col w-full space-y-2">
            {mockData.session.map((item, index) => (
              <ExpandableArea title={item.name}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col justify-between">
                    <p className="font-medium">
                      {item.date}
                      <br />
                      {item.time}
                    </p>
                    <p className="font-semibold">
                      Kuota : {item.booked} / {item.quota}
                    </p>
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
      </PageContent>
    </Page>
  );
}
