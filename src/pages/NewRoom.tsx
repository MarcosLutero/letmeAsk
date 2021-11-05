import {Link, useHistory} from 'react-router-dom'   
import {FormEvent, useState} from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import {Button} from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {

    const history = useHistory()
    const {user} = useAuth();
    
    const [newRoom, setNewRoom] = useState('');

    /*toda a função passa por algum 
    vento nativo do html (tipo o 
    onSubmit) ela geralmente por padrão
    recebe por parâmetro o próprio evento
    
    Devemos também escolher o tipo no 
    caso escolhemos o formEvent
    */
    async function handleCreateRoom (event:FormEvent){
        /* o preventDefault vai 
        prevenir o comportamento padrão*/
        event.preventDefault();
        
        //apaga os espaços em bran co
        if(newRoom.trim() === ''){
            return;
        }
        //salvar no Banco usando a referencia do registo
        const roomRef = database.ref('rooms');

        //fazendo um push dentro da room
        const firebaseRoom = await roomRef.push({
            //titulo da sala
            title: newRoom,
            /*pega o usuário (do userAuth)
            (o ? significa que ele 
            pode ser undefined)
            */

            /*
             o authorId é importante pois 
             quero saber qual usuário vai 
             ter permissão alterar dados 
             do sistema
             */
            authorId: user?.id, 
        })
        
        history.push(`/rooms/${firebaseRoom.key}`)
    } 
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>tire suas duvidas da audição em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="leatmeask"/>
                  <h2>Criar uma nova sala</h2>
                   {/*
                   por padrão todo o formulário envia 
                   o usuário para algum lugar 

                   Nessa aplicação nao queremos isso
                   */}
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="digite o nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? 
                        {/*
                         O Link funciona como se fosse a 
                         tag <a></a> do html
                         lembre-se de importar
                        */}
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>       
        </div>
    )
}