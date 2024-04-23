import { useEffect, useState } from 'react'
import './App.scss'
import { createStudent, deleteStudent, getAllStudents, updateStudent } from './services/studentApi';
import { Student } from './interfaces/Student';
import * as bootstrap from 'bootstrap';


function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [makers, setMakers] = useState<Student[]>([]);
  const [deleteMaker, setDeleteMaker] = useState<Student>({
    studentID: 0,
    firstName: '',
    lastName: '',
    email: ''
  });

  const [editMaker, setEditMaker] = useState<Student>({
    studentID: 0,
    firstName: '',
    lastName: '',
    email: ''
  });

  const [inputFirstName, setInputFirstName] = useState<string>('');
  const [inputLastName, setInputLastName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const validateFirstName = (value: string) => {
    if (!value) return "El primer nombre es obligatorio.";
    return "";
  };

  const validateLastName = (value: string) => {
    if (!value) return "El segundo nombre es obligatorio.";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "El email es obligatorio.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "El email no es válido.";
    return "";
  };

  useEffect(() => {
    getAllStudents().then((data) => {
      setMakers(data.students as Student[]);
    }).catch(error => {
      console.error(error);
    })
  }, [setMakers]);

  const handleInputFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputFirstName(value);
    setErrors(prev => ({ ...prev, firstName: validateFirstName(value) }));
  }
  const handleInputLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputLastName(value);
    setErrors(prev => ({ ...prev, lastName: validateLastName(value) }));
  }
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos actualizados:', editMaker);
    updateStudent(editMaker.studentID ?? 0, editMaker).then(() => {
      setMakers(prev => prev.map((student: Student) => student.studentID === editMaker.studentID ? editMaker : student));
      alertView("Estudiante actualizado satisfactoriamente!");
      closeModal("editStudentModal");
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameError = validateFirstName(inputFirstName);
    const lastNameError = validateLastName(inputLastName);
    const emailError = validateEmail(inputEmail);

    if (firstNameError || lastNameError || emailError) {
      setErrors({ firstName: firstNameError, lastName: lastNameError, email: emailError });
      return;
    }

    const newStudent: Student = {
      firstName: inputFirstName,
      lastName: inputLastName,
      email: inputEmail,
    }

    createStudent(newStudent).then(
      (response) => {
        setMakers(prev => [...prev, response.data]);
        setInputEmail("");
        setInputFirstName("");
        setInputLastName("");
        alertView("Estudiante creado satisfactoriamente!");
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  const alertView = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  const closeModal = (idModal: string) => {
    const modal = document.getElementById(idModal);
    if (modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }

  const handleDelete = (student: Student) => {
    setDeleteMaker(student);
  }

  const handleEdit = (student: Student) => {
    setEditMaker(student);
  };

  const handleDeleteConfirmed = () => {
    if (deleteMaker) {
      // Eliminar estudiante de la lista
      deleteStudent(deleteMaker.studentID ?? 0).then(() => {
        const updatedStudents = makers.filter(student => student.studentID !== deleteMaker.studentID);
        setMakers(updatedStudents);
        alertView("Estudiante eliminado satisfactoriamente!");
        closeModal('deleteModal');
      })
    }
  };


  return (
    <>
      <div className="container">
        {showAlert && (
          <div className="alert alert-success" style={{ zIndex: 2000 }} role="alert">
            {alertMessage}
          </div>
        )}

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
                        <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={inputFirstName} placeholder='Primer nombre' onChange={handleInputFirstName} />
                        <div className="invalid-feedback">{errors.firstName}</div>
                      </div>
                      <div className="col input-group-sm">
                        <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={inputLastName} placeholder='Segundo nombre' onChange={handleInputLastName} />
                        <div className="invalid-feedback">{errors.lastName}</div>
                      </div>
                      <div className="col input-group-sm">
                        <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={inputEmail} placeholder='Email' onChange={handleInputEmail} />
                        <div className="invalid-feedback">{errors.email}</div>
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
                  <tr key={maker.studentID}>
                    <td>{maker.firstName}</td>
                    <td>{maker.lastName}</td>
                    <td>{maker.email}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-3" data-bs-toggle="modal" onClick={() => handleEdit(maker)} data-bs-target="#editStudentModal">Editar</button>
                      <button className="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(maker)}>Borrar</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="editStudentModal" aria-labelledby="editStudentModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editStudentModalLabel">Editar Estudiante</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Primer Nombre</label>
                  <input type="text" className="form-control" id="firstName" value={editMaker.firstName} onChange={(e) => setEditMaker({ ...editMaker, firstName: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Primer Nombre</label>
                  <input type="text" className="form-control" id="lastName" value={editMaker.lastName} onChange={(e) => setEditMaker({ ...editMaker, lastName: e.target.value })} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Primer Nombre</label>
                  <input type="email" className="form-control" id="email" value={editMaker.email} onChange={(e) => setEditMaker({ ...editMaker, email: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirmar eliminación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ¿Está seguro de que desea eliminar este estudiante?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmed}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
