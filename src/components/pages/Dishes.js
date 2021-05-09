import React, {useState} from "react"
import {Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import useTable from "../layouts/useTable";
import {Search} from "@material-ui/icons";
import {getAllDishes} from "../../services/dish.service";
import UseInput from "../layouts/useInput";
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import IconButton from "@material-ui/core/IconButton";
import {Basket} from "../layouts/Basket";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
}))


const headCells = [
    {id: 'id', label: 'ID'},
    {id: 'title', label: 'Название блюда'},
    {id: 'weight', label: 'Вес (г)'},
    {id: 'description', label: 'Краткое описание'},
    {id: 'cost', label: 'Цена (руб)'},
    {id: 'addToCart', label: '', disableSorting: true},
]

const Dishes = () => {

    const classes = useStyles();
    const [records, setRecords] = useState(getAllDishes())
    const [cartItems, setCartItems] = useState([])

    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.title.toLowerCase().includes(target.value))
            }
        })
    }

    const onAdd = (product) => {
        const exist = cartItems.find(x => x.id === product.id)
        if (exist) {
            setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1} : x))
        } else {
            setCartItems([...cartItems, {...product, qty: 1}])
        }
    }
    const onRemove = (product) => {
        const exist = cartItems.find(x => x.id === product.id)
        if (exist.qty === 1) {
            setCartItems(cartItems.filter(x => x.id !== product.id))
        } else {
            setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty - 1} : x))
        }

    }


    return (
        <div>

            <Paper className={classes.pageContent}>
                <h3>&nbsp;Блюда, доступные к заказу</h3>
                <br/>
                <UseInput
                    placeholder="Поиск по названию блюда..."
                    className={classes.searchInput}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search/>
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.weight}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.cost}</TableCell>
                                    <TableCell><IconButton onClick={() => onAdd(item)}><AddCircleOutlineTwoToneIcon
                                        color='primary' fontSize="medium"/></IconButton></TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>

            </Paper>
            <Basket onAdd={onAdd} cartItems={cartItems} onRemove={onRemove}/>
        </div>

    )
}
export default Dishes;