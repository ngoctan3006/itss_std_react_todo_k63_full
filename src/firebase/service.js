import firebase, { db } from './config';

export const getItems = async () => {
  try {
    const snapshot = await db.collection('todos').get();
    const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return items;
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (item) => {
  try {
    const todoRef = db.collection('todos');
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (item, id) => {
  try {
    const todoRef = db.collection('todos').doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
};

export const clearItem = async (item) => {
  const todoRef = db.collection('todos').doc(item.id);
  await todoRef
    .delete()
    .then(function () {})
    .catch(function (err) {
      console.log(err);
    });
};

export const storeUserInfo = async (user) => {
  const { uid } = user;
  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists) {
    await db.collection('users').doc(uid).set({ photoURL: user.photoURL, name: user.displayName });
    return {
      name: user.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
};

export const updateUser = async (user, image) => {
  try {
    const userDoc = await firebase.firestore().collection('users').doc(user.id).get();
    if (userDoc.exists) {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .update({ ...userDoc.data(), image: image });
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = '';
  try {
    await ref.put(image);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};
