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
      profile?.user?.phone_number == "" ||
      profile?.user?.date_of_birth == ""
    ) {
      if (ToastInput === true) {
        Swal.fire({
          title: "Please Form Input",
          html: `<input type="phone" id="phone" class="swal2-input" placeholder="Phone Number">
          <input type="date" id="date" class="swal2-input" placeholder="Date" value=${profile?.user.date_of_birth}>
          `,
          confirmButtonText: "Enter",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          focusConfirm: false,
          preConfirm: () => {
            const phone = Swal.getPopup().querySelector("#phone").value;
            const date = Swal.getPopup().querySelector("#date").value;
            if (!phone || !date) {
              return Swal.showValidationMessage(`Please enter Phone and Date`);
            }

            return {
              phone: phone,
              date: date,
            };
          },
        }).then((result) => {
          setResult(result);
          if (!result.dismiss == "backdrop") {
            return;
          } else if (result.value) {
            dispatch(UploadProfileInitiate({ tokens, result }));
            dispatch(ProfileInitiate({ token: tokens }));
            setToastInput(false);
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
