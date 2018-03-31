import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria';
import ProdutosNovo from './ProdutosNovo';
import ProdutosEditar from './ProdutosEditar';

class Produtos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editCategoria: ''
        }
 
        this.handleNewCategoria = this.handleNewCategoria.bind(this);
        this.renderCategoria = this.renderCategoria.bind(this);
        this.editCategoria = this.editCategoria.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.handleEditCategoria = this.handleEditCategoria.bind(this);
   };

    componentDidMount() {
        this.props.loadCategorias();
    };

    editCategoria(categoria) {
        this.setState({
            editCategoria: categoria.id
        });
    };

    cancelEditing() {
        this.setState({
            editCategoria: ''
        });
    };

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
        //    console.log(this.refs['cat'+this.state.editCategoria].value);
            this.props.editCategoria({
                id: this.state.editCategoria,
                categoria: this.refs['cat'+this.state.editCategoria].value
            });
            this.setState({
                editCategoria: ''
            });
        };
    };

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                { this.state.editCategoria === cat.id &&
                    <div className="input-group">
                        <div className="input-group-btn">
                            <input ref={'cat'+cat.id} className="form-control" type="text" defaultValue={cat.categoria} onKeyUp={this.handleEditCategoria}/>
                            <button className="btn" onClick={this.cancelEditing}>Cancel </button>
                        </div>
                    </div>
                }
                { this.state.editCategoria !== cat.id &&
                    <div>
                        <button className=" btn btn-sm" onClick={() => this.props.removeCategoria(cat)}>
                            <span className="glyphicon glyphicon-remove"> </span>
                        </button>
                        <button className="btn btn-sm" onClick={() => this.editCategoria(cat)}>
                            <span className="glyphicon glyphicon-pencil"> </span>
                        </button>
                        <Link to={`/produtos/categoria/${cat.id}`} >{cat.categoria}</Link>
                    </div>
                }
            </li>
        )
    };
    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = '';
        }
    };
    render() {
        const { match, categorias, produtos, categoria} = this.props;
        return (
            <div className="row">
                <div className="col-md-2">
                    <h3> Categorias </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categorias.map(this.renderCategoria)} 
                    </ul>
                    <div className="well well-sm">
                        <input onKeyUp={this.handleNewCategoria}
                               type="text"
                               className="form-control"
                               ref="categoria" 
                               placeholder="Nova categoria" />
                    </div>
                    <Link to={'/produtos/novo'} > Novo Produto </Link>
                </div>
                <div className="col-md-10">
                    <h1> Produtos </h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url+'/novo'} 
                                        render={(props) => {
                                                    return <ProdutosNovo {...props}
                                                                categorias={categorias}
                                                                createProduto={this.props.createProduto}
                                                            />
                                                    }} />
                    <Route path={match.url+'/editar/:prodId'} 
                            render={(props) => {
                                return <ProdutosEditar {...props}
                                                categorias={categorias}
                                                categoria={this.props.categoria}
                                                readProduto={this.props.readProduto}
                                                editProduto={this.props.editProduto}
                                        />
                    }}/>
                    <Route path={match.url+'/categoria/:catId'} render={(props) => {
                                return <Categoria {...props}
                                                loadProdutos={this.props.loadProdutos}
                                                readCategoria={this.props.readCategoria}
                                                categoria={categoria}
                                                produtos={produtos}
                                                removeProduto={this.props.removeProduto}
                                        />
                    }}/>
                </div>
            </div>
        )
    };
};

export default Produtos;