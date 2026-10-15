import React, { useEffect, useRef, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  initialAge: number;
}

interface EditProfileFormProps {
  editingName: string;
  editingId: number;
  allSelect: boolean;
  delayMs: number;
  changeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEdit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  handleEditCancel: () => void;
  handleAllSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDelayCheck: (delay: number) => void;
}

interface ProfileItemProps {
  profile: Profile;
  isEditing: boolean;
  handleDelete: (id: number) => void;
  handleIncreaseAge: (id: number) => void;
  handleDecreaseAge: (id: number) => void;
  handleEditingName: (id: number, name: string) => void;
}

interface ProfileFilters {
  search: string;
  onlyAge30Plus: boolean;
  onlyEditing: boolean;
  onlyChangedAge: boolean;
}

interface FilterSavePanelProps {
  savedFilters: ProfileFilters | null;
  isSameFilters: boolean;
  isDefaultFilters: boolean;
  onSave: () => void;
  onLoad: () => void;
  onDelete: () => void;
  onClear: () => void;
}

const DEFAULT_FILTERS: ProfileFilters = {
  search: "",
  onlyAge30Plus: false,
  onlyEditing: false,
  onlyChangedAge: false,
};

function areFiltersEqual(
  first: ProfileFilters,
  second: ProfileFilters,
): boolean {
  return (
    first.search === second.search &&
    first.onlyAge30Plus === second.onlyAge30Plus &&
    first.onlyEditing === second.onlyEditing &&
    first.onlyChangedAge === second.onlyChangedAge
  );
}

function ProfileItem({
  profile,
  isEditing,
  handleDelete,
  handleIncreaseAge,
  handleDecreaseAge,
  handleEditingName,
}: ProfileItemProps) {
  return (
    <li>
      {isEditing === true
        ? `이름: ${profile.name}(수정 중), 나이: ${profile.age}`
        : `이름: ${profile.name}, 나이: ${profile.age}`}
      <button type="button" onClick={() => handleDelete(profile.id)}>
        삭제
      </button>
      <button type="button" onClick={() => handleIncreaseAge(profile.id)}>
        나이 +1
      </button>
      <button
        type="button"
        onClick={() => handleDecreaseAge(profile.id)}
        disabled={profile.age === 0}
      >
        나이 -1
      </button>
      <button
        type="button"
        onClick={() => handleEditingName(profile.id, profile.name)}
        disabled={isEditing === true}
      >
        이름 수정
      </button>
    </li>
  );
}

function EditProfileForm({
  editingName,
  editingId,
  allSelect,
  delayMs,
  handleEdit,
  changeName,
  handleEditCancel,
  handleAllSelect,
  handleDelayCheck,
}: EditProfileFormProps) {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [checkEnabled, setCheckEnabled] = useState(true);
  // const [delayMs, setDelayMs] = useState(1000);

  useEffect(() => {
    editInputRef.current?.focus();

    if (allSelect) {
      editInputRef.current?.select();
    }
  }, [editingId, allSelect]);

  useEffect(() => {
    if (editingName.trim().length < 2 || checkEnabled === false) return;

    console.log("안내 예약", editingName);

    const timerName = window.setTimeout(() => {
      console.log("입력 확인", editingName.trim());
    }, delayMs);

    return () => {
      window.clearTimeout(timerName);
      console.log("안내 예약 취소", editingName);
    };
  }, [editingName, editingId, checkEnabled, delayMs]);

  // 수정중인 이름 전체 선택
  const handleSelectName = () => {
    editInputRef.current?.focus();
    editInputRef.current?.select();
  };

  const handleCheckEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckEnabled(event.target.checked);
  };

  // const handleDelayCheck = (delay: number) => {
  //   setDelayMs(delay);
  // };

  return (
    <form onSubmit={handleEdit}>
      <hr />
      <div>이름 수정중 (확인 대기 시간: {delayMs}ms)</div>
      <input
        ref={editInputRef}
        value={editingName}
        onChange={changeName}
        placeholder="수정할 이름을 입력해 주세요."
      />
      <button type="submit" disabled={editingName.trim().length < 2}>
        수정
      </button>
      <button type="button" onClick={handleEditCancel}>
        취소
      </button>
      <button type="button" onClick={handleSelectName}>
        이름 전체 선택
      </button>
      <label>
        <input type="checkbox" checked={allSelect} onChange={handleAllSelect} />
        자동 전체 선택
      </label>
      <label>
        <input
          type="checkbox"
          checked={checkEnabled}
          onChange={handleCheckEnabled}
        />
        입력 확인 켜기
      </label>
      <button type="button" onClick={() => handleDelayCheck(500)}>
        입력 빠르게 확인
      </button>
      <button type="button" onClick={() => handleDelayCheck(1500)}>
        입력 천천히 확인
      </button>
    </form>
  );
}

function FilterSavePanel({
  savedFilters,
  isSameFilters,
  isDefaultFilters,
  onSave,
  onLoad,
  onDelete,
  onClear,
}: FilterSavePanelProps) {
  return (
    <div>
      {/* 저장값이 있는지 확인하는 안내 문구 */}
      <div>
        {savedFilters === null
          ? "저장된 검색 조건이 없습니다."
          : isSameFilters
            ? "현재 조건이 저장된 조건과 같습니다."
            : "현재 조건이 저장된 조건과 다릅니다."}
      </div>
      {savedFilters && (
        <>
          <div>
            {savedFilters.search.trim().length > 0
              ? `저장된 검색어: ${savedFilters.search}`
              : "저장된 검색어: 없음"}
          </div>
          <div>
            {savedFilters.onlyAge30Plus
              ? "30세 이상만 보기: 적용"
              : "30세 이상만 보기: 미적용"}
          </div>
          <div>
            {savedFilters.onlyEditing
              ? "수정 중인 사람만 보기: 적용"
              : "수정 중인 사람만 보기: 미적용"}
          </div>
          <div>
            {savedFilters.onlyChangedAge
              ? "초기 나이와 다른 사람만 보기: 적용"
              : "초기 나이와 다른 사람만 보기: 미적용"}
          </div>
        </>
      )}
      <button
        type="button"
        onClick={onSave}
        disabled={savedFilters !== null && isSameFilters}
      >
        검색 조건 저장
      </button>
      <button
        type="button"
        onClick={onLoad}
        disabled={!savedFilters || isSameFilters}
      >
        검색 조건 불러오기
      </button>
      <button type="button" onClick={onDelete} disabled={savedFilters === null}>
        검색 조건 삭제
      </button>
      <button type="button" onClick={onClear} disabled={isDefaultFilters}>
        검색 초기화
      </button>
    </div>
  );
}

function ProfileList() {
  const nextId = useRef(4);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [delayMs, setDelayMs] = useState(1000);
  const [allSelect, setAllSelect] = useState(false);
  const [saveFilters, setSaveFilters] = useState<ProfileFilters | null>(null);
  const [userName, setUserName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: "성진", age: 29, initialAge: 29 },
    { id: 2, name: "민수", age: 30, initialAge: 30 },
    { id: 3, name: "지수", age: 27, initialAge: 27 },
  ]);
  const [filter, setFilters] = useState<ProfileFilters>({
    ...DEFAULT_FILTERS,
  });
  const isDefaultFilters = areFiltersEqual(filter, DEFAULT_FILTERS);

  const handleDelayCheck = (delay: number) => {
    setDelayMs(delay);
  };

  // 자동 전체 선택
  const handleAllSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllSelect(event.target.checked);
  };

  // 사람 추가
  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = userName.trim();
    if (name.length < 2) return;

    const newProfile: Profile = {
      id: nextId.current,
      name: name,
      age: 25,
      initialAge: 25,
    };

    nextId.current += 1;

    setProfiles((prev) => [...prev, newProfile]);
    setUserName("");
  };

  // 각각 삭제
  const handleDelete = (id: number) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    if (id === editingId) return handleEditCancel();
  };

  // 각각 나이 +1
  const handleIncreaseAge = (id: number) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id ? { ...profile, age: profile.age + 1 } : profile,
      ),
    );
  };

  // 전체 나이 +1
  const handleAllAge = () => {
    setProfiles((prev) =>
      prev.map((profile) => ({ ...profile, age: profile.age + 1 })),
    );
    // setProfiles((prev) =>
    //   prev.map((profile) => {
    //     return { ...profile, age: profile.age + 1 };
    //   }),
    // );
  };

  //각각의 나이 -1
  const handleDecreaseAge = (id: number) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id && profile.age > 0
          ? { ...profile, age: profile.age - 1 }
          : profile,
      ),
    );
  };

  // 전체 삭제
  const handleAllDelete = () => {
    setProfiles([]);
    handleEditCancel();
  };

  // 사람 추가 창 값 입력
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  // 검색창 값 입력
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  // 검색 계산식
  const filteredProfiles = profiles.filter((profile) => {
    // 이름에 검색어가 포함되는가?
    const matchesName = profile.name.includes(filter.search.trim());
    // 나이 필터를 통과하는가?
    const matchesAge = filter.onlyAge30Plus ? profile.age >= 30 : true;
    // 수정 중 필터를 통과하는가?
    const matchesEditing = filter.onlyEditing ? profile.id === editingId : true;
    // 나이가 변경이 되었는가?
    const matchesChangeAge = filter.onlyChangedAge
      ? profile.age !== profile.initialAge
      : true;

    return matchesName && matchesAge && matchesEditing && matchesChangeAge;
  });

  // 검색 초기화
  const handleSearchClear = () => {
    searchInputRef.current?.focus();

    setFilters({ ...DEFAULT_FILTERS });
  };

  // 각각의 이름 수정
  const handleEditingName = (id: number, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  // 이름 수정창 입력
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(event.target.value);
  };

  // 이름 수정 저장
  const handleEdit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newName = editingName.trim();

    if (editingId === null || newName.length < 2) return;

    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === editingId ? { ...profile, name: newName } : profile,
      ),
    );

    // 저장 이후 초기화
    setEditingId(null);
    setEditingName("");
  };

  // 이름 수정 취소
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  // 30대 이상 보기 체크
  const onCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    setFilters((prev) => ({
      ...prev,
      onlyAge30Plus: value,
    }));
  };

  // 수정중인 사람만 보기 체크
  const handleEditingCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    setFilters((prev) => ({ ...prev, onlyEditing: value }));
  };
  // 검색 결과 사람만 나이 +1
  const handleFilteredAge = () => {
    setProfiles((prev) =>
      prev.map((profile) => {
        const istarget = filteredProfiles.some(
          (filteredProfile) => filteredProfile.id === profile.id,
        );

        return istarget ? { ...profile, age: profile.age + 1 } : profile;
      }),
    );
  };

  // 검색 결과 삭제
  const handleFilterDelete = () => {
    const isEditingTarget = filteredProfiles.some(
      (profile) => profile.id === editingId,
    );

    if (isEditingTarget) {
      handleEditCancel();
    }

    setProfiles((prev) =>
      prev.filter((profile) => {
        const isTarget = filteredProfiles.some(
          (filteredProfile) => filteredProfile.id === profile.id,
        );

        return !isTarget;
      }),
    );
  };

  // 검색 결과 나이 -1
  const handleFilteredDecAge = () => {
    setProfiles((prev) =>
      prev.map((profile) => {
        const isTarget = filteredProfiles.some(
          (filteredProfile) => filteredProfile.id === profile.id,
        );

        if (profile.age > 0)
          return isTarget ? { ...profile, age: profile.age - 1 } : profile;

        return profile;
      }),
    );
  };

  const handleFilteredDecAgeBtn = filteredProfiles.some(
    (profile) => profile.age > 0,
  );
  // 검색 결과 나이 복원
  const handleFilteredRestoreAge = () => {
    setProfiles((prev) =>
      prev.map((profile) => {
        const isTarget = filteredProfiles.some(
          (filteredProfile) => filteredProfile.id === profile.id,
        );

        if (isTarget) {
          return { ...profile, age: profile.initialAge };
        }

        return profile;
      }),
    );
  };

  // 검색 결과 나이 복원 버튼 로직
  const handleFilteredRestoreAgeBtn = filteredProfiles.filter(
    (profiles) => profiles.age !== profiles.initialAge,
  );

  // 나이가 변경된 사람만 보기
  const handleChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;

    setFilters((prev) => ({ ...prev, onlyChangedAge: value }));
  };

  // 검색 조건 저장
  const handleSavefilters = (filter: ProfileFilters) => {
    // setSaveFilters((prev) => ({
    //   search: filter.search,
    //   onlyAge30Plus: filter.onlyAge30Plus,
    //   onlyEditing: filter.onlyEditing,
    //   onlyChangedAge: filter.onlyChangedAge,
    // }));

    // 위에 코딩을 아래 코딩으로 대체 가능
    setSaveFilters({ ...filter });
  };

  /// 검색 조건 불러오기
  const handleLoadfilters = () => {
    // setFilters((prev) => ({
    //   search: saveFilters?.search ? saveFilters?.search : "",
    //   onlyAge30Plus: saveFilters?.onlyAge30Plus
    //     ? saveFilters?.onlyAge30Plus
    //     : false,
    //   onlyEditing: saveFilters?.onlyEditing ? saveFilters?.onlyEditing : false,
    //   onlyChangedAge: saveFilters?.onlyChangedAge
    //     ? saveFilters?.onlyChangedAge
    //     : false,
    // }));

    // 위에 코딩을 아래 코딩으로 대체 가능
    if (saveFilters === null) return;

    setFilters({ ...saveFilters });
  };
  // 검색 조건 삭제
  const handleDeletefilters = () => {
    setSaveFilters(null);
  };

  // 저장된 검색 조건이 같은지 체크
  const isSameFilters =
    saveFilters !== null && areFiltersEqual(filter, saveFilters);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          전체: {profiles.length}명 / 검색 결과: {filteredProfiles.length}명
        </div>
        <div>
          {profiles.length !== 0 && filteredProfiles.length !== 0
            ? null
            : profiles.length !== 0 && filteredProfiles.length === 0
              ? "검색 결과가 없습니다."
              : "등록된 사람이 없습니다."}
        </div>
        <div>
          <input
            value={userName}
            onChange={onChange}
            placeholder="추가할 사람의 이름을 적어주세요."
            style={{
              height: "22px",
              width: "22%",
              marginBottom: "3px",
            }}
          />
        </div>
        <div>
          <input
            ref={searchInputRef}
            value={filter.search}
            onChange={handleSearch}
            placeholder="검색할 사람의 이름을 적어주세요."
            style={{
              height: "22px",
              width: "22%",
              marginBottom: "3px",
              marginRight: "3px",
            }}
          />
          <label style={{ marginRight: "5px" }}>
            <input
              checked={filter.onlyAge30Plus}
              type="checkbox"
              onChange={onCheckChange}
            />
            30세 이상만 보기
          </label>
          <label style={{ marginRight: "5px" }}>
            <input
              checked={filter.onlyEditing}
              type="checkbox"
              onChange={handleEditingCheck}
            />
            수정 중인 사람만 보기
          </label>
          <label style={{ marginRight: "5px" }}>
            <input
              checked={filter.onlyChangedAge}
              type="checkbox"
              onChange={handleChangeAge}
            />
            나이가 변경된 사람만 보기
          </label>
          <FilterSavePanel
            savedFilters={saveFilters}
            isSameFilters={isSameFilters}
            isDefaultFilters={isDefaultFilters}
            onSave={() => handleSavefilters(filter)}
            onLoad={handleLoadfilters}
            onDelete={handleDeletefilters}
            onClear={handleSearchClear}
          />
        </div>
        <button type="submit" disabled={userName.trim().length < 2}>
          사람 추가
        </button>
        <button
          type="button"
          onClick={handleAllAge}
          disabled={profiles.length === 0}
        >
          모두 나이 +1
        </button>
        <button
          type="button"
          onClick={handleFilteredAge}
          disabled={filteredProfiles.length === 0}
        >
          검색 결과 나이 +1
        </button>
        <button
          type="button"
          onClick={handleFilteredDecAge}
          disabled={filteredProfiles.length === 0 || !handleFilteredDecAgeBtn}
        >
          검색 결과 나이 -1
        </button>
        <button
          type="button"
          onClick={handleAllDelete}
          disabled={profiles.length === 0}
        >
          전체 삭제
        </button>
        <button
          type="button"
          onClick={handleFilterDelete}
          disabled={filteredProfiles.length === 0}
        >
          검색 결과 삭제
        </button>
        <button
          type="button"
          onClick={handleFilteredRestoreAge}
          disabled={handleFilteredRestoreAgeBtn.length === 0}
        >
          검색 결과 나이 복원
        </button>
        <ul>
          {filteredProfiles.map((profile) => (
            <ProfileItem
              key={profile.id}
              profile={profile}
              isEditing={editingId === profile.id}
              handleDelete={handleDelete}
              handleIncreaseAge={handleIncreaseAge}
              handleDecreaseAge={handleDecreaseAge}
              handleEditingName={handleEditingName}
            />
          ))}
        </ul>
      </form>
      {editingId !== null ? (
        <EditProfileForm
          editingName={editingName}
          editingId={editingId}
          allSelect={allSelect}
          delayMs={delayMs}
          changeName={changeName}
          handleEdit={handleEdit}
          handleEditCancel={handleEditCancel}
          handleAllSelect={handleAllSelect}
          handleDelayCheck={handleDelayCheck}
        />
      ) : null}
    </>
  );
}

export default ProfileList;
