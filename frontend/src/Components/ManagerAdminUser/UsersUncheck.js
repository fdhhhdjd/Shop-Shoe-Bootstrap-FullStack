import React from "react";
const UsersUncheck = (props) => {
  const { orders, visible, search } = props;
  console.log(orders, "alo");
  return (
    <>
      {orders.length === 0 ? (
        <nav className="float-center mt-4" aria-label="Page navigation">
          <ul className="pagination  justify-content-center">
            <li className="page-item">
              <h1 style={{ color: "red" }}>Uncheck Empty</h1>
            </li>
          </ul>
        </nav>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Verify</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice(0, visible)
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(search.toLowerCase()) ||
                  value.email.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((order) => (
                <tr key={order._id}>
                  <td>
                    {order && order.image && (
                      <img
                        src={order.image.url}
                        alt=""
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <b>{order.name}</b>
                  </td>
                  <td>{order.email}</td>
                  <td>{order.role === 0 && "Customer"}</td>
                  <td>
                    <span className="badge btn-danger">
                      {order.verified === false && "Unchecked"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersUncheck;
