import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null }; // Atualiza o estado para indicar que está carregando e não há erro.
    case "DELETED_DOC":
      return { loading: false, error: null }; // Atualiza o estado para indicar que o documento foi deletado e não há erro.
    case "ERROR":
      return { loading: false, error: action.payload }; // Atualiza o estado para indicar que houve um erro, e define a mensagem de erro.
    default:
      return state; // Retorna o estado atual para ações não reconhecidas.
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  // é uma função que garante que as ações só sejam despachadas se o hook não tiver sido cancelado.
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" }); // Despacha a ação de carregamento.

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      //despacha ação de documento deletado
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response }; // Retorna a função deleteDocument e o estado response.
};
