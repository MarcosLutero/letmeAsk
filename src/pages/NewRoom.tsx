import {Link} from 'react-router-dom'   
import {FormEvent, useState} from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import {Button} from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom() {

    const {user} = useAuth();
    
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom (event:FormEvent){
        event.preventDefault();
        
        if(newRoom.trim() === ''){
            return;
        }
        //salvar no Banco usando a referencia do registo
        const roomRef = database.ref('rooms');

        //fazendo um push dentro da room
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            //pega o usuario (o ? significa que ele pode ser undefinided)
            authorId: user?.id, 
        })
    } 
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilustracao" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>tire suas duvidas da audição em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="leatmeask"/>
                  <h2>Criar uma nova sala</h2>
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
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>       
        </div>
    )
}