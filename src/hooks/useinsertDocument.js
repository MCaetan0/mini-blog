import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp, loadBundle } from "firebase/firestore";

//collection onde salva os dados, os posts etc -
//addDoc faz insert
//timestamp marca hora da criacao

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };

    case "INSERT_DOC":
      return { loading: false, error: null };

    case "ERROR":
      console.log("eeror");
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//docColewction quando insere algo mno sistema precisa informar a coleção

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  //dealwith memory leak
  const [cancelled, setCancelled] = useState(false);

  //antes de qualquer ação ve se está cancelado
  const checkCalcelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCalcelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...document, created_at: new Date() };

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCalcelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      console.log(error);
      checkCalcelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};

/* 
insertDocument é uma função assíncrona que insere um novo documento na coleção especificada no Firestore.
Antes de iniciar a inserção, dispara a ação LOADING para indicar que a operação está em andamento.
Cria um novo documento adicionando a data de criação (created_at) como a data atual.
Utiliza addDoc para adicionar o documento à coleção no Firestore.
Após a conclusão bem-sucedida, dispara a ação INSERT_DOC para indicar que o documento foi inserido.
Em caso de erro, captura e loga o erro, e então dispara a ação ERROR com a mensagem de erro.
 */
