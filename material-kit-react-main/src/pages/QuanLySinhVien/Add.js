import MKBox from "components/MKBox";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components

import MKTypography from "components/MKTypography";

import "../../assets/css/style.css";

import { Alert, Breadcrumbs, Button, Input, Option, Select } from "@material-tailwind/react";
// Images
import bgImage from "assets/images/bg-about-us.jpg";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function View() {
  const [student, setstudent] = useState({
    hoten: "",
    gioitinh: 0,
    ngaysinh: "",
    diachi: "",
    mssv: "",
    khoa: "",
    sdt: "",
    email: "",
  });

  const { hoten, gioitinh, ngaysinh, diachi, mssv, khoa, sdt, email } = student;

  const onInputChange = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    if (name === "sdt") {
      if (value.length > 12) {
        alert("Không được vượt quá 12 kí tự");
        e.target.value = value.slice(0, 12);
      }
    }
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const onChangeGT = (e) => {
    setstudent({ ...student, gioitinh: e });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(student);

    axios
      .post(`http://localhost:2020/student-service/student`, student, {
        validateStatus: () => {
          return true;
        },
      })
      .then((response) => {
        console.log(response); // Xử lý phản hồi từ server
        if (response.status === 200) {
          if (response) setOpenAlter(true);
          else alert("Thêm sinh viên không thành công");
        } else alert("Thêm sinh viên không thành công, không thể kết nối tới service student");
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(error.response.data.message);
      });
  };

  const [openAlter, setOpenAlter] = useState(false);

  return (
    <>
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              VTTU
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Alert
        className="absolute top-3 left-2 w-72"
        open={openAlter}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        onClose={() => setOpenAlter(false)}
      >
        Thêm sinh viên thành công
      </Alert>

      <Card
        sx={{
          p: 2,
          //   mx: { xs: 2, lg: 3 },
          mt: -40,
          mb: 4,
          mx: "auto", // Tự động căn giữa theo trục ngang
          width: "70%",
          //   backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <div className="flex w-max gap-4">
          <Breadcrumbs>
            <a href="#" className="opacity-60">
              Trang chủ
            </a>
            <Link to={`/quanlysinhvien`}>
              <a href="#" className="opacity-60">
                Trở về
              </a>
            </Link>
            <a href="#">Thêm sinh viên</a>
          </Breadcrumbs>
        </div>
        <MKTypography variant="body1" color="info" textAlign="center" px={{ xs: 6, lg: 12 }} mt={1}>
          THÔNG TIN SINH VIÊN
        </MKTypography>

        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <form className="mt-8 mb-2  max-w-screen-lg " onSubmit={handleSubmit}>
              <div className="flex  w-max gap-4">
                <div>
                  <Input
                    name="hoten"
                    onChange={(e) => onInputChange(e)}
                    color="blue"
                    label="Họ tên"
                  />
                </div>

                <div>
                  <Select label="Gioi tính" name="gioitinh" onChange={onChangeGT}>
                    <Option value="0">Nam</Option>
                    <Option value="1">Nữ</Option>
                  </Select>
                </div>
                <div>
                  <Input
                    color="blue"
                    label="Ngày sinh"
                    name="ngaysinh"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div>
                  <Input
                    color="blue"
                    label="Đại chỉ"
                    name="diachi"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div>
                  <Input color="blue" label="MSSV" name="mssv" onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input color="blue" label="Khóa" name="khoa" onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input
                    color="blue"
                    label="SĐT"
                    name="sdt"
                    value={sdt}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    color="blue"
                    label="Email"
                    name="email"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button type="submit" color="blue">
                  {" "}
                  save
                </Button>
              </div>
            </form>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default View;
