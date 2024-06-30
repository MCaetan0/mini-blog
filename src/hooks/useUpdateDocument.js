import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

//collection onde salva os dados, os posts etc -
//addDoc faz insert
//timestamp marca hora da criacao

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//docColewction quando insere algo mno sistema precisa informar a coleção

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  //dealwith memory leak
  const [cancelled, setCancelled] = useState(false);

  //antes de qualquer ação ve se está cancelado
  const checkCalcelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCalcelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const docRef = await doc(updateDoc, data);

      const updatedDocument = await updateDoc(docRef, data);

      checkCalcelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
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

  return { updateDocument, response };
};
