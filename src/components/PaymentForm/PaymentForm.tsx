import React, {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import * as AuthService from "../../services/auth.service";
import {useDispatch} from "react-redux";
import {setPersonalDetailsData} from "../../features/user/userSlice";
import IPersonalDetails from "../../../types/personal-details.type";
import NedarimIframe from "../NedarimIframe/NedarimIframe";


const PaymentForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const dispatch = useDispatch()


    const initialValues: {
        email: string;
        firsName: string;
        lastName: string;
        city: string;
        phone: string
    } = {
        email: "",
        firsName: "",
        lastName: "",
        city: "",
        phone: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is not valid").required("אמייל חובה"),
        firstName: Yup.string().required('שדה חובה'),
        lastName: Yup.string().required('שדה חובה'),
        city: Yup.string().required('שדה חובה'),
        phone: Yup.string().required('שדה חובה')
    });

    // const PayBtClick = () => {
    //     PostNedarim({ 'Name': 'ValidateFields' });
    // }
    // function PostNedarim(Data) { var iframeWin = document.getElementById('NedarimFrame').contentWindow; iframeWin.postMessage(Data, "*"); };

    const handleLogin = (formValue: { email: string, firsName: string, lastName: string, city: string, phone: string }) => {
        const {email, firsName, lastName, phone, city} = formValue;

        setMessage("");
        setLoading(true);


        AuthService.login(email, firsName, lastName, phone, city).then(
            (data) => {
                setLoading(false);
                const personalDetails: IPersonalDetails = {
                    avatar: data.personalDetails.avatar,
                    joinedAt: data.personalDetails.joinedAt,
                    Team: data.personalDetails.Team,
                    name: data.personalDetails.name
                }
                dispatch(setPersonalDetailsData(personalDetails))
                if (data.token) {
                    localStorage.setItem("token", JSON.stringify(data.token));
                }
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="col-md-12">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({dirty, isValid}) => (

                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">מייל</label>
                            <Field name="email" type="email" className="form-control"/>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">שם פרטי</label>
                            <Field name="firstName" type="text" className="form-control"/>
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">שם משפחה</label>
                            <Field name="lastName" type="text" className="form-control"/>
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">עיר מגורים</label>
                            <Field name="city" type="text" className="form-control"/>
                            <ErrorMessage
                                name="city"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">טלפון</label>
                            <Field name="phone" type="phone" className="form-control"/>
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <NedarimIframe></NedarimIframe>


                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block submit"
                                    style={{cursor: dirty && !isValid ? 'not-allowed' : 'pointer'}}
                                    disabled={dirty && !isValid}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>בצע תשלום</span>
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
                )}
            </Formik>
        </div>
    );
};

export default PaymentForm;
