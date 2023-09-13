import { BiSolidDownArrowCircle } from "react-icons/bi";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "../../utils/contants";
import { PostContext } from "../../context/PostContext";
import { v4 } from "uuid";
import { UserContext } from "./../../context/UserContext";
const Form = () => {
  const { addPost } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Genel Tartışma");

  //   kaçıncı seviyedeki inoutların' ekran basılcağını belirler
  const [inputLevel, setInputLevel] = useState(0);

  const handleSubmit = () => {
    const newPost = {
      author: { ...activeUser, password: null },
      title,
      content,
      category,
      id: v4(),
      date: new Date(),
      comments: [],
    };

    setTitle("");
    setInputLevel(0);

    addPost(newPost);
  };

  return (
    <div>
      <div className="grid grid-cols-5 items-center gap-4">
        <input
          value={title}
          disabled={inputLevel > 0}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full col-span-4 rounded p-1 text-black shadow"
          placeholder="Başlık..."
          type="text"
        />

        <BiSolidDownArrowCircle
          onClick={() => {
            title && setInputLevel(1);
          }}
          className="text-2xl cursor-pointer hover:text-gray-400"
        />
      </div>

      {inputLevel > 0 && (
        <div className="grid grid-cols-5 items-center gap-4 my-5">
          <textarea
            disabled={inputLevel > 1}
            onChange={(e) => setContent(e.target.value)}
            className=" col-span-4 w-full rounded-md p-2 text-black min-h-[200px] max-h-[400px] disabled:resize-none"
            placeholder="Konu içeriği giriniz..."
          />

          <div className="flex">
            <BiSolidDownArrowCircle
              onClick={() => {
                content && setInputLevel(2);
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => setInputLevel(0)}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}

      {inputLevel > 1 && (
        <div className="grid grid-cols-5 items-center gap-4 my-5">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className=" col-span-4 w-full p-1 rounded text-black"
          >
            {categories.map((item, i) => (
              <option key={i}>{item.title}</option>
            ))}
          </select>

          <div className="flex">
            <AiFillCheckCircle
              onClick={() => {
                category && handleSubmit();
              }}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
            <AiFillCloseCircle
              onClick={() => setInputLevel(1)}
              className="text-2xl cursor-pointer hover:text-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
