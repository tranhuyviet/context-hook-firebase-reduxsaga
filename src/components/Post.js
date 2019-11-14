import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../firebase/config";

const Post = props => {
  const [timer, setTimer] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userState, setUserState] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [post, setPost] = useState("");

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileRef = useRef(null);

  const [postId, setPostId] = useState(props.match.params.id);
  const [routeRedirect, setRouteRedirect] = useState(false);

  const getPost = async postid => {
    const _post = await firebase.getPost(postid).catch(error => {
      console.log(error);
      return error;
    });
    setPost(_post);
    console.log(_post);
  };

  useEffect(() => {
    console.log("Post useEffect");
    setTimer(true);
    setPostId(props.match.params.id);
    getPost(props.match.params.id);

    firebase.getUserState().then(user => {
      if (user) {
        setUserState(user);
      }
    });

    setTimeout(() => {
      setTimer(false);
    }, 1000);
  }, [props.match.params.id]);

  const redirect = routeRedirect;
  if (redirect) {
    return <Redirect to="/" />;
  }

  let currentPost;
  let editButton;
  let deleteButton;

  const updateCurrentPost = e => {
    e.preventDefault();
    console.log("updateform");
    setIsBusy(true);

    //create the object
    //update post
    const _post = {
      title: titleRef.current.value,
      content: contentRef.current.value
    };

    if (fileRef.current.files.length > 0) {
      _post["cover"] = fileRef.current.files[0];
      _post["oldcover"] = post.fileref;
    }

    console.log(_post);
    firebase
      .updatePost(postId, _post)
      .then(() => {
        console.log("post updated");
        setIsBusy(false);
        setRouteRedirect(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const deleteCurrentPost = () => {
    //delete post

    firebase
      .deletePost(postId, post.fileref)
      .then(() => {
        setRouteRedirect(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  let updateForm;
  if (editMode) {
    deleteButton = (
      <button className="delete" onClick={e => deleteCurrentPost()}>
        Delete Post
      </button>
    );

    if (isBusy) {
      updateForm = (
        <div className="processing">
          <p>Request is being processed</p>
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      updateForm = (
        <>
          <form className="editForm" onSubmit={updateCurrentPost}>
            <p>Update the current post</p>
            <label htmlFor="title">Post Title:</label>
            <input
              type="text"
              name="title"
              ref={titleRef}
              defaultValue={post.title}
            />

            <label htmlFor="content">Post Content:</label>
            <textarea
              name="content"
              ref={contentRef}
              defaultValue={post.content}
            ></textarea>

            <label htmlFor="cover" className="cover">
              Cover
            </label>
            <input type="file" name="cover" ref={fileRef} />

            <input type="submit" value="Update Post" />
          </form>
          {deleteButton}
        </>
      );
    }
  }

  if (timer) {
    currentPost = (
      <div className="processing">
        <p>Loading Post</p>
        <div className="loader">Loading...</div>
      </div>
    );
  } else {
    if (userState) {
      editButton = (
        <button className="edit" onClick={() => toggleEditMode()}>
          Edit Post
        </button>
      );
    }

    currentPost = (
      <div className="single">
        <img src={post.cover} alt="post cover" />
        <h2>{post.title}</h2>
        <div>{post.content}</div>
        {editButton}
        {updateForm}
      </div>
    );
  }

  return <>{currentPost}</>;
};

export default Post;
