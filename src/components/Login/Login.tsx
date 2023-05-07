import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from "../Loader/Loader";
import AuthService from "../../services/AuthService";

export default function Login() {
  const [message, setMessage] = useState<string>("");
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
  });
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string().required("O campo é obrigatório."),
      password: Yup.string().required("O campo é obrigatório."),
    });
  }

  const handleLogin = (formValue: { username: string; password: string }) => {
    setShowLoader(true);
    
    const { username, password } = formValue;

    AuthService.login(username, password)
      .then(
        res => navigate("/courses"),
        error => toast.error(error.response.data.message))
      .finally(() => setShowLoader(false));
  }

  return (
    <div className="col-md-12">
      <ToastContainer />
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={showLoader}>
                <span>Entrar</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
