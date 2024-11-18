// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKInput from "components/MKInput";
// import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// // Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import DefaultFooter from "examples/Footers/DefaultFooter";

// // Routes
// import routes from "routes";
// import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/banner/bannerdemo.png";

function Header() {
  return (
    <>
      <Grid container spacing={3} alignItems="center" textAlign="center">
        <Grid item xs={12} lg={12}>
          <MKBox
            width="calc(100% - 2rem)"
            height="40vh"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "contain", // Đảm bảo ảnh nằm gọn trong khung
              backgroundRepeat: "no-repeat", // Tránh lặp lại ảnh
              backgroundPosition: "center", // Căn giữa ảnh trong khung
            }}
          />

          <MKTypography variant="h3" fontWeight="bold" mt={3} color="info">
            ĐĂNG KÝ XÉT TUYỂN TRỰC TUYẾN VÀO
          </MKTypography>

          <MKTypography variant="h3" fontWeight="bold" mt={1} color="error">
            TRƯỜNG ĐẠI HỌC VÕ TRƯỜNG TOẢN
          </MKTypography>

          <MKTypography
            variant="body1"
            //   px={{ xs: 6, lg: 12 }}
            mt={3}
          >
            Mọi thắc mắc bạn có thể liên hệ với chúng tôi qua hotline/zalo 0357 534 716
          </MKTypography>
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
