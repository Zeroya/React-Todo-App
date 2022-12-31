import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { registerUser } from "../../api/todoApi";
import { IUser } from "../../models/ITodo";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import s from "./Auth.module.scss";

const Register: FC = () => {
  let navigate = useNavigate();
  const [errorArr, setErrorArr] = useState<any>(null);
  const [loginMsg, setLoginMsg] = useState("");
  const [form, setForm] = useState<IUser>({
    userName: "",
    password: "",
  });
  const [checker, setChecker] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const userAuthTransit = (msg: string) => {
    setLoginMsg(msg);
    setTimeout(() => navigate("/login"), 2000);
  };

  const registerHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!form.userName && !form.password) {
        return;
      }
      setChecker(true);
      await registerUser(form).then((res) => userAuthTransit(res?.data?.msg));
      setChecker(false);
    } catch (error) {
      setChecker(false);
      console.error(error);
      setErrorArr(error);
    }
    setForm({
      userName: "",
      password: "",
    });
  };

  useEffect(() => {
    setTimeout(() => setErrorArr(null), 2000);
  }, [errorArr]);

  useEffect(() => {
    setTimeout(() => setLoginMsg(""), 2000);
  }, [loginMsg]);

  return (
    <>
      {errorArr && <Alert msg={errorArr.response.data.msg} />}
      {loginMsg && <Alert msg={loginMsg} />}
      <div className="form-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-offset-3 col-lg-8 col-md-offset-2 ">
              <div className={s.authBlock}>
                <div className={s.authBlock__formIcon}>
                  <i className="fa fa-user-circle" />
                  <span className={s.authBlock__signup}>
                    <Link to="/login">You have account? SignIn</Link>
                  </span>
                </div>
                <form className={s.authForm}>
                  <h3 className={s.authForm__title}>Member Register</h3>
                  <div className={s.authForm__formGroup}>
                    <span className={s.authForm__inputIcon}>
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      className={s.authForm__formControl}
                      value={form.userName}
                      type="text"
                      placeholder="UserName"
                      onChange={handleChange}
                      name="userName"
                    />
                  </div>
                  <div className={s.authForm__formGroup}>
                    <span className={s.authForm__inputIcon}>
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      className={s.authForm__formControl}
                      value={form.password}
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                  <button className={s.authForm__btn} onClick={registerHandler} disabled={checker}>
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
