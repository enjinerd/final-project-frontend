import { Page, PageContent } from "components/layout/page";
import { Link } from "react-router-dom";
import { DropdownMenu } from "components/ui";

export function FamilyMembers() {
  return (
    <Page>
      <PageContent>
        <div className="px-4 py-8 space-y-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center sm:text-xl font-primary">
            Anggota Keluarga
          </h1>
          <div className="font-medium alert alert-warning">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <label>Belum ada anggota keluarga yang ditambahkan</label>
            </div>
          </div>
          <div className="px-4 py-2 rounded-md bg-gradient-to-tl from-gray-200 via-gray-300 to-gray-300 flex flex-row justify-between">
            <p className="font-bold text-lg">Rahayu Lestari</p>
            <DropdownMenu />
          </div>
          <div>
            <Link to="/user/family-member/add">
              <button className="btn btn-block btn-info">Tambahkan</button>
            </Link>
          </div>
        </div>
      </PageContent>
    </Page>
  );
}
