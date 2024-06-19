async function uploadOnFirebase(blob) {
  const storage = getStorage(app);
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `post/${postForm.title.split(" ").join("-")}`
    );
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Error uploading image:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
export default uploadOnFirebase;
