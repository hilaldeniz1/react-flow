import { Link, useNavigate } from "react-router-dom";
import InputArea from "../components/InputArea";
import { validate } from "../utils/helpers";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { uploadUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/home");
  }

  // form gönderilme olayı
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form verisi oluşturma
    const form = new FormData(e.target);

    // form verilerini objeye çevirme
    const formData = Object.fromEntries(form.entries());

    // resmi stringe çevir
    const strImage = await imageToString(formData.image);

    console.log(strImage);

    // formu kontrol etme
    if (validate(formData) && strImage) {
      // kullanıya id verme
      formData.id = v4();

      // kullanıyının resmini objeye ekleme
      formData.image = strImage;

      // kullanıcyı veritabanına ekleme
      uploadUser(formData);
    } else {
      toast.info("Lütden formu doldurun", { autoClose: 2000 });
    }
  };

  // resmi stringe çevirir
  const imageToString = async (file) => {
    // dosya tipini doğrulama
    if (file.type === "image/jpeg" || file.type === "image/png") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = () => {
          toast("Resmi yükleme hata oluştu :(");
          reject(null);
        };
      });
    } else {
      toast("Lütfen geçerli bir dosya tipi giriniz: jpeg / png");
      return null;
    }
  };

  return (
    <section className="bg-gray-900">
      <div className="h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Link className="flex items-center mb-6 text-2xl">
          <img className="w-8 h-8 mr-2" src="/logo.svg" />
          <span className="text-white text-2xl font-semibold">Flow</span>
        </Link>

        <div className="text-white w-full bg-gray-800 border border-gray-700 rounded-lg shadow sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold">Flow</h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <InputArea
                label={"İsim"}
                holder={"örn:ahmet"}
                name={"name"}
                type={"text"}
              />
              <InputArea
                label={"Emailiniz"}
                holder={"deneme@şirket.com"}
                name={"email"}
                type={"email"}
              />
              <InputArea
                label={"Şifre"}
                holder={"••••••••"}
                name={"password"}
                type={"password"}
              />
              <InputArea
                label={"Profil Fotoğrafı"}
                name={"image"}
                type={"file"}
              />

              <button className="w-full bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-sm">
                Kaydol
              </button>

              <p className="text-sm text-gray-400">
                Henüz hesabın var mı?
                <Link className="mx-2 text-white" to={"/login"}>
                  Giriş Yap
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
