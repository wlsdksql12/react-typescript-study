import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileReviewPractice() {
  const [profile, setProfile] = useState("김민수");
  const [edit, setEdit] = useState(false);

  const handleEditCancel = () => {
    setEdit(false);
  };

  const handleEdit = (name: string) => {
    setProfile(name);
    setEdit(false);
  };

  return (
    <div className="border box-border w-full max-w-3xl rounded-md p-4">
      <h4>사용자 프로필</h4>
      <div className="flex justify-between mb-2.5">
        <div className="flex flex-col items-center">
          <span className="text-sm">현재 저장된 이름</span>
          <span>{profile}</span>
        </div>
        {edit === false ? (
          <div className="flex items-center">
            <button type="button" onClick={() => setEdit((prev) => !prev)}>
              이름 수정
            </button>
          </div>
        ) : (
          true
        )}
      </div>
      {edit && (
        <ProfileEditForm
          profile={profile}
          handleEdit={handleEdit}
          handleEditCancel={handleEditCancel}
        />
      )}
    </div>
  );
}
