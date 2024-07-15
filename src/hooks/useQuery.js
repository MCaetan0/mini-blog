import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
  const { search } = useLocation(); //extrai search da location atual da url

  return useMemo(() => new URLSearchParams(search), [search]);
}

//search string de consulta
/* return useMemo(() => new URLSearchParams(search), [search]);
Usa useMemo para criar e memoizar uma instância de URLSearchParams com base na string de search da URL.
new URLSearchParams(search) cria um objeto URLSearchParams a partir da string de consulta search, permitindo fácil manipulação e obtenção dos parâmetros de consulta.
[search] é a dependência para useMemo, ou seja, o valor de retorno será recalculado apenas quando search mudar.
Objetivo: A função useQuery é utilizada para obter e gerenciar os parâmetros de consulta */
