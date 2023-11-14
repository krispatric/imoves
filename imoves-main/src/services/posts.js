import firebase from "firebase";

let comment_listner_instance = null
export const get_feed = () =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("post")
      .get()
      .then((res) => {
        let posts = res.docs.map((value) => {
          const id = value.id;
          const data = value.data();
          return { id, ...data };
        });
        resolve(posts);
      });
  });

export const get_like_by_id = (post_id, uid) =>
  new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("post")
      .doc(post_id)
      .collection("likes")
      .doc(uid)
      .get()
      .then((res) => resolve(res.exists));
  });

export const update_like = (post_id, uid, current_like_state) => {
  if (current_like_state) {
    firebase
      .firestore()
      .collection("post")
      .doc(post_id)
      .collection("likes")
      .doc(uid)
      .delete();
  } else {
    firebase
      .firestore()
      .collection("post")
      .doc(post_id)
      .collection("likes")
      .doc(uid)
      .set({});
  }
};

export const add_comment = (post_id, creator, comment) => {
  firebase.firestore()
    .collection('post')
    .doc(post_id)
    .collection('comments')
    .add({ creator, comment, creation: firebase.firestore.FieldValue.serverTimestamp(), })
}

export const comment_listner = (post_id, set_comment_list) => {
  comment_listner_instance = firebase.firestore()
    .collection('post')
    .doc(post_id)
    .collection('comments')
    .orderBy('creation', 'desc')
    .onSnapshot((snapshot) => {
      if (snapshot.docChanges().length == 0) { return; }
      let comments = snapshot.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return { id, ...data }
      })
      set_comment_list(comments)
    })
}

export const clear_comment_listener = () => {
  if (comment_listner_instance != null) { comment_listner_instance(); comment_listner_instance = null }
}

export const get_posts_by_user_id = (uid = firebase.auth().currentUser.uid) => new Promise((resolve, reject) => {
  firebase.firestore()
    .collection('post')
    .where('creator', '==', uid)
    .orderBy('creation', 'desc')
    .onSnapshot((snapshot) => {
      let posts = snapshot.docs.map(doc => {
        const data = doc.data()
        const id = doc.id
        return { id, ...data }
      })
      resolve(posts)
    })
})
