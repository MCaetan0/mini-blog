import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id); // Cria uma referência ao documento no Firestore.
        const docSnap = await getDoc(docRef); // Busca o documento usando a referência.

        setDocument(docSnap.data()); // Armazena os dados do documento no estado `document`.
      } catch (error) {
        console.log(error);
        setError(error.message);
      }

      setLoading(false); // Indica que a busca do documento foi concluída.
    };

    loadDocument();
  }, [docCollection, id]); // Executa o efeito sempre que `docCollection` ou `id` mudarem.

  console.log(document);

  return { document, loading, error };
};
