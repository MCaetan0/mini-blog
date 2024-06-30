import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

//collection onde salva os dados, os posts etc -
//addDoc faz insert
//timestamp marca hora da criacao

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//docColewction quando insere algo mno sistema precisa informar a coleção

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);
  //dealwith memory leak
  const [cancelled, setCancelled] = useState(false);

  //antes de qualquer ação ve se está cancelado
  const checkCalcelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCalcelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deletedDocument = await deleteDoc(db, doc(docCollection, id));

      checkCalcelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });
    } catch (error) {
      checkCalcelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
