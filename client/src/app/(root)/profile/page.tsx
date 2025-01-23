import ProfileForm from "@/components/features/user/profile";
import { ButtonType } from "@/components/molecule";
import { PATHNAME } from "@/configs";
import { BackgroundProfile } from "@/layouts";

const ProfilePage = () => {
  return (
    <>
      <ButtonType type="back" expectPath={PATHNAME.HOME} />
      <BackgroundProfile>
        <div className="absolute w-full px-6 pb-6">
          <div className="mt-80 w-full flex flex-col gap-6 mb-14">
            <ProfileForm />
          </div>
        </div>
      </BackgroundProfile>
    </>
  );
};

export default ProfilePage;
