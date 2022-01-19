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
  const { vaccinationSession, familyMember } = useCitizen();
  const [session, setSession] = useState();
  const [family, setFamily] = useState();
  const [isOpen, setOpen] = useState(false);

  useEffect(async () => {
    if (!session) {
      let data = await vaccinationSession(token);
      let family = await familyMember(token);
      setFamily(family);
      setSession(data.session.filter((d) => d.status !== ""));
    }
    console.log(session);
    console.log(family);
  }, [session]);
  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
          <h1 className="text-2xl font-bold text-center font-primary sm:text-xl">
            Detai Sesi Vaksinasi
          </h1>
          <div className="w-full py-1 font-semibold text-center alert-success font-secondary">
            <p>Terdaftar</p>
          </div>
          {session ? (
            <>
              <div className="flex flex-col w-full h-auto px-10 py-6 bg-blue-500 border-b-4 border-blue-800 rounded-lg shadow-md">
                <p className="font-bold font-primary">#{session[0]?.id}</p>
                <p className="text-2xl font-bold font-primary">
                  {family[0]?.name}
                </p>
                <p className="font-primary">
                  Vaksinasi {session[0]?.vaccine.name}
                </p>
              </div>
              <h2 className="text-xl font-semibold font-primary">
                Daftar Anggota Keluarga
              </h2>
              <div className="flex flex-col w-full space-y-2">
                {family.slice(1, family.length).map((f) => (
                  <div className="flex flex-row justify-between px-3 py-2 transition-colors duration-200 bg-white rounded-lg shadow-lg hover:bg-gray-200">
                    <p className="font-bold">{f.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
