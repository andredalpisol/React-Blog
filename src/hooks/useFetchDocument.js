import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (
  docsCollection,
  search = null,
  uid = null
) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [documents, setDocuments] = useState(null);

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);
      const collectionRef = await collection(db, docsCollection);

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where("tags", "array-contains", search)
          );
        } else if (uid) {
          q = await query(collectionRef, where("uid", "==", uid));
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docsCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  });

  return { documents, loading, error };
};
