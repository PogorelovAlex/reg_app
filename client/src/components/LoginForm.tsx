import {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [name,setName] = useState<string> ('') 
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div>
             <input
                onChange={e => setName(e.target.value)
                }
                value={name}
                type="text"
                placeholder='имя'
            />
            <input
                onChange={e => setEmail(e.target.value)
                }
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <input
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder='подтверждение пароля'
            />
            <button onClick={() => store.login(email, password)
            }>
                Логин
            </button>
            <button onClick={() => store.singup(name,email, password , confirmPassword)}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);