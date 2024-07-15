import { useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  // O provedor AuthContext envolve os componentes filhos e fornece o valor de autenticação
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  // useContext é usado para acessar o valor atual do AuthContext
  return useContext(AuthContext);
}
