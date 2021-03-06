/*exportando o contexto do react
o useEffect(rook) serve para recuperar o informação de 
autenticação do usuário se ele atualizar (f5) 
*/
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

//criando o contexto
//preciso exportar o contexto pra poder utilizar
// as any significa ignorar a tipagem
// {} as -> é uma função
export const AuthContext = createContext({} as AuthContextType);

//quais informações eu vou ter no meu contexto
type AuthContextType = {
    // ou e um objeto do tio usuário ou e indefinido
    user: User | undefined,
    /*toda a requisição async/await retorna uma promisse
    por isso o Promisse<>*/
    singInWithGoogle: () => Promise<void>,
}

//formato do usuário 
type User = {
    id: string;
    name: string;
    avatar: string;
}

/* é criado essa tipagem
    pq quando envio um conteúdo por dentro do componente
    chamamos de children

    o tipo é RectNode 
    */
type AuthContextProvider = {
    children: ReactNode;
}
export function AuthContextProvider(props: AuthContextProvider) {
    //estado
    const [user, setUser] = useState<User>();

    /*recebe dois parâmetros
    primeiro qual função eu quero executar 
    segundo quando eu quero executar , 
    sempre vai ser um array
    
    o useEffect é um hook pois ele começa com o "use"
    */
    useEffect(() => {
        // sempre que usar um evento 
        //listener e bom colocar numa variável
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const {
                    displayName, photoURL, uid
                } = user
                if (!displayName || !photoURL) {
                    throw new Error('Missing information  from Google Account');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })

            }
        })

        return () => {
            //para desativar pq eu tenho
            //a obrigação de me des-cadastrar
            unsubscribe();
        }
//se eu quero disparar a função apenas uma unica vez 
//eu deixo o vetor vazio
    }, [])


    /*sintaxe async define uma função assíncrona
    é preciso aguardar a requisição e resposta da API,
    não podemos bloquear o funcionamento de todo 
    o nosso programa */
    async function singInWithGoogle() {
        //importação direta do firebase (ja criado)
        const provider = new firebase.auth.GoogleAuthProvider();
        //vai abrir como um popUP
        const result = await auth.signInWithPopup(provider);
        //console.log(result)

        if (result.user) {
            /* 
            se o resultado da busca for verdadeiro
            eu vou buscar algumas informações do meu usuário
            */
            const {
                displayName, photoURL, uid
            } = result.user
            if (!displayName || !photoURL) {
                /*
                se o usuário nao tiver as informações requeridas acima
                vou disparar um erro                
                */
                throw new Error('Missing information  from Google Account');
            }
            /*
             se ele tiver eu vou preencher as informações
             */
            setUser({
                //se eu nao criar a tipagem ele dará error
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }

    }
    return (
        /*compartilhando o usuário com todas 
        as paginas da aplicação do usuário logado
        
        pq compartilhar a função singInWithGoogle?
        pq na minha aplicação vou ter mais de um 
        local para se fazer login
        
        */

        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}