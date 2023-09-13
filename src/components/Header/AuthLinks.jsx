import { Link } from "react-router-dom";

const AuthLinks = () => {
  return (
    <>
      <Link
        to={"/login"}
        className="px-4 py-2 lg:px-5 lg:py-2.5 mr-2 font-medium rounded-lg hover:bg-gray-700"
      >
        Giriş Yap
      </Link>
      <Link
        to={"/register"}
        className="bg-blue-700 hover:bg-blue-800 font-medium px-4 lg:px-5 py-2 mr-2 rounded-lg"
      >
        Haydi Başlayalım
      </Link>
    </>
  );
};

export default AuthLinks;
