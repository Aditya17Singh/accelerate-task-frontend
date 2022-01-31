import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";

function Home(props) {
  let user = props.user;
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetchPost();
  }, []);
  function fetchPost() {
    fetch("https://accelerate-task-backend.herokuapp.com/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then((data) => setPost(data.post))
      .catch((errors) => console.log(errors));
  }
  function handleLike(post) {
    fetch(`https://accelerate-task-backend.herokuapp.com/api/post/${post._id}/like`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then((data) => fetchPost());
  }

  return (
    <div className="flex flex-col justify-center items-center m-10 border-2 p-10">
      {user && (
        <Link
          className="block font-medium px-5 py-1 text-sm font-medium tracking-wide text-center text-white capitalize transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mb-2	 text-3xl hover:underline mr-5"
          exact="true"
          to="/newpost"
        >
          Create Post
        </Link>
      )}
      {post &&
        post.map((post) => {
          return (
            <>
              <div
                key={post._id}
                className="flex items-center border-2  mb-5 p-5 justify-between"
              >
                <div>
                  <h1>
                    Title - <span className="font-semibold">{post.title}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="ml-6">
                    Description -{" "}
                    <span className="font-semibold">{post.description}</span>
                  </h1>
                </div>
              </div>
              <div>
                <img src={post.image} alt="Post-img" />
                <button
                  className="flex items-center"
                  onClick={() => handleLike(post)}
                >
                  <span>
                    <FcLike />
                  </span>
                  <span>{post.like}</span>
                </button>
              </div>
            </>
          );
        })}
      {!user && (
        <div>
          <p className="text-2xl	font-semibold	border-solid mt-1.5	 border-4 border-sky-500 ">
            Please SignUp/signIn to Explore all The Features!
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
