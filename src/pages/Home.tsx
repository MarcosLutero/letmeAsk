/*
A biblioteca history permite gerência 
facilmente o histórico da sessão em 
qualquer lugar que javaScript seja 
executado. Um objeto abstrai as 
diferenças em vários ambientes e 
fornece uma API mínima que permite 
gerência a pilha de história, 
navegar e persistir o estado entre as 
sessões.
*/
import { useHistory } from 'react-router';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import {Button} from '../components/Button';

/*
sass ou scss é um pré processador css
como instalar ? 
yarn add node-sass@^5.0.0 
*/
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

/*
não importar usando o export default
pois se eu mudar o nome da função
ela nao irá mostrar o erro
*/
export function Home() {
    /*
o history é um hook e todo o hook
tem que está dentro do componente
*/
    const history = useHistory();
    /*
Usamos o contexto para salvar algumas 
informações, do g-mail (nome, avatar e 
etc) para que nao precisemos ir no 
firebase o temp todo 
*/
    const {user  ,singInWithGoogle} = useAuth()
    /*
    salvar o código da sala que o usuário
    está tendo acessar
    */
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        
        if(!user) {
            //se o usuário nao estiver autenticado 
            //ele vai chamar a função
            await singInWithGoogle();
        }else{
            //se ja estiver autenticado ele
            // vai apenas redirecionar
            history.push('/rooms/new');
        }     
    }

    //usada no formulário
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        if(roomCode.trim() === ""){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        if(!roomRef.exists()){
            alert("Room does not exists");
            return;
        }
            history.push(`/rooms/${roomCode}`)
        



    }

    return (
        /* primeiramente sempre criar o 
        "HTML" inicialmente
        depois criar o SCSS        
        */
        <div id="page-auth">
            <aside>
                {/* 
                sempre usar svg nas imagens
             
                sempre que quiser uma imagem
                no meu código eu tenho que importar
                
                webpack é um module bundler
                
                */}
                <img src={illustrationImg} alt="ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>tire suas duvidas da audição em tempo real</p>
            </aside>
            <main>

                <div className="main-content">
                    <img src={logoImg} alt="leatmeask"/>
                    <button onClick={handleCreateRoom} className="create_room"> 
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em um  sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="digite o codigo da sala"
                            onChange={event =>setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        {/*
                        Componente do react
                        se iniciar com letra maiúscula é componente do react
                        se iniciar com letra minúscula e parte do html
                        */}
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                </div>
            </main>        
        </div>
    )
}