import React, { useState, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";
import firebase from "../firebase/config";

const Create = props => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [routeRedirect, setRouteRedirect] = useState(false);

  const addPost = async e => {
    e.preventDefault();
    setIsBusy(true);

    let post = {
      title,
      content,
      cover: cover[0]
    };

    await firebase
      .createPost(post)
      .then(() => {
        console.log("post created successfully");
        setIsBusy(false);
        setRouteRedirect(true);
      })
      .catch(error => {
        console.log(error);
        setIsBusy(false);
      });
  };

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  let createForm;
  if (isBusy) {
    createForm = (
      <div className="processing">
        <p>Request is being processed</p>
        <div className="loader">Loading...</div>
      </div>
    );
  } else {
    createForm = (
      <form onSubmit={addPost}>
        <p>Create a new post</p>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          name="title"
          onChange={e => setTitle(e.target.value)}
        />

        <label htmlFor="content">Post Content:</label>
        <textarea
          name="content"
          onChange={e => setContent(e.target.value)}
        ></textarea>

        <label htmlFor="cover">Cover</label>
        <input
          type="file"
          name="cover"
          onChange={e => setCover(e.target.files)}
        />

        <input type="submit" value="create post" />
      </form>
    );
  }

  return <>{createForm}</>;
};

export default Create;
