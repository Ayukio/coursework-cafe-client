import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import authHeader from "../../services/auth-header";


class Editor extends Component {

    emptyOrder = {
        title: '',
        weight: '',
        description: '',
        cost: '',
        fk_category_id: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyOrder
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const order = await (await fetch(`http://localhost:8082/api/dish/${this.props.match.params.id}`, {headers: authHeader()})).json();
            this.setState({item: order});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('http://localhost:8082/api/dish', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                // `${authHeader()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/editor');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Изменить блюдо' : 'Добавить новое блюдо'}</h2>;

        return <div>
            <Container>
                <br/>
                {title}
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="title">Название блюда (строка)</Label>
                        <Input type="text" name="title" id="title" value={item.title || ''}
                               onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="weight">Вес (число)</Label>
                        <Input type="text" name="weight" id="weight" value={item.weight || ''}
                               onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Краткое описание (строка)</Label>
                        <Input type="text" name="description" id="description" value={item.description || ''}
                               onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cost">Цена (число)</Label>
                        <Input type="text" name="cost" id="cost" value={item.cost || ''}
                               onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="fk_category_id">Категория (число)</Label>
                        <Input type="text" name="fk_category_id" id="fk_category_id" value={item.fk_category_id || ''}
                               onChange={this.handleChange} autoComplete="off"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Сохранить</Button>{' '}
                        <Button color="secondary" tag={Link} to="/editor">Закрыть</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(Editor);