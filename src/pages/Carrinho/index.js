import {
  Button,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext, useState, useMemo } from "react";
import {
  Container,
  Voltar,
  TotalContainer,
  PagamentoContainer,
} from "./styles";
import { useCarrinhoContext } from "common/context/Carrinho";
import Produto from "components/Produto";
import { usePagamentoContext } from "common/context/Pagamento";
import { UsuarioContext } from "common/context/Usuario";
import { useNavigate } from "react-router-dom";

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { carrinho, valorTotal, efetuarCompra } = useCarrinhoContext();
  // atualizando o saldo do usuário no carrinho. Colocamos o '= 0' para que ele não comece como undefined
  const { saldo } = useContext(UsuarioContext);
  const { tiposPagamento, formaPagamento, mudarFormaPagamento } =
    usePagamentoContext();
  const navigate = useNavigate();
  // o useMemo é parecido com o useEffect e vai manter o componente que tem "total" sem re-renderizar, a não ser que "saldo" ou "valorTotal" sofram alteração
  const total = useMemo(() => saldo - valorTotal, [saldo, valorTotal]);

  return (
    <Container>
      <div>
        <Voltar onClick={() => navigate("/feira")} />
        <h2>Carrinho</h2>
      </div>
      {/* mostrando itens adicionados no carrinho na página de Carrinho */}
      {carrinho.map((produto) => (
        <Produto {...produto} key={produto.id} />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select
          value={formaPagamento.id}
          onChange={(e) => mudarFormaPagamento(e.target.value)}>
          {tiposPagamento.map((tipo) => (
            <MenuItem value={tipo.id} key={tipo.id}>
              {tipo.nome}
            </MenuItem>
          ))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
        <div>
          <h2>Total no Carrinho: </h2>
          <span>R$ {valorTotal.toFixed(2)} </span>
        </div>
        <div>
          <h2> Saldo: </h2>
          <span> R$ {Number(saldo).toFixed(2)}</span>
        </div>
        <div>
          <h2> Saldo Total: </h2>
          <span> R$ {total.toFixed(2)} </span>
        </div>
      </TotalContainer>
      <Button
        disabled={total < 0 || carrinho.length === 0}
        onClick={() => {
          setOpenSnackbar(true);
          efetuarCompra();
        }}
        color="primary"
        variant="contained">
        Comprar
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}>
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity="success">
          Compra feita com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default Carrinho;
