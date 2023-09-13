import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import Form from "./Form";
import Loading from "../../components/Loading";
import Card from "./Card";

const MainPage = () => {
  const { posts } = useContext(PostContext);

  return (
    <div className="bg-gray-900 h-screen text-white grid grid-cols-4">
      <div></div>

      <div className="col-span-3 p-4 pe-20 md:col-span-2 md:pe-0 ">
        <Form />

        <div>
          {!posts ? (
            <Loading />
          ) : (
            posts.map((post) => <Card key={post.id} post={post} />)
          )}
        </div>
      </div>

      <div className="hidden md:block"></div>
    </div>
  );
};

export default MainPage;
