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
          <input type="date" id="date" class="swal2-input" placeholder="Date">
          
          `,
          confirmButtonText: "Enter",
          focusConfirm: false,
          preConfirm: () => {
            const phone = Swal.getPopup().querySelector("#phone").value;
            const date = Swal.getPopup().querySelector("#date").value;
            if (!phone || !date) {
              return Swal.showValidationMessage(`Please enter Phone and Date`);
            }

            return { phone: phone, date: date };
          },
        }).then((result) => {
          setResult(result);
          if (!result.dismiss == "backdrop") {
            return;
          } else if (result.value) {
            dispatch(UploadProfileInitiate({ tokens, result }));
            dispatch(ProfileInitiate({ token: tokens }));
            setToastInput(false);
            Swal.fire(
              `
              Phone: ${result.value.phone}
              Date: ${result.value.date}
            `.trim()
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
