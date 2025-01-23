import ProfileForm from "@/components/features/user/profile";
import { AvatarUpload } from "@/components/molecule";
import { BackgroundProfile } from "@/layouts";

const ProfilePage = () => {
  return (
    <BackgroundProfile>
      <div className="absolute w-full px-6 pb-6">
        <AvatarUpload className="absolute top-20 left-1/2 transform -translate-x-1/2" />
        <div className="mt-72 w-full flex flex-col gap-6 mb-14">
          <ProfileForm />
        </div>
      </div>
    </BackgroundProfile>
  );
};

export default ProfilePage;
