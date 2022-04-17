import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Swal from "sweetalert2";
import {
  CalltoActionSection,
  Carousel,
  ContactInfo,
  Footer,
  Header,
  MetaData,
  ShopSection,
} from "../../imports";
import {
  ChangePasswordLoginGgFbInitiate,
  ProfileInitiate,
  UploadProfileInitiate,
} from "../../Redux/AuthenticationSlice";
import { CheckPass, True } from "../../imports/Image";

const Home = () => {
  const token = window.localStorage.getItem("firstLogin");
  const { refreshToken } = useSelector((state) => ({ ...state.data }));
  const tokens = refreshToken.accessToken;
  const menuRef = useRef();
  const [result, setResult] = useState(null);
  const [ToastInput, setToastInput] = useState(true);
  const handleScrollMenu = () => {
    menuRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { profile } = useSelector((state) => ({
    ...state.data,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      profile?.user?.checkLogin === false ||
      profile?.user?.phone_number == "" ||
      profile?.user?.date_of_birth == ""
    ) {
      if (ToastInput === true) {
        Swal.fire({
          title: "Please Form Input",
          html: `
          ${
            profile?.user?.checkLogin === false &&
            `<input type="password" id="password" class="swal2-input" placeholder="Password">
         <input type="password" id="confirmPassword" class="swal2-input" placeholder="confirmPassword">`
          }
          <input type="phone" id="phone" class="swal2-input" placeholder="Phone Number">
          <input type="date" id="date" class="swal2-input" placeholder="Date" value=${
            profile?.user.date_of_birth
          }>
          `,
          confirmButtonText: "Enter",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          focusConfirm: false,
          preConfirm: () => {
            if (profile?.user?.checkLogin === false) {
              const password = Swal.getPopup().querySelector("#password").value;
              const confirmPassword =
                Swal.getPopup().querySelector("#confirmPassword").value;
              const phone = Swal.getPopup().querySelector("#phone").value;
              const date = Swal.getPopup().querySelector("#date").value;
              if (!phone) {
                return Swal.showValidationMessage(`Please enter Phone`);
              } else if (!date) {
                return Swal.showValidationMessage(`Please enter Date`);
              } else if (!password) {
                return Swal.showValidationMessage(`Please enter Password`);
              } else if (!confirmPassword) {
                return Swal.showValidationMessage(
                  `Please enter confirmPassword`
                );
              }
              return {
                password: password,
                confirmPassword: confirmPassword,
                phone: phone,
                date: date,
              };
            } else {
              const phone = Swal.getPopup().querySelector("#phone").value;
              const date = Swal.getPopup().querySelector("#date").value;
              if (!phone) {
                return Swal.showValidationMessage(`Please enter Phone`);
              } else if (!date) {
                return Swal.showValidationMessage(`Please enter Date`);
              }
              return {
                phone: phone,
                date: date,
              };
            }
          },
        }).then((result) => {
          setResult(result);
          if (!result.dismiss == "backdrop") {
            return;
          } else if (result.value) {
            dispatch(ChangePasswordLoginGgFbInitiate({ tokens, result })).then(
              (res) => {
                if (res.payload?.status === 200) {
                  Swal.fire({
                    title: "Admin Thank You 😊!!",
                    imageUrl: `${profile.user && profile.user.image.url}`,
                    width: 400,
                    padding: "3em",
                    color: "#716add",
                    background: `#fff url(${True}) `,
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url(${CheckPass})
                      left top
                      no-repeat
                    `,
                  });
                  dispatch(UploadProfileInitiate({ tokens, result }));
                  dispatch(ProfileInitiate({ token: tokens }));
                  setToastInput(false);
                } else if (res.payload?.status === 400) {
                  return Swal.showValidationMessage(`${res.payload?.msg}`);
                }
              }
            );
          }
        });
      }
    }
  }, [profile?.user, result]);
  return (
    <>
      <MetaData title={`Home Page`} />
      {token ? "" : <Carousel handleScrollMenu={handleScrollMenu} />}
      <Header />
      <ShopSection ref={menuRef} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default Home;
