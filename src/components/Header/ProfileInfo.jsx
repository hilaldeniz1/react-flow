import { useState } from "react";

const ProfileInfo = ({ activeUser, logoutFromAccount }) => {
  const [show, setShow] = useState(false);

  let countdown;

  return (
    <div
      onMouseEnter={() => {
        // saniye bitmeden tekrar mouse üzerine gelirse
        // geri sayımı durdur
        clearTimeout(countdown);
        setShow(true);
      }}
      onMouseLeave={() => {
        // mouse'ü zerinden çekitği anda geri sayım başlat
        countdown = setTimeout(() => {
          setShow(false);
        }, 300);
      }}
      className="relative flex items-center gap-4 cursor-pointer p-2 rounded-md transition hover:bg-gray-700"
    >
      <img className="w-10 h-10 rounded-full" src={activeUser.image} />
      <h2 className="font-bold">{activeUser.name}</h2>

      {show && (
        <div className="absolute top-16 bg-gray-600 rounded start-0 p-1 ">
          <p className="rounded p-2">{activeUser.email}</p>
          <p className="rounded p-2 hover:bg-gray-400">Profili Göster</p>
          <p
            className="rounded p-2 hover:bg-gray-400"
            onClick={logoutFromAccount}
          >
            Çıkış Yap
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
