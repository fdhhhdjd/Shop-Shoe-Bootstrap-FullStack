.WebSite:https://shopshoetaiheo.herokuapp.com/

Api Online thay localhost: https://shopshoetaiheo.herokuapp.com/

1. API dành cho admin

\*Admin:

- Đăng ký tài khoản admin: post --> http://localhost:5000/api/auth/registerAdmin
- Xác thực email đăng ký: get --> http://localhost:5000/api/auth/verify/:userId/:uniqueString
- Đăng nhập tài khoản admin: post --> http://localhost:5000/api/auth/loginAdmin
- Đăng xuất tài khoản: get --> http://localhost:5000/api/auth/logoutAdmin
- Xem profile: get --> http://localhost:5000/api/auth/profile
- Chỉnh sửa profile: patch --> http://localhost:5000/api/auth/profile/update
- Refresh token : get --> http://localhost:5000/api/auth/admin/refreshTokenAdmin
- Thay đổi mật khẩu : patch --> http://localhost:5000/api/auth/changePassword
- Quên mật khẩu tài khoản admin: post --> http://localhost:5000/api/auth/ForgetAdmin
- Link reset mật khẩu khi quên: put --> http://localhost:5000/api/auth/password/reset/:token
- Đăng nhập google tài khoản admin: post --> http://localhost:5000/api/auth/loginGoogleAdmin
- Lấy ra danh sách khách hàng: get --> http://localhost:5000/api/auth/getAllUser
- Cập nhập thông tin khách hàng hay admin : patch --> http://localhost:5000/api/auth/updateUserAdmin/:id
- Xóa tài khoản khách hàng hay admin : delete --> http://localhost:5000/api/auth/deleteUserAdmin/:id
- Danh sách tài khoản mới đăng ký trong 3 ngày gần đây: get --> http://localhost:5000/api/auth/getUserDay
- Danh sách các tài khoản admin: get --> http://localhost:5000/api/auth/getAllAdmin
- Danh sách tài khoản Uncheck:get -->http://localhost:5000/api/auth/getAllUserUncheck

\*Upload:

- Upload ảnh người dùng : post --> http://localhost:5000/api/uploadImageUser
- Xóa ảnh người dùng trên cloud : post --> http://localhost:5000/api/destroyImageUser

\*Category

- Xem tất cả loại categorys : get --> http://localhost:5000/api/category/categorys
- Tạo thêm 1 loại categorys: post --> http://localhost:5000/api/category/categorys
- Cập nhập loại categorys: patch --> http://localhost:5000/api/category/categorys/:id
- Xóa loại categorys: delete --> http://localhost:5000/api/category/categorys/:id

\*Carousel

- Xem tất cả loại Carousel: get --> http://localhost:5000/api/carousel/carousels
- Tạo thêm 1 loại Carousels: post --> http://localhost:5000/api/carousel/carousels
- Cập nhập loại Carousel: patch --> http://localhost:5000/api/carousel/carousels/:id
- Xóa loại Carousel: delete --> http://localhost:5000/api/carousel/carousels/:id

\*Voucher

- Xem tất cả loại voucher : get --> http://localhost:5000/api/voucher/vouchers
- Tạo thêm voucher: post --> http://localhost:5000/api/voucher/vouchers
- Cập nhập voucher: patch --> http://localhost:5000/api/voucher/vouchers/:id
- Xóa loại voucher: delete --> http://localhost:5000/api/voucher/vouchers/:id
  
\*FeedBack

- Xem tất cả loại voucher : get --> http://localhost:5000/api/feedback/all
- Tra loi Feedback: patch --> http://localhost:5000/api/feedback/response/:id

\*Product

- Xem tất cả sản phẩm: get --> http://localhost:5000/api/product/getAll
- Xem chi tiết sản phẩm : get --> http://localhost:5000/api/product/getId/:id
- Thêm sản phẩm mới : post --> http://localhost:5000/api/product/create
- Cập nhập sản phẩm : put --> http://localhost:5000/api/product/update/:id
- Xóa sản phẩm: delete --> http://localhost:5000/api/product/delete/:id

\*Payment

- Lấy ra toàn bộ đơn hàng: get --> http://localhost:5000/api/payment/payments
- Lấy ra đơn hàng đã xóa: get --> http://localhost:5000/api/payment/deletePayment
- Bỏ những đơn hàng không cần vào thùng rác: patch --> http://localhost:5000/api/payment/deletePayments/:id
- Khôi phục lại những đơn hàng đã bỏ vào thùng rác: patch --> http://localhost:5000/api/payment/undoPayments/:id
- Lấy ra chi tiết đơn hàng: get --> http://localhost:5000/api/payment/payments/:id
- Thay đổi tình trạng hóa đơn : patch --> http://localhost:5000/api/payment/update/order_status/:id
- Tổng doanh thu : get --> http://localhost:5000/api/payment/sumOfIncome
- Doanh thu của hóa đơn đã được vận chuyển tháng này với tháng trước : get --> http://localhost:5000/api/payment/orders/customerReceived/getIncomeThisMonthAndCompareTo
- Doanh thu của hóa đơn khách hàng chưa nhận được tháng này với tháng trước: get --> http://localhost:5000/api/payment/orders/customerNotReceived/getIncomeThisMonthAndCompareTo
- Doanh thu hóa đơn đã vận chuyển thành công theo từng tháng: get --> http://localhost:5000/api/payment/orders/customerReceived/getMonthlyIncome
- Lấy ra những đơn hàng được thanh toán trong 3 ngày gần nhất : get --> http://localhost:5000/api/payment/newPayment

1. API dành cho khách hàng

\*Upload:

- Upload ảnh người dùng : post --> http://localhost:5000/api/uploadImageUser
- Xóa ảnh người dùng trên cloud : post --> http://localhost:5000/api/destroyImageUser

\*Customer:

- Đăng ký tài khoản khách hàng: post --> http://localhost:5000/api/auth/register
- Xác thực email đăng ký: get --> http://localhost:5000/api/auth/verify/:userId/:uniqueString
- Đăng nhập tài khoản khách hàng : post --> http://localhost:5000/api/auth/login
- Đăng xuất tài khoản: get --> http://localhost:5000/api/auth/logout
- Xem profile: get --> http://localhost:5000/api/auth/profile
- Chỉnh sửa profile: patch --> http://localhost:5000/api/auth/profile/update
- Refresh token : get --> http://localhost:5000/api/auth/refresh_token
- Thay đổi mật khẩu : patch --> http://localhost:5000/api/auth/changePassword
- Quên mật khẩu tài khoản khách hàng: post --> http://localhost:5000/api/auth/forget
- Link reset mật khẩu khi quên: put --> http://localhost:5000/api/auth/password/reset/:token
- Đăng nhập google tài khoản khách hàng: post --> http://localhost:5000/api/auth/loginGoogle

- Thêm giày vào giỏ hàng: patch --> http://localhost:5000/api/auth/addCart

- Lịch sử đơn hàng của khách hàng : --> http://localhost:5000/api/auth/history

\*Category

- Xem tất cả thể loại category : get --> http://localhost:5000/api/category/all
  
\*Feedback

- Gui feed back : post --> http://localhost:5000/api/feedback/send

\*Product

- Xem tất cả sản phẩm: get --> http://localhost:5000/api/product/getAll
- Xem chi tiết sản phẩm : get --> http://localhost:5000/api/product/getId/:id
- Chỉnh sửa comment review : put --> http://localhost:5000/api/product/:productId/update/review/:commentId
- Xóa comment : delete --> http://localhost:5000/api/product/:productId/delete/review/:commentId

\*Payment

- Thanh toán đơn hàng: post --> http://localhost:5000/api/payment/payments
- Xóa mem payment :Path -->http://localhost:5000/api/payment/deletePayments/:id

