import React from 'react'
import { URL_APP_BASE, URL_API_BASE } from '../CONST'


export default function Card({ products, setProducts }) {

  const deleted = (theProduct) => {

    fetch(URL_API_BASE + 'products/' + theProduct.id, { method: 'DELETE' })
      .then(response => response.text())
      .then(data => {
        if (data == '') {
          const filtredData = products.filter(item => item.id !== theProduct.id)

          setProducts(filtredData)
        } else {
          console.log(data)
        }
      })
      .catch(data => console.log(data))
  }

  return (
    <div className="row">
      {products.map(theProduct => {
        return (
          <div key={theProduct.name} className="card mt-5 p-3 col-4">
            <img src="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{theProduct.name}</h5>
              <p className="card-text">Precio: {theProduct.price}€</p>
              <a href={URL_APP_BASE + 'edit/' + theProduct.id} className="btn btn-primary ">Editar</a>
              <a onClick={() => deleted(theProduct)} className="btn btn-danger deleted ml-3" >Borrar</a>
            </div>
          </div>
        );
      })}
    </div>
  )
}
