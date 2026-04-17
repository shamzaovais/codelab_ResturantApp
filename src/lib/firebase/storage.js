import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";
import { isLocalDemoMode } from "@/src/lib/firebase/localMode.js";
import { updateLocalRestaurantImage } from "@/src/lib/localData.js";

import { updateRestaurantImageReference } from "@/src/lib/firebase/firestore";

export async function updateRestaurantImage(restaurantId, image) {
  if (isLocalDemoMode || !storage) {
    const localUrl = await uploadImage(restaurantId, image);
    updateLocalRestaurantImage(restaurantId, localUrl);
    return localUrl;
  }

  const downloadURL = await uploadImage(restaurantId, image);
  await updateRestaurantImageReference(restaurantId, downloadURL);
  return downloadURL;
}

async function uploadImage(restaurantId, image) {
  if (isLocalDemoMode || !storage) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(image);
    });
  }

  const imageRef = ref(storage, `images/${restaurantId}/${Date.now()}-${image.name}`);
  const snapshot = await uploadBytesResumable(imageRef, image);
  return getDownloadURL(snapshot.ref);
}
