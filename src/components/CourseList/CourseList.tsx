import { useEffect, useState } from "react";

import "./style.css";
import CourseService from "../../services/CourseService";
import { CourseInterface } from "../../interfaces/CourseInterface";
import { useNavigate  } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from "../Loader/Loader";

export default function CourseList() {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
		findAll();
	}, []);

  const findAll = async () => {
    setShowLoader(true);
    CourseService.findAll()
      .then(
        response => setCourses(response),
        error => toast.error(error.response.data.message)
      )
      .finally(() => setShowLoader(false));
  }

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return formatter.format(value);
  };

  const handleDelete = (id: number) => {

      if (window.confirm("Deseja realmente excluir este curso?")) {
        CourseService.deleteCourse(id)
            .then(
                response => {
                  const currentCourses = [...courses];
                  const itemIndex = courses.findIndex((item) => item.code === id);
                  currentCourses.splice(itemIndex, 1);
                  setCourses(currentCourses);
                  toast.success(response.data.message);
                },
                error => toast.error(error.data.message)
            );
      }
  };

  const handleUpdate = (id: number) => {
    navigate(`/courses/${id}`);
  }

  return (
    <div className="container">
      <ToastContainer />
      <header className="jumbotron">
        <h3>Lista de Cursos</h3>
      </header>
        <button className="btn-new" onClick={() => navigate("/courses/new")}>
          + Novo
        </button>
        <br/>
        <br/>
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {courses?.map(course => (
              <tr key={course.code} >
                <td>{course.name}</td>
                <td>{course.price ? formatCurrency(course.price) : ""}</td>
                <td>{course.category}</td>
                <td>
                  <button className="btn-update" onClick={() => handleUpdate(course.code)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(course.code)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showLoader && <Loader />}
    </div>
  );

}
