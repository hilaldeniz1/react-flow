import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:3060";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState();

  const user_id = localStorage.getItem("token");

  // uygulama yüklendiğinde aktif kullanıyı çek
  useEffect(() => {
    if (user_id) {
      axios
        .get(`/users/${user_id}`)
        .then((res) => setActiveUser(res.data))
        .catch((err) => toast("Hesap bilgirine erişirken sorun oluştu"));
    } else {
      navigate("/login");
    }
  }, []);

  // kulalnıcyı veritabanınna ekler
  const uploadUser = (user) => {
    axios
      .post("/users", user)
      .then(() => {
        // kullanıcının id'sini local'storege'a ekle
        localStorage.setItem("token", user.id);
        // active user'state'İni günceller
        setActiveUser(user);
        // anasayfaya yönlendir
        navigate("/home");
        // bildirim verme
        toast.success("Hesabınız oluşturuldu", { autoClose: 3000 });
      })
      .catch((err) => toast("Hesap oluşturulamıyor..."));
  };

  // kullanınıcn hesabına giriş yapar
  const loginToAccount = (email, pass) => {
    // api'ye gönderilceke parametreli hazırlama
    const params = {
      email,
      password: pass,
    };

    // api'ye istek atma
    axios.get(`/users`, { params }).then((res) => {
      if (res.data.length === 0) {
        toast.error("Bilgilerinizle eşleşen kullanıcı bulunamadı");
      } else {
        localStorage.setItem("token", res.data[0].id);
        setActiveUser(res.data[0]);
        navigate("/home");
        toast.success("Hesaba giriş yapılıyor");
      }
    });
  };

  // kullnıcıyı hesaptan çıkar
  const logoutFromAccount = () => {
    localStorage.removeItem("token");

    navigate("/login");

    setActiveUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        uploadUser,
        loginToAccount,
        logoutFromAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
