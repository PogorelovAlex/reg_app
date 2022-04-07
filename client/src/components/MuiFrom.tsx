import {FC, useState,useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface State {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const MuiForm: FC = () => {
  const [values, setValues] = useState<State>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const {store} = useContext(Context);
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
      setValues({
      ...values,
      showPassword: !values.showPassword,
    });  
};
const handleClickShowConfirmPassword = () => {
  setValues({
    ...values,
    showConfirmPassword: !values.showConfirmPassword,
  });
};   

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
  
    <Grid container 
    justifyContent="center"
    alignItems="center"

    >
      <Typography variant="h3" component="div" gutterBottom> 
        Страница регистрации
      </Typography>
     <Grid container 
    direction="column"
    justifyContent="center"
    alignItems="center"
    
    >
      <Grid item>
        <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-name">Имя</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.name ? 'text' : 'name'}
          value={values.name}
          onChange={handleChange('name')}
          label="Name"
        />
      </FormControl>
      </Grid>
      <Grid item>
      <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email"
          type={values.email ? 'text' : 'email'}
          value={values.email}
          onChange={handleChange('email')}
          label="Email"
        />
      </FormControl>
      </Grid>
     <Grid item>
     <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
     </Grid>
    
      <Grid item>
      <FormControl sx={{ m: 1, width: '250px' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-confirmPassword">Подтвердите пароль</InputLabel>
        <OutlinedInput
          id="outlined-adornment-confirmPassword"
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="confirmPassword"
        />
      </FormControl>

      </Grid>
      <Grid sx={{mt:3}} container justifyContent="center" alignItems="center">

        <Button sx={{ width: "150px" }} variant="contained" onClick={() => store.login(values.email, values.password)
            }>
                Вход
            </Button>
            <Button sx={{ width: "150px", ml: 3 }} variant="contained" onClick={() => store.singup(values.name, values.email, values.password , values.confirmPassword)}>
                Регистрация
            </Button>

      </Grid>
      
    </Grid>
    
</Grid>  
  );
};


export default observer(MuiForm);