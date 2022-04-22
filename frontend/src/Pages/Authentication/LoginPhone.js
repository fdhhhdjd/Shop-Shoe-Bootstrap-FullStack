import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUpRecapCha } from "../../imports/importConstant";
import { Header, MetaData, Loading } from "../../imports/index";
import { toast } from "react-toastify";
import { LoginPhoneInitial } from "../../Redux/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
const LoginPhone = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const { loading, auth } = useSelector((state) => ({ ...state.data }));
  const dispatch = useDispatch();
  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined) {
      setError("Please enter a valid phone number!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      try {
        const response = await setUpRecapCha(number);
        setResult(response);
        setFlag(true);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) {
      setError("Please enter OTP");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } else {
      try {
        await result.confirm(otp);
        dispatch(LoginPhoneInitial({ number, toast }));
        setNumber(null);
      } catch (err) {
        setError(err.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    }
  };
  useEffect(() => {
    if (auth.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/";
      }
      localStorage.setItem("firstLogin", true);
    }
  }, [auth]);

  return (
    <>
      <MetaData title="Login-Phone" />
      <Header />
      <Container style={{ width: "400px" }}>
        <div className="p-4 box">
          <h2 className="mb-3">Login Phone</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {auth.status === 400 && (
            <Alert variant="alert-danger">{auth.msg}</Alert>
          )}
          <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <PhoneInput
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
                name="phone_number"
              />
              <div id="recaptcha-container"></div>
            </Form.Group>
            <div className="button-right">
              <Link to="/loginphone">
                <Button variant="secondary">Cancel</Button>
              </Link>
              &nbsp;
              <Button type="submit" variant="primary">
                Send Otp
              </Button>
            </div>
          </Form>

          <Form
            onSubmit={verifyOtp}
            style={{ display: flag ? "block" : "none" }}
          >
            <Form.Group className="mb-3" controlId="formBasicOtp">
              <Form.Control
                type="otp"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>
            <div className="button-right">
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Link to="/loginphone">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
                  &nbsp;
                  <Button type="submit" variant="primary">
                    Verify
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginPhone;
