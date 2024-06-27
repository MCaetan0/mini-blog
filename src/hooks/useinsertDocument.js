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

const insertReducer = (state, action) => {};

//docColewction quando insere algo mno sistema precisa informar a coleção

export const useinsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);
  //dealwith memory leak
  const [cancelled, setCancelled] = useState(false);

  //antes de qualquer ação ve se está cancelado
  const checkCalcelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };
};
