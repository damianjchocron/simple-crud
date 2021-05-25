import React from 'react'
import Button from 'react-bootstrap/Button';
import { URL_API_BASE } from '../CONST';
import swal from 'sweetalert';

/* Si viene parametro con valor, tiene que pasarse al props */
class MultiForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.id);

        /* Aqui quizas deberia preguntar si viene con ID,
        que directamente haga la consulta en el constructor 
        Para evitar que tarde en cargar */
        /* if (props.id != ) console.log('ok') */

        this.state = {
            name: '',
            price: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this); //<-Enlazo el estado a las funciones
        this.handleSubmit = this.handleSubmit.bind(this)//<-Enlazo el estado a las funciones
    }

    componentDidMount() {
        if (this.props.id != undefined) {
            const PRODUCTS_URL = URL_API_BASE + "products/"
            fetch(`${PRODUCTS_URL}${this.props.id}`)
                .then(response => response.json())
                .then(result => {
                    this.setState({ name: result.name, price: result.price })
                })
        }
    }

    /**
     * Funcion para manejar el cambio en el input y cambiar los estados
     * @param {quien dispara el evento} event 
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        /* Cambia los estados de los elementos de forma dinamica por el [name] */
        this.setState({
            [name]: value
        });
    }

    /**
     * Funcion que maneja el submit
     * @param {Quien dispara el evento} event 
     */
    handleSubmit(event) {
        let pathProductID;
        let contentType;
        let method;
        if (this.props.id != undefined) {
            pathProductID = '/' + this.props.id;
            contentType = 'application/merge-patch+json'
            method = 'PATCH'
        } else {
            pathProductID = ""
            contentType = 'application/json'
            method = 'POST'
        }

        event.preventDefault();
        fetch(URL_API_BASE + 'products' + pathProductID, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': contentType,
            },
            body: JSON.stringify({
                name: this.state.name,
                price: parseInt(this.state.price)
            })
        })
            .then(response => {
                if (response.ok) {
                    swal("Hecho con exito", "Se ha guardado tu producto!", "success")
                } else {
                    swal("Error", "Ha fallado el guardado de tu producto!", "warning")
                }
            })
            .catch(() => {
                swal("Error", "Ha fallado el guardado de tu producto!", "warning")
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <label>
                        Nombre
                    </label>
                    <input
                        className="col-12"
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    <br />
                    <label>
                        Precio
                    </label>
                    <input
                        className="col-12"
                        name="price"
                        type="number"
                        value={this.state.price}
                        onChange={this.handleInputChange} />
                    <Button
                        type="submit"
                        className="mt-3"
                        value="Enviar"
                    >Enviar</Button>
                </div>
            </form>
        );
    }
}

export default MultiForm