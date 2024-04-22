import { useState } from 'react'
import './App.scss'

function App() {

  const [inputFirstName, setInputFirstName] = useState<string>('');
  const [inputLastName, setInputLastName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');

  const makers = [
    {
      id: 1, firstName: 'Marcos', lastName: 'Sebastian', email: 'marcosmedina069@gmail.com'
    },
    {
      id: 2, firstName: 'Marcos', lastName: 'Sebastian', email: 'marcosmedina069@gmail.com'
    },
    {
      id: 3, firstName: 'Marcos', lastName: 'Sebastian', email: 'marcosmedina069@gmail.com'
    },
    {
      id: 4, firstName: 'Marcos', lastName: 'Sebastian', email: 'marcosmedina069@gmail.com'
    },
    {
      id: 5, firstName: 'Marcos', lastName: 'Sebastian', email: 'marcosmedina069@gmail.com'
    },
  ];

  const handleInputFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFirstName(e.target.value);
  }
  const handleInputLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLastName(e.target.value);
  }
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  return (
    <>
      <div className="container">
        <div className="form-makers mt-5 mb-5">
          <table className="table table-bordered">
            <thead>
              <tr className="table-light">
                <th>
                  Crear una Maker
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <form className="form-inline" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col input-group-sm">
                        <input type="text" className="form-control" value={inputFirstName} placeholder='Primer nombre' onChange={handleInputFirstName} />
                      </div>
                      <div className="col input-group-sm">
                        <input type="text" className="form-control" value={inputLastName} placeholder='Segundo nombre' onChange={handleInputLastName} />
                      </div>
                      <div className="col input-group-sm">
                        <input type="text" className="form-control" value={inputEmail} placeholder='Email' onChange={handleInputEmail} />
                      </div>
                      <div className="col">
                        <button type="submit" className="btn btn-sm btn-success">Guardar</button>
                      </div>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-makers">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Primer nombre</th>
                <th scope="col">Segundo nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                makers.map(maker =>
                  <tr key={maker.id}>
                    <td>{maker.firstName}</td>
                    <td>{maker.lastName}</td>
                    <td>{maker.email}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-3">Editar</button>
                      <button className="btn btn-sm btn-danger">Borrar</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
