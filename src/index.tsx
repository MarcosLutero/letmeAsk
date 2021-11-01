/* 
usado para varios desenvolvimento como
Tv, mobile, web e etc
*/
import React from 'react';

/*
importado dentro do react o DOM (Document 
  object model) para fazer paginas para web
*/
import ReactDOM from 'react-dom';
import App from './App';
import './services/firebase';

import './styles/global.scss';

/*
chaamando o render do DOM (é execultado
 uma unica vez), renderizando algo 
 dentro do meu arquivo em html
 */
ReactDOM.render(
  /*
  o <App/ é um arquivo existente 
  e eu executo dentro do index.tsx>
  */
  <React.StrictMode>
    
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/*
quando eu trabalho com arquivos HTML dentro do
javaScript eu chamo ele de JSX
(TSX === typescript)
*/

