import  {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import MuiForm from './components/MuiFrom';
import Grid from '@mui/material/Grid';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import Button from '@mui/material/Button';


const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                {/* <LoginForm/> */}
                <Grid container display="flex" flexDirection="column" justifyContent="center" >
                <Grid item ><MuiForm/></Grid>
                <Grid item textAlign ="center">
                    <Button variant="contained" sx={{ mt:3,mb:3, width: "400px"}} onClick={getUsers}>Получить пользователей</Button> 
                </Grid>
                
                </Grid>
               
            </div>
        );
    }

    return (
            <Grid container display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
            <h1>{store.isAuth ? `Пользователь ${store.user.email} зарегистрирован ` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{store.user.isActive ? `Аккаунт подтвержден по почте` : `ПОДТВЕРДИТЕ АККАУНТ!!!!`}</h1>
            <Button sx={{ mt:3, width: "400px"}} variant="contained" onClick={() => store.logout()}>Выйти</Button>
            <div>
                <Button variant="contained" sx={{ mt:3, width: "400px"}} onClick={getUsers}>Получить пользователей</Button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
            </Grid>
    );
};

export default observer(App);