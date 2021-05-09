import React from "react";
import HomePage from './components/pages/HomePage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditorList from "./components/pages/EditorList";
import OrderEdit from "./components/pages/Editor";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Header from "./components/layouts/Header";
import {createMuiTheme, CssBaseline, makeStyles, ThemeProvider} from '@material-ui/core';
import Dishes from "././components/pages/Dishes"
import DishesCategory from "./components/pages/DishesCategory";
import {ruRU} from "@material-ui/core/locale";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgba(91,59,55)",
            light: '#fff0da'
        },
        secondary: {
            main: "#D2691E",
            light: '#FFE4E1'
        },
        background: {
            default: "rgba(250,249,244)"
        },
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
}, ruRU)


const useStyles = makeStyles({
    appMain: {
        paddingLeft: '200px',
        paddingRight: '200px',
        width: '100%'
    }
})


const App = () => {
    const classes = useStyles();

    return (
        <div>


            <ThemeProvider theme={theme}>
                <Header/>


                <div className={classes.appMain}>
                    {/*<OrderedFoodItems/>*/}

                    <Router>
                        <Switch>
                            <Route path={["/", "/home"]} exact={true} component={HomePage}/>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                            <Route path="/categories" component={DishesCategory}/>
                            <Route path='/dishes' exact={true} component={Dishes}/>
                            <Route path='/editor' exact={true} component={EditorList}/>
                            <Route path='/editor/:id' component={OrderEdit}/>

                        </Switch>
                    </Router>

                </div>
                <CssBaseline/>
            </ThemeProvider>


        </div>
    )
}

export default App;