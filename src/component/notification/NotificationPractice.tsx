import { useState } from "react";

interface NotificationItem {
  id: number;
  message: string;
  isRead: boolean;
}

export default function NotificationPractice() {
  const [notification, setNotification] = useState<NotificationItem[]>([
    { id: 1, message: "새로운 메시지가 도착했습니다.", isRead: false },
    { id: 2, message: "주문이 완료되었습니다.", isRead: true },
    { id: 3, message: "새로운 공지사항이 있습니다.", isRead: false },
  ]);
  const [allNotification, setAllNotification] = useState(true);

  const handleNotificationRead = (id: number) => {
    setNotification((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item,
      ),
    );
  };

  const handleNotificationDle = (id: number) => {
    setNotification((prev) => prev.filter((item) => item.id !== id));
  };

  const notificationList = allNotification
    ? notification
    : notification.filter((prev) => prev.isRead === false);
  console.log(notification);
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen bg-[#000000]">
      <div className="border w-full max-w-2/4 rounded-md p-4 border-[#262626] box-border">
        <header className="flex justify-between mb-3">
          <label className="text-[#EDEDED]">알림 관리</label>
          <span className="text-[#CDCDCD]">
            안 읽음{" "}
            {notification.filter((prev) => prev.isRead === false).length}개
          </span>
        </header>
        <div className="flex gap-2.5">
          <button
            className="rounded-3xl px-2 border border-[#262626] bg-[#000000] text-[#686868] 
          hover:text-[#ACACAC] hover:border-[#3C3C3C] hover:cursor-pointer visited:bg-[#303030] duration-200"
            onClick={() => setAllNotification(true)}
          >
            전체 보기
          </button>
          <button
            className="rounded-3xl px-2 border border-[#262626] bg-[#000000] text-[#686868]
             hover:text-[#ACACAC] hover:border-[#3C3C3C] hover:cursor-pointer visited:bg-[#303030] enabled:hover:bg-[#1A1A1A] duration-200"
            onClick={() => setAllNotification(false)}
          >
            안 읽은 알림
          </button>
        </div>
        <ul className="w-full  pl-0">
          {notification.length === 0 ? (
            <li className="text-[#CDCDCD] list-none">알림이 없습니다.</li>
          ) : notificationList.length === 0 ? (
            <li className="text-[#CDCDCD] list-none">
              읽지 않은 알림이 없습니다.
            </li>
          ) : (
            notificationList.map((prev) => (
              <li
                key={prev.id}
                className="list-none flex items-center justify-between px-5 py-4 rounded-xl border bg-[#303030] box-border"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-white text-base font-medium">
                    {prev.message}
                  </span>
                  <span className="text-neutral-400 text-sm">
                    {prev.isRead ? "읽음" : "안 읽음"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-3.5 py-1.5 rounded-full border border-neutral-500 text-sm enabled:hover:cursor-pointer"
                    onClick={() => handleNotificationRead(prev.id)}
                  >
                    {prev.isRead ? "읽음 취소" : "읽음 처리"}
                  </button>
                  <button
                    className="px-3.5 py-1.5 rounded-full border border-neutral-500 text-sm enabled:hover:cursor-pointer"
                    onClick={() => handleNotificationDle(prev.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
