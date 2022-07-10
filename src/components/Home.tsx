import React from "react";
import PaymentForm from "../components/PaymentForm/PaymentForm";

const Home: React.FC = () => {

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>ברוכה הבאה לרישום לכנסי אלול</h3>
            </header>
            <PaymentForm></PaymentForm>
        </div>
    );
};

export default Home;
