import { createContext, useState } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento";

export const PagamentoProvider = ({ children }) => {
  const tiposPagamento = [
    {
      nome: "Boleto",
      juros: 1,
      id: 1,
    },
    {
      nome: "Cartao de Credito",
      juros: 1.3,
      id: 2,
    },
    {
      nome: "Pix",
      juros: 1,
      id: 3,
    },
    {
      nome: "Crediario",
      juros: 1.5,
      id: 4,
    },
  ];
  const [formaPagamento, setFormapagamento] = useState(tiposPagamento[0]);
  return (
    <PagamentoContext.Provider
      value={{
        tiposPagamento,
        formaPagamento,
        setFormapagamento,
      }}>
      {children}
    </PagamentoContext.Provider>
  );
};