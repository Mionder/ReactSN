import React, {useState, useEffect} from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {connect} from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';

function Registration() {
    const [users, setUsers] = useState([]);
    const [isError, setError] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const SignUpSchema = Yup.object().shape({

        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        // .oneOf(users['login'], "User is already exist"),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, "Too Short password")
            .required("Required password")
            .matches(/[1-9]/, "Must include numbers")
            .matches(/[A-Z]/, "Must includ Uppercase letters")
            .matches(/[a-z]/, "Must include Lowercase letters")
            .matches(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, "Must include special symbols"),
        passwordConfirm: Yup.string()
            .required("Required")
            .oneOf([Yup.ref('password')], "Passwords are not match"),

    });

    useEffect(async () => {
        await setUsers(users);
    }, [])

    async function CheckUser(values, arr) {
        let error = false;
        arr.forEach(async (item) => {
            const {email} = item;
            if (email === values.email) {
                error = true;
            }
        })
        console.log(values);
        if (!error) {
            fetch("http://localhost:3000/users",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(values)
                })
                .then(function (res) {
                    localStorage.setItem("username", values.username);
                    window.location.href = window.location.origin + "/profile"
                })
                .catch(function (res) {
                    console.log(res);
                })
        } else {
            await setError(true);
        }

    }

    return (
        <div className="form-wrapper">
            {
                isError &&
                <Alert severity="error">User with such email is already exist</Alert>
            }

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    console.log(2, users)
                    CheckUser(values, users);
                }}
            >
                {({errors, touched}) => (
                    <Form className="signup-form">
                        <p className="form-label">Sign up</p>
                        <Field className="field-form" placeholder="Username" name="username"/>
                        {touched.username && errors.username && <div className="error-reg">{errors.username}</div>}
                        <Field className="field-form" placeholder="Email" name="email"/>
                        {touched.email && errors.email && <div className="error-reg">{errors.email}</div>}
                        <Field className="field-form" placeholder="Password" name="password"/>
                        {touched.password && errors.password && <div className="error-reg">{errors.password}</div>}
                        <Field className="field-form" placeholder="Confirm password" name="passwordConfirm"/>
                        {touched.passwordConfirm && errors.passwordConfirm &&
                        <div className="error-reg">{errors.passwordConfirm}</div>}
                        <button className="btn btn-form" type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default connect(state => ({
    users: state.users
}))(Registration)