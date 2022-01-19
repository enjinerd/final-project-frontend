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

  useEffect(async () => {
    const data = await userProfile(token, userId);
    setProfile(data);
  }, []);

  return (
    <Page>
      <PageContent>
        {profile ? (
          <div className="px-4 py-8 space-y-8 lg:px-8">
            <p className="text-2xl font-primary sm:text-xl">
              Halo, <strong>{profile?.name}</strong>
            </p>
            <div className="py-1 font-semibold text-center alert-error font-secondary dark:bg-">
              <p>Belum Vaksinasi</p>
            </div>
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
            <div className="flex items-center justify-center p-12">
              <div className="w-20 h-20 border-b-2 border-gray-900 rounded-full animate-spin dark:border-white"></div>
            </div>
          </div>
        )}
      </PageContent>
    </Page>
  );
}
