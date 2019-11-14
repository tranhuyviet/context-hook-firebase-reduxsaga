import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCBkAmFo3CUifL7XdjZlt4I8SSVvXYRt2E",
  authDomain: "context-firebase-app.firebaseapp.com",
  databaseURL: "https://context-firebase-app.firebaseio.com",
  projectId: "context-firebase-app",
  storageBucket: "context-firebase-app.appspot.com",
  messagingSenderId: "78032650886",
  appId: "1:78032650886:web:3c28b48c8a052cfb9e4707",
  measurementId: "G-HNH7GPEW4D"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  //login
  async login(email, password) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        return error;
      });
    return user;
  }

  //signin
  async signin(email, password) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        return error;
      });
    return user;
  }

  //logout
  async logout() {
    const logout = await firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log(error);
        return error;
      });
    return logout;
  }

  //check user is actually login?
  async getUserState() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  //get all posts from firebase
  async getPosts() {
    let postArray = [];
    const post = await firebase
      .firestore()
      .collection("Posts")
      .get();
    post.forEach(doc => {
      postArray.push({ id: doc.id, data: doc.data() });
    });
    return postArray;
  }

  //get single post with id from firebase
  async getPost(postId) {
    const post = await firebase
      .firestore()
      .collection("Posts")
      .doc(postId)
      .get();
    const postData = post.data();
    return postData;
  }

  //upload post to firebase
  async createPost(post) {
    //console.log(post);
    const storageRef = firebase.storage().ref();
    const storageChild = storageRef.child(post.cover.name);
    const postCover = await storageChild.put(post.cover); //upload
    const downloadURL = await storageChild.getDownloadURL(); //download
    const fileRef = postCover.ref.location.path;

    let newPost = {
      title: post.title,
      content: post.content,
      cover: downloadURL,
      fileref: fileRef
    };

    const firestorePost = await firebase
      .firestore()
      .collection("Posts")
      .add(newPost)
      .catch(error => {
        console.log(error);
        return error;
      });
    return firestorePost;
  }

  //update post
  async updatePost(postid, postData) {
    console.log("update post: ", postid, postData);
    if (postData["cover"]) {
      console.log("cover");
      const storageRef = firebase.storage().ref();
      const storageChild = storageRef.child(postData.cover.name);
      const postCover = await storageChild.put(postData.cover); //upload
      const downloadURL = await storageChild.getDownloadURL(); //download
      const fileRef = postCover.ref.location.path;

      await storageRef
        .child(postData["oldcover"])
        .delete()
        .catch(error => {
          console.log("delete image old");
          console.log(error);
        });

      let updatedPost = {
        title: postData.title,
        content: postData.content,
        cover: downloadURL,
        fileref: fileRef
      };

      const post = await firebase
        .firestore()
        .collection("Posts")
        .doc(postid)
        .set(updatedPost, { merge: true })
        .catch(error => {
          console.log(error);
        });

      return post;
    } else {
      console.log("not cover", postData);

      const post = await firebase
        .firestore()
        .collection("Posts")
        .doc(postid)
        .set(postData, { merge: true })
        .catch(error => {
          console.log(error);
        });
      return post;
    }
  }

  //delete post
  async deletePost(postid, fileref) {
    //delete Image from firebase
    // console.log("delete post:", postid, fileref);
    const storageRef = firebase.storage().ref();
    await storageRef
      .child(fileref)
      .delete()
      .catch(error => console.log(error));
    console.log("Image deleted");

    //delete post from firebase
    const post = await firebase
      .firestore()
      .collection("Posts")
      .doc(postid)
      .delete()
      .catch(error => console.log(error));
    console.log("Post delete");

    return post;
  }
}

export default new Firebase();
