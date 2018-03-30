import React, { Component } from 'react';

class Categoria extends Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);

        this.state = {
            produtos: [],
            categoria: {},
            id: null
        }
    }
    loadData(id) {
        console.log(id);
        this.setState({ id });
        this.props.loadProdutos(id);
        this.props.readCategoria(id);
    }

    componentDidMount() {
        const id = this.props.match.params.catId;
        this.loadData(id);
    };

    componentWillMount() {
        console.log(this.props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.catId !== this.state.id) {
            this.loadData(newProps.match.params.catId);
        }
    };
    renderProduto(produto) {
        return (
            <p className="well" key={produto.id}>{produto.produto}</p>
        )
    };
    render() {
        return (
            <div>
                <h1> {this.props.categoria.categoria}</h1>
                <ul>
                    {this.props.produtos.map(this.renderProduto)}
                </ul>
            </div>
        )
    };
};

export default Categoria;