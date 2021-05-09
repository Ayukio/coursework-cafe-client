import React, {useEffect, useState} from "react";
import {Container} from 'reactstrap';
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";
import Button from "@material-ui/core/Button";
import SubjectIcon from '@material-ui/icons/Subject';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(5)
    },
    intro: {
        fontSize: '20px',
        width: '95%'
    },
    pic: {
        height: '65%',
        width: '65%',
        paddingLeft: '250px',

    }
}))

const HomePage = () => {
    const classes = useStyles();
    const currentUser = AuthService.getCurrentUser();
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div>
            <Container>

                <Paper className={classes.pageContent}>
                    <h3>
                        Добро пожаловать, <strong>{currentUser.username}</strong>!
                    </h3>
                    <hr/>
                    <br/>
                    <Typography className={classes.intro}>Это простое информационно-справочное приложение,
                        созданное для удобства учета актуальных на сегодняшний день позиций блюд в
                        меню: как для персонала ресторана, так и для посетителей.</Typography>

                    <br/>
                    <img
                        src="https://www.pngkey.com/png/full/202-2025136_restaurant-drawing-cafe-todd-chavez-waiter-free-commercial.png"
                        className={classes.pic}/>
                    <hr/>

                    <Button color="link"><Button href="/dishes"
                                                 color="primary"
                                                 size="large"
                                                 variant='outlined'
                                                 startIcon={<SubjectIcon/>}>К списку блюд</Button></Button>
                </Paper>

            </Container>
            <h3>{content}</h3>
        </div>
    );
}

export default HomePage;