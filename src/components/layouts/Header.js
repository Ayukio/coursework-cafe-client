import React, {useEffect, useState} from "react";
import {AppBar, Button, Grid, IconButton, makeStyles, Toolbar} from '@material-ui/core'
import AuthService from "../../services/auth.service";
import EditIcon from '@material-ui/icons/Edit';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'rgba(242,240,227)',
        textDecoration: 'none',
        boxShadow: '4px 4px 20px 1px rgba(127, 94, 70, 0.18)'

    }
}))

export default function Header() {

    const classes = useStyles();


    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                      alignItems="center">
                    <Grid item xs={1.5}>
                        <IconButton href={"/"}>MyCafe&nbsp;&nbsp;</IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        {showAdminBoard && (
                            <Button href="/editor" color="primary" startIcon={<EditIcon/>}>
                                Редактор
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={1}>
                        {showAdminBoard && (
                            <Button href="/categories" color="primary" startIcon={<ClearAllIcon/>}>
                                Категории
                            </Button>
                        )}
                    </Grid>
                    <Grid item xs={1}>
                        {showAdminBoard && (
                            <Button href="/dishes" color="primary" startIcon={<RestaurantIcon/>}>
                                Блюда
                            </Button>
                        )}
                    </Grid>
                    <Grid item sm>
                    </Grid>
                    {currentUser ? (<div>
                            <span>
                                <Grid item>
                                    <Button href="/login" color="primary" variant="outlined" onClick={logOut}>
                                        Выход
                                    </Button>
                                </Grid>
                            </span>

                        </div>


                    ) : (
                        <div>
                            <Button href="/login" color="primary" variant="outlined">
                                Вход
                            </Button>
                            &nbsp;&nbsp;
                            <Button href="/register" color="secondary" variant="outlined">
                                Регистрация
                            </Button>
                        </div>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}