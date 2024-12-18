import MKBox from "components/MKBox";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components

import MKTypography from "components/MKTypography";

import "../../assets/css/style.css";

import { Breadcrumbs, Button, Input, Option, Select } from "@material-tailwind/react";
// Images
import bgImage from "assets/images/bg-about-us.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function Edit() {
 
    const { id } = useParams()

  const [student, setstudent] = useState({
      hoten: '',
      gioitinh: 0,
      ngaysinh: '',
      diachi: '',
      mssv: '',
      khoa: '',
      sdt: '',
      email: '',
  })

  const {hoten, gioitinh, ngaysinh, diachi, mssv,khoa,sdt,email} = student

  const onInputChange = (e) => {
    console.log(e)
    const name = e.target.name
     const value = e.target.value
     if(name === 'sdt'){
        if(value.length > 12){
            alert('Không được vượt quá 12 kí tự')
            e.target.value = value.slice(0, 12);
        }
     }
    setstudent({...student, [e.target.name]: e.target.value})
  }

  const onChangeGT = (e) => {
      
        setstudent({...student, "gioitinh": e})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      
    console.log(student)

    axios
    .put(`http://localhost:2020/student-service/student/${id}`, student, {
      validateStatus: () => {
        return true;
      }
    })
    .then((response) => {
      console.log(response) // Xử lý phản hồi từ server
      if(response)
        alert("Cập nhật sinh viên thành công")
      else
      alert("Cập nhật sinh viên không thành công")
    })
    .catch((error) => {
      console.error('Error:', error)
      console.log(error.response.data.message)
     
    })

  }
  
  const getDanhSachSinhVien = async() => {
    try {
      const result = await axios.get(`http://localhost:2020/student-service/student/${id}`,{
  
        validateStatus: () => {
          return true;
        }
      });
      console.log(result)
      if(result.status === 200){
  
        setstudent(result.data)
        console.log(result.data)
      }
  
     
  } catch (error) {
    console.log(error)
  }
  }
  
  useEffect(() => {
    getDanhSachSinhVien()
  }, [])

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
             VTTU{" "}
            </MKTypography>
           
          </Grid>
        </Container>
      </MKBox>
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
      <a href="#">Edit sinh viên</a>
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
                  <Input name="hoten" value={hoten} onChange={(e) => onInputChange(e)}
                   color="blue" label="Họ tên" />
                </div>

                <div>
                  <Select label="Giới tính" name="gioitinh" value={gioitinh} onChange={onChangeGT}>
                    <Option  value={0}>Nam</Option>
                    <Option value={1}>Nữ</Option>
                  </Select>
                </div>
                <div>
                  <Input color="blue" label="Ngày sinh" name="ngaysinh" value={ngaysinh} onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input color="blue" label="Đại chỉ" name="diachi" value={diachi} onChange={(e) => onInputChange(e)} />
                </div>
              </div>

              <div className="flex gap-4 mt-5">
                <div>
                  <Input color="blue" label="MSSV" name="mssv" value={mssv} onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input color="blue" label="Khóa" name="khoa" value={khoa} onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input color="blue" label="SĐT" name="sdt"  value={sdt} onChange={(e) => onInputChange(e)} />
                </div>
                <div>
                  <Input type="email" color="blue" label="Email" name="email" value={email} onChange={(e) => onInputChange(e)} />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Button type="submit" color="blue"> update</Button>
              </div>
            </form>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default Edit;
