import { Container } from './styles';
import { memo, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { UsuarioContext } from 'common/context/Usuario';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {
  const { carrinho, adicionarProduto, removerProduto, valorTotal } = useCarrinhoContext();
  const { saldo } = useContext(UsuarioContext);
  const itemNoCarrinho = carrinho.find(item => item.id === id);
  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => removerProduto(id)}
            disabled={!itemNoCarrinho || itemNoCarrinho.quantidade === 0}
          >
            <RemoveIcon />
          </IconButton>
          {produtoNoCarrinho?.quantidade || 0}
          <IconButton
            color="primary"
            disabled={valorTotal > saldo}
            onClick={() => adicionarProduto({ nome, foto, id, valor, unidade })}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)