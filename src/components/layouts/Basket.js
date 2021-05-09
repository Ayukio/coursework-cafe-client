import React, {useState} from "react"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ButtonGroup from "@material-ui/core/ButtonGroup";


const useStyles = makeStyles(theme => ({
    paperRoot: {
        margin: '50px 0px 50px 200px',
    },
    paperItems: {
        width: '600px',
        margin: '15px 0px'

    },
    inputs: {
        width: '20%',
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    summary: {
        marginLeft: '15px',
        fontSize: '18px'
    },
    buttonGroup: {
        backgroundColor: '#fff0da',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        },
        totalPerItem: {
            fontWeight: 'bolder',
            fontSize: '1.2em',

        }
    }
}))

export const Basket = (props) => {
    const {cartItems, onAdd, onRemove} = props;
    const classes = useStyles()
    const itemsPrice = cartItems.reduce((acc, currItem) => acc + currItem.cost * currItem.qty, 0)
    const discountPrice = itemsPrice * 0.1
    const totalPrice = itemsPrice - discountPrice
    return (
        <List className={classes.paperRoot}>
            <h3>Конструктор обеда в MyCafe</h3>
            {cartItems.length === 0 && <ListItem>
                <ListItemText
                    primary="Корзина пуста. Пожалуйста, выберите интересующие Вас позиции из списка."
                    primaryTypographyProps={{
                        style: {
                            fontStyle: 'italic'
                        }
                    }}
                />
            </ListItem>}
            {cartItems.map(item => (
                <Paper key={item.id} className={classes.paperItems}>
                    <ListItem key={item.id}>
                        <ListItemText primary={item.title} primaryTypographyProps={{
                            component: 'h1',
                            style: {
                                fontWeight: '500',
                                fontSize: '1.2em'
                            }
                        }}
                                      secondary={
                                          <div>
                                              <ButtonGroup size="medium" className={classes.buttonGroup}>
                                                  <Button onClick={() => onAdd(item)}>+</Button>
                                                  <Button
                                                      disabled
                                                  >{item.qty}</Button>
                                                  <Button onClick={() => onRemove(item)}>-</Button>
                                              </ButtonGroup>
                                              <span className={classes.totalPerItem}>
                                            &nbsp;{item.qty} x {item.cost}
                                            </span>
                                          </div>

                                      }/>

                    </ListItem>
                </Paper>
            ))}
            {cartItems.length !== 0 && (
                <Typography className={classes.summary}>
                    <div>Цена выбранных блюд: {itemsPrice} руб.</div>
                    <div>Скидка составит: {discountPrice.toFixed(2)} руб.</div>
                    <hr/>
                    <strong>Итоговая сумма обеда: {totalPrice} руб.</strong>
                </Typography>
            )}
        </List>
    )
}
