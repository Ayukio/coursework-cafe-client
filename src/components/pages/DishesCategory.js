import React, {useState} from "react"

import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow} from '@material-ui/core';
import useTable from "../layouts/useTable";
import {Search} from "@material-ui/icons";
import {getAllDishesCategories} from "../../services/dish.service";
import UseInput from "../layouts/useInput";


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
    {id: 'dishCatTitle', label: 'Название категории'},
    {id: 'cookerName', label: 'Ответственный повар'},
    {id: 'minCost', label: 'Минимальная цена блюда (руб.)'},
]

const DishesCategory = () => {

    const classes = useStyles();
    const [records, setRecords] = useState(getAllDishesCategories())

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
                    return items.filter(x => x.dishCatTitle.toLowerCase().includes(target.value))
            }
        })
    }


    return (
        <div>

            <Paper className={classes.pageContent}>
                <h3>Список категорий блюд</h3>
                <br/>

                <UseInput
                    placeholder="Поиск по названию категории"
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
                                    <TableCell>{item.dishCatTitle}</TableCell>
                                    <TableCell>{item.cookerName}</TableCell>
                                    <TableCell>{item.minCost}</TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>

            </Paper>
        </div>

    )
}
export default DishesCategory;