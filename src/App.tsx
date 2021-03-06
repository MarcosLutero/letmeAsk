/*
 Para se fazer navegação no react usamos as rotas
 ela e uma biblioteca para ser instalada
 para isso usamos o comando: "yarn add react-router-dom" (DOM - html)

 Este projeto está usando o typescript mas o pacote router-dom não foi desenvolvido
 usando o typescript então instalamos um pacote terceiro
 comando: "yarn add @types/react-router-dom - D"
 "yarn add @types/nome do pacote -dependência "
*/

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NewRoom } from './pages/NewRoom';
import { Home } from './pages/Home';
import { AuthContextProvider } from './context/AuthContext'
import { Room } from './pages/Room';

/*
o react tem 3  conceitos
COMPONENTES
PROPRIEDADES
ESTADO


O function App(){...} é um componente
todo componente é uma função que devolve um html  


propriedade são informações que passamos 
para um componente para se comportar de
maneira diferente


Estado é uma informação mantida por um componente
dentro do react
informação alterada pelo usuário


o principio da imutabilidade diz que 
no momento que uma variável for 
criada dentro de um estado de um 
componente ela não sofre alterações
sempre a gente cria uma nova 
informação baseada na informação
anterior

*/

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          {/*
        O caminho "path = " pode ser qualquer coisa
        exceto a Home
        pois se eu quiser que seja a pagina inicial tem que ser
        '/' exact 
        */}
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' exact component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
        </Switch>
      </AuthContextProvider>

    </BrowserRouter>
  );
}

export default App;
