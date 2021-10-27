import { useHistory } from 'react-router';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import {Button} from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';



export function Home() {
    const history = useHistory();

    const {user  ,singInWithGoogle} = useAuth()

    function handleCreateRoom(){

        if(!user) {
            singInWithGoogle();
        }else{
            history.push('/rooms/new');
        }
       
        
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
                    <button onClick={handleCreateRoom} className="create_room"> 
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em um  sala</div>
                    <form >
                        <input
                            type="text"
                            placeholder="digite o codigo da sala"
                        />
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                    `
                </div>
            </main>
            `
        </div>
    )
}