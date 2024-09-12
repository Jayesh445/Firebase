import { useState } from "react"
import { auth ,googleProvider } from "../config/firebase-config"
import { createUserWithEmailAndPassword ,signInWithPopup, signOut } from "firebase/auth"

export const Auth = () => {
    const [email ,setEmail] = useState('');
    const [password , setPassword] = useState('');
    

    const signin = async () => {
        try{
            await createUserWithEmailAndPassword(auth , email , password);
        }catch(err){
            console.log(err);
            
        }
    }
    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth ,googleProvider);
        }catch(err){
            console.log(err);
            
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
        }catch(err){
            console.log(err);
            
        }
    }

    return (
        <div>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password..." onChange={e => setPassword(e.target.value)} />
            <button onClick={signin}>Signin</button>

            <button onClick={signInWithGoogle}>Google</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}