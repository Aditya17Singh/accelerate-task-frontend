import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

function NewPost(props) {
  const [state, setState] = useState({
    title: "",
    description: "",
    image: ""
  });
  const navigate = useNavigate();

  function handleInput({ target }) {
    let { name, value } = target;
    let errors = state.errors;
    setState({ ...state, errors, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let storageKey = localStorage["app__user"];
    const { title, description,image } = state;
    // Default options are marked with *
    fetch("https://accelerate-task-backend.herokuapp.com/api/post", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Accept: "*",
        authorization: `${storageKey}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        post: {
          title,
          description,
          image
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then(({ post }) => {
        setState({ ...state, title: "", description: "" });
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  return (
    <>
      <div className="bg-grey-lighter flex flex-col ">
        <div className="container max-w-sm mx-auto flex-1 top-5 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">New post</h1>
            <input
                type="text"
                name="image"
                placeholder="Copy Image address and Paste here"
                className="block w-full border py-2 mt-4 rounded mb-2	 px-4"
                value={state.image}
                onChange={handleInput}
              />
            <input
              value={state.title}
              onChange={handleInput}
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              id="title"
              name="title"
              placeholder="Title"
            />
            <textarea
              onChange={handleInput}
              type="text"
              id="description"
              className="block border border-grey-light w-full p-3 rounded "
              name="description"
              placeholder="Description"
              defaultValue={state.description}
            ></textarea>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-center text-black 	 py-3 rounded bg-blue-200 hover:bg-blue-400 focus:outline-none my-1"
            >
              Add post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;
