import { Page, PageContent } from "components/layout/page";
import { ConfirmDialog } from "components/ui";
import { UserMenus } from "components/user";
import { useState, useEffect } from "react";
import useAuthStore from "stores/useAuthStore";
import useCitizen from "hooks/user/useCitizen";
import jwtDecode from "jwt-decode";

export function UserDashboard() {
  const [isOpen, setOpen] = useState(false);
  const { logout, token } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const { userProfile } = useCitizen();
  const userId = jwtDecode(token).user_id;
  const { data } = userProfile(token, userId);

  useEffect(async () => {
    if (data) {
      setProfile(data.data.data);
    }
  }, [data]);

  return (
    <Page>
      <PageContent>
        {profile ? (
          <div className="px-4 py-8 space-y-8 lg:px-8">
            <p className="font-primary text-2xl sm:text-xl">
              Halo, <strong>{profile?.name}</strong>
            </p>
            {profile?.citizen_family[0].status_vaccines == "BELUM VAKSIN" ? (
              <div className="alert-error font-secondary py-1 font-semibold text-center dark:bg-">
                <p>Belum Vaksinasi</p>
              </div>
            ) : (
              <div className="alert-success font-secondary py-1 font-semibold text-center dark:bg-">
                <p>Sudah Vaksinasi</p>
              </div>
            )}
            <UserMenus />
            <ConfirmDialog
              isOpen={isOpen}
              setOpen={setOpen}
              handleConfirm={logout}
              title="Konfirmasi"
              message="Apakah anda benar-benar ingin keluar?"
              titleAction="Keluar"
              className="btn btn-block btn-warning"
            />
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center items-center p-12">
              <div className="w-20 h-20 rounded-full border-b-2 border-gray-900 animate-spin dark:border-white"></div>
            </div>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
