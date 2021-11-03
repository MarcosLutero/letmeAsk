//criando meu primeiro hooks

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth(){
    const value =  useContext(AuthContext)

    return value;
}