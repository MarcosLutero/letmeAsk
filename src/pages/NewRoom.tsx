import {Link} from 'react-router-dom'   
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import {Button} from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';

export function NewRoom() {
    
   const {user} = useAuth();
    
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
                    <form >
                        <input
                            type="text"
                            placeholder="digite o nome da sala"
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