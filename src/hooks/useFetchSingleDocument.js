import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchSingleDocument = (docCollection, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [document, setDocument] = useState(null);

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);
        setDocument(docSnap.data());
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  });

  return { document, loading, error };
};
