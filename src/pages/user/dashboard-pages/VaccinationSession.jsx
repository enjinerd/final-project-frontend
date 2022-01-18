import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCitizen } from "hooks/user";
import useAuthStore from "stores/useAuthStore";

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
export function VaccinationSession() {
  const { token } = useAuthStore();
  const { vaccinationSession } = useCitizen();
  const [session, setSession] = useState();
  const [isOpen, setOpen] = useState(false);
  useEffect(async () => {
    if (!session) {
      let data = await vaccinationSession(token);
      setSession(data.session.filter((d) => d.status !== ""));
    }
    console.log(session);
  }, [session]);
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
          <h1 className="font-bold font-primary text-2xl text-center sm:text-xl">
            Detai Sesi Vaksinasi
          </h1>
          <div className="alert-success font-secondary font-semibold py-1 text-center w-full">
            <p>Terdaftar</p>
          </div>
          <div className="bg-blue-500 border-b-4 border-blue-800 flex flex-col h-auto px-10 py-6 rounded-lg shadow-md w-full">
            <p className="font-bold font-primary">#SV01RSKR0015</p>
            <p className="font-bold font-primary text-2xl">Rahayu Lestari</p>
            <p className="font-primary">Vaksinasi Sinovac</p>
          </div>
          <h2 className="font-primary font-semibold text-xl">
            Daftar Anggota Keluarga
          </h2>
          <div className="flex flex-col space-y-2 w-full">
            <div className="bg-white duration-200 flex flex-row justify-between px-3 py-2 rounded-lg shadow-lg transition-colors hover:bg-gray-200">
              <p className="font-bold">Eka Putra</p>
            </div>
            <div className="bg-white duration-200 flex flex-row justify-between px-3 py-2 rounded-lg shadow-lg transition-colors hover:bg-gray-200">
              <p className="font-bold">Putri Sisel</p>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
