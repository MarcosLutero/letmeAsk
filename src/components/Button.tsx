/*
componente criado
um componente é uma função
*/


//importa todos as propriedades do botão do html
import {ButtonHTMLAttributes} from 'react';

import '../styles/button.scss'

/**
 tipagem 
 typescript não é uma linguagem de programação
 ele é um super set -> conjunto de ferramentas que usa o javascript
 ele adiciona tipagem estática no js
 ou seja definimos um tipo da variavel
 */
type ButtonProps= ButtonHTMLAttributes<HTMLButtonElement>

// repasse de props
export function Button(props: ButtonProps){

    return(
        //pega todas as propriedades
        <button className="button" {...props}>

        </button>
    )

}



