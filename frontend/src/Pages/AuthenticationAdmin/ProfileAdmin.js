import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ChangePasswordAdmin,
  ProfileTabAdmin,
  LazyLoadImg,
} from "../../imports/index";
const ProfileAdmin = () => {
  const { profileAdmin } = useSelector((state) => ({ ...state.admin }));
  const { order } = useSelector((state) => ({
    ...state.products,
  }));
  const [total, setTotal] = useState(0);
  const orders = order.history && order.history;
  useEffect(() => {
    order.history &&
      order.history.map((item) => {
        const getTotal = () => {
          const total = item.cart.reduce((prev, item) => {
            return prev + item.price * item.quantity;
          }, 0);
          setTotal(total);
        };
        getTotal();
      });
  }, [orders]);
  return (
    <>
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  {profileAdmin.user && (
                    <LazyLoadImg url={profileAdmin.user.image.url} />
                  )}
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>
                      {profileAdmin.user && profileAdmin.user.name} {`(Admin)`}
                    </strong>
                  </h5>
                  <span className="author-card-position">
                    <>
                      Joined{" "}
                      {moment(
                        profileAdmin.user && profileAdmin.user.createAt
                      ).format("LL")}
                    </>
                  </span>
                </div>
              </div>
            </div>

            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    className="nav-link "
                    id="v-pills-home-tab1"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home1"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home1"
                    aria-selected="false"
                  >
                    ChangePassword
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabAdmin />
            </div>
            <div
              className="tab-pane fade show "
              id="v-pills-home1"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab1"
            >
              <ChangePasswordAdmin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAdmin;
