import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Spinner, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import authHeader from "../../services/auth-header";


class EditorList extends Component {

    constructor(props) {
        super(props);
        this.state = {orders: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch('http://localhost:8082/api/dish', {headers: authHeader()})
            .then(response => response.json())
            .then(data => this.setState({orders: data, isLoading: false}));

    }

    async remove(id) {
        await fetch(`http://localhost:8082/api/dish/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedOrders = [...this.state.orders].filter(i => i.id !== id);
            this.setState({orders: updatedOrders});
        });
    }

    render() {
        const {orders, isLoading} = this.state;
        console.log(orders)

        if (isLoading) {
            return (
                <Spinner color="primary"/>
            );
        }

        const orderList = orders.map(order => {
            return <tr key={order.id}>
                <td>{order.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{order.title}</td>
                <td>{order.weight}</td>
                <td>{order.description}</td>
                <td>{order.cost}</td>
                <td>{order.fk_category_id}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/editor/" + order.id}>Ред.</Button>
                        &nbsp;
                        <Button size="sm" color="danger" onClick={() => this.remove(order.id)}>Удал.</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });


        return (
            <div>
                <Container>
                    <br/>
                    <br/>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/editor/new">Добавить новое</Button>
                    </div>

                    <h3>Редактор блюд, содержащихся в текущем меню</h3>

                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="5%">ID</th>
                            <th width="10%">Название блюда</th>
                            <th width="5%">Вес</th>
                            <th>Краткое описание</th>
                            <th width="5%">Цена</th>
                            <th width="10%">Категория</th>
                            <th width="10%">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EditorList;