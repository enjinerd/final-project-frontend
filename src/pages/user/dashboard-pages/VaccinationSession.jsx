import { Page, PageContent } from "components/layout/page";
import { useState, useEffect } from "react";
import { useCitizen } from "hooks/user";
import useAuthStore from "stores/useAuthStore";
import { ExpandableArea } from "components/ui";
import { Link } from "react-router-dom";

export function VaccinationSession() {
  const { token } = useAuthStore();
  const { vaccinationSession, familyMember } = useCitizen();
  const [session, setSession] = useState();
  const [families, setFamilies] = useState();
  let { data, isLoading } = vaccinationSession(token);
  let { data: family } = familyMember(token);

  useEffect(() => {
    if (data) {
      setSession(data[0]);
    }
    if (family) {
      setFamilies(family);
    }
  }, [data, family]);

  return (
    <Page>
      <PageContent>
        <div className="flex flex-col items-center px-3 py-8 space-y-8 lg:px-16">
          <h1 className="text-2xl font-bold text-center font-primary sm:text-xl">
            Detail Sesi Vaksinasi
          </h1>
          <div className="w-full py-1 font-semibold text-center alert-success font-secondary">
            <p>Terdaftar</p>
          </div>
          {session && families ? (
            <>
              <div className="flex flex-row w-full h-auto px-10 py-6 bg-blue-500 border-b-4 border-blue-800 rounded-lg shadow-md">
                <div className="flex flex-col">
                  <p className="font-bold font-primary">#{session.id}</p>
                  <p className="text-2xl font-bold font-primary">
                    {families[0].name}
                  </p>
                  <p className="font-primary">
                    Vaksinasi {session.vaccine.name}
                  </p>
                </div>
              </div>
              <ExpandableArea title="Lokasi Vaksinasi">
                <div className="flex flex-col space-y-2">
                  <p className="font-bold font-primary">
                    {session.health_facilitator.name}
                  </p>
                  <p className="text-sm font-primary">
                    {session.health_facilitator.address}
                  </p>
                  <Link to={`/vaccination/${session.health_facilitator_id}`}>
                  <button className="btn btn-info btn-sm">
                    Detail Lokasi
                  </button>
                  </Link>
                </div>
              </ExpandableArea>
              <h2 className="text-xl font-semibold font-primary">
                Daftar Anggota Keluarga
              </h2>
              <div className="flex flex-col w-full space-y-2">
                {families.slice(1, families.length).map((f) => (
                  <div className="flex flex-row justify-between px-3 py-2 transition-colors duration-200 bg-white rounded-lg shadow-lg hover:bg-gray-200">
                    <p className="font-bold">{f.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center p-12">
                <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white">
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
