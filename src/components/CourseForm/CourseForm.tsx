import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";
import CourseService from "../../services/CourseService";
import { CourseInterface } from "../../interfaces/CourseInterface";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from "../Loader/Loader";

export default function CourseForm() {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();
    const [course, setCourse] = useState<CourseInterface>({
        code: 0, 
        name: "", 
        price: 0, 
        category: "" 
    });
    const [showLoader, setShowLoader] = useState(false);
    const { courseId } = useParams();

    useEffect(() => {
		if (courseId) {
            findById(parseInt(courseId));
        }
	}, []);

    const navigate = useNavigate();

    const findById = (courseId: number) => {
        setShowLoader(true);
        CourseService.findById(courseId)
            .then(response => setCourse(response))
            .catch(error => toast.error(error.data.message))
            .finally(() => setShowLoader(false));
    }

    const handleSubmit = (course: CourseInterface) => {
        setShowLoader(true);

        if (!course.code) {
            CourseService.createCourse(course)
            .then(
                response => {
                    setSuccessful(true);
                    setMessage(response.data.message);
            
                    setTimeout(() => {
                        navigate("/courses");
                    }, 5000);
                },
                error => toast.error(error.data.message)
            )
            .finally(() => setShowLoader(false));
        } else {
            CourseService.updateCourse(course.code, course)
            .then(
                response => {
                    setSuccessful(true);
                    setMessage(response.data.message);
            
                    setTimeout(() => {
                        navigate("/courses");
                    }, 5000);
                },
                error => toast.error(error.data.message)
            )
            .finally(() => setShowLoader(false));
        }
    }

    const validationSchema = () => {
        return Yup.object().shape({
            name: Yup.string()
                .required("O nome é obrigatório."),
            price: Yup.number()
                .required("O preço é obrigatório."),
            category: Yup.string()
                .required("A categoria é obrigatória.")
        });
    }

    return (
        <div className="col-md-12">
            <ToastContainer />
            <div className="card card-container">
                <h3>New Course</h3>
                <Formik
                    initialValues={course}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    <Form>
                        {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field 
                                    name="name" 
                                    type="text" 
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <Field
                                    name="price"
                                    type="text"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="price"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <Field
                                    name="category"
                                    type="text"
                                    className="form-control"
                                />
                                <ErrorMessage
                                    name="category"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>

                            <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Gravar</button>
                            </div>
                        </div>
                        )}

                        {message && (
                        <div className="form-group">
                            <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                            >
                            {message}
                            </div>
                        </div>
                        )}
                    </Form>
                </Formik>
            </div>
            {showLoader && <Loader />}
        </div>
    );

}
