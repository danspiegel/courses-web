import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from "../Loader/Loader";
import AuthService from "../../services/AuthService";

export default function Register() {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    repassword: ""
  });
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "O usuário deve ter entre 3 e 20 caracteres.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("O usuário é obrigatório."),
      password: Yup.string()
        .test(
          "len",
          "A senha deve ter entre 6 e 40 caracteres.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("A senha é obrigatória."),
    });
  }

  const handleRegister = (formValue: { username: string; password: string, repassword: string }) => {
    setShowLoader(true);

    const { username, password, repassword } = formValue;

    if (password !== repassword) {
      setSuccessful(false);
      setMessage("As senhas não conferem.");
      return;
    }

    AuthService.register(
      username,
      password
    ).then(
      response => {
        setShowLoader(false);
        setSuccessful(true);
        setMessage(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      },
      error => toast.error(error.data.message)
    )
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
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
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
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="repassword">Repita a Senha</label>
                  <Field
                    name="repassword"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
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
