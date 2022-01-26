import { Page, PageContent } from "components/layout/page";
import { DropdownFamilyMenu } from "components/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "stores/useAuthStore";
import useCitizen from "hooks/user/useCitizen";

export function FamilyMembers() {
  const { token } = useAuthStore();
  const { familyMember } = useCitizen();
  let { data, isLoading } = familyMember(token);

  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="font-primary text-2xl font-bold text-center sm:text-xl">
            Anggota Keluarga
          </h1>
          {isLoading ? (
            <div className="text-center">
              <div className="flex justify-center items-center p-12">
                <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin dark:border-white">
                  {" "}
                </div>
              </div>
            </div>
          ) : (
            <ul className="space-y-2">
              {data?.slice(1, data.length).map((family) => (
                <li key={family.id}>
                  <div className="alert alert-sm flex flex-row justify-between px-3 py-2">
                    <Link to={`/user/dashboard/family-members/${family.id}`}>
                      <p className="font-bold">{family.name} </p>
                    </Link>
                    <DropdownFamilyMenu dataId={family.id} userData={family} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div>
            <Link to="/user/family-member/add">
              <button className="btn btn-block btn-info">Tambah Baru</button>
            </Link>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
