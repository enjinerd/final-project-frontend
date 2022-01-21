import { Page, PageContent } from "components/layout/page";
import { useState, useEffect } from "react";
import { useCitizen } from "hooks/user";
import useAuthStore from "stores/useAuthStore";

export function VaccinationSession() {
  const { token } = useAuthStore();
  const { vaccinationSession, familyMember } = useCitizen();
  const [session, setSession] = useState();
  const [family, setFamily] = useState();

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
          <h1 className="font-primary text-2xl font-bold text-center sm:text-xl">
            Detai Sesi Vaksinasi
          </h1>
          <div className="alert-success font-secondary py-1 w-full font-semibold text-center">
            <p>Terdaftar</p>
          </div>
          {session ? (
            <>
              <div className="flex flex-col px-10 py-6 w-full h-auto bg-blue-500 rounded-lg border-b-4 border-blue-800 shadow-md">
                <p className="font-primary font-bold">#{session[0]?.id}</p>
                <p className="font-primary text-2xl font-bold">
                  {family[0]?.name}
                </p>
                <p className="font-primary">
                  Vaksinasi {session[0]?.vaccine.name}
                </p>
              </div>
              <h2 className="font-primary text-xl font-semibold">
                Daftar Anggota Keluarga
              </h2>
              <div className="flex flex-col space-y-2 w-full">
                {family.slice(1, family.length).map((f) => (
                  <div className="flex flex-row justify-between px-3 py-2 bg-white rounded-lg shadow-lg transition-colors duration-200 hover:bg-gray-200">
                    <p className="font-bold">{f.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center items-center p-12">
                <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin dark:border-white">
                  {" "}
                </div>
              </div>
            </div>
          )}
        </div>
      </PageContent>
    </Page>
  );
}
