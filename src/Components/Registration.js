import React, {useState, useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


export function DisplayingErrorMessagesExample(){
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
            .matches(/[A-Z]/,"Must includ Uppercase letters")
            .matches(/[a-z]/,"Must include Lowercase letters")
            .matches(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/, "Must include special symbols"),
        passwordConfirm: Yup.string()
            .required("Required")
            .oneOf([Yup.ref('password')], "Passwords are not match"),

    });

    useEffect(async ()=>{
        await fetch("http://localhost:3000/users")
            .then((res)=>{
                return res.json()
            })
            .then(async(data)=>{
                console.log(data);
                await setUsers(data);
            })
            .catch((err)=>{
                console.log(err)
            })
    },[])

    async function CheckUser(values, arr){
        // console.log(1,users);
        let error = false;
        console.log(values, arr);
        arr.forEach(async (item)=>{
            const{login, email} = item;
            if(email === values.email){
                console.log("ALERT");
                error = true;
            }
            // console.log(login);
        })
        console.log(arr, error);
        if(!error){
            fetch("http://localhost:3000/users",
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(values)
                })
                .then(function(res){ console.log(res); window.location.href = window.location.href + "profile" })
                .catch(function(res){ console.log(res); })
        }
        else{
            await setError(true);
        }
    }
return(
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
                console.log(2,users)
                CheckUser(values, users);
            }}
        >
            {({ errors, touched }) => (
                <Form className="signup-form">
                    <p className="form-label">Sign up</p>
                    <Field className="field-form" placeholder="Username" name="username" />
                    {touched.username && errors.username && <div>{errors.username}</div>}
                    <Field className="field-form" placeholder="Email" name="email" />
                    {touched.email && errors.email && <div>{errors.email}</div>}
                    <Field className="field-form" placeholder="Password" name="password" />
                    {touched.password && errors.password && <div>{errors.password}</div>}
                    <Field className="field-form" placeholder="Confirm password" name="passwordConfirm" />
                    {touched.passwordConfirm && errors.passwordConfirm && <div>{errors.passwordConfirm}</div>}
                    <button className="btn btn-form" type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
    )

}