import MKBox from "components/MKBox";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components

import MKTypography from "components/MKTypography";



import { Alert, Breadcrumbs, Button, Checkbox, Input, Option, Select } from "@material-tailwind/react";
// Images
import bgImage from "assets/images/bg-about-us.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function StudentAddCourse() {
 

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
    .post(`http://localhost:2020/student-service/student`, student, {
      validateStatus: () => {
        return true;
      }
    })
    .then((response) => {
      console.log(response) // Xử lý phản hồi từ server
      if(response)
        setOpenAlter(true)
       
      else
      alert("Thêm sinh viên không thành công")
    })
    .catch((error) => {
      console.error('Error:', error)
      console.log(error.response.data.message)
     
    })

  }
  
  const [openAlter, setOpenAlter] = useState(false);


  const [khoahoc, setkhoahoc]= useState([])
const getDanhSachKhoaHoc = async() => {
  try {
    const result = await axios.get(`http://localhost:2020/course-service/course/list`,{

      validateStatus: () => {
        return true;
      }
    });
    console.log(result)
    if(result.status === 200){

      setkhoahoc(result.data)
    }

   
} catch (error) {
  console.log(error)
}
}

const [checkedValues, setCheckedValues] = useState([]);

const handleCheckboxChange = (ma_course) => {
  setCheckedValues((prev) =>
    prev.includes(ma_course)
      ? prev.filter((item) => item !== ma_course) // Bỏ khỏi danh sách nếu đã tồn tại
      : [...prev, ma_course] // Thêm vào danh sách nếu chưa có
  );
};


console.log("Checkbox đã được chọn:", checkedValues);

useEffect(() => {
 
  getDanhSachKhoaHoc();
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
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Free & Open Source Web UI Kit built over ReactJS &amp; MUI. Join over 1.6 million
              developers around the world.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      <Alert className="absolute top-3 left-2 w-72" open={openAlter}   animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }} onClose={() => setOpenAlter(false)}>
       Thêm sinh viên thành công
      </Alert>

      <Card
        sx={{
          p: 2,
          //   mx: { xs: 2, lg: 3 },
          mt: -20,
          mb: 4,
          mx: "auto", // Tự động căn giữa theo trục ngang
          width: "60%",
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
      <a href="#">Thêm khóa học sinh viên</a>
    </Breadcrumbs>
            </div>
        <MKTypography variant="body1" color="info" textAlign="center" px={{ xs: 6, lg: 12 }} mt={1}>
          THÔNG TIN SINH VIÊN
        </MKTypography>

        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <form className="mt-8 mb-2  max-w-screen-lg " onSubmit={handleSubmit}>
              <div className="columns-4  w-max gap-4">
                <div>
                <MKTypography><span className="text-blue-500">Họ tên:</span> Nguyễn Văn A</MKTypography>
               
                </div>

                <div>
                <MKTypography> <span className="text-blue-500">Giới tính:</span> Nam</MKTypography>
                </div>
                <div>
                  
                  <MKTypography> <span className="text-blue-500">Ngày sinh:</span>   20/01/2005</MKTypography>
                </div>
                <div>
                 
                  <MKTypography><span className="text-blue-500"> Đại chỉ:</span> Hậu Giang</MKTypography>
                </div>
              </div>

              <div className="columns-2 gap-4 mt-5">
              <div>
                 
                 <MKTypography><span className="text-blue-500">MSSV:</span>12345678 </MKTypography>
               </div>
               <div>
                 
                 <MKTypography><span className="text-blue-500">Khóa:</span>: 17</MKTypography>
               </div>
               <div>
                 
                 <MKTypography><span className="text-blue-500">Số điện thoại:</span> 0123456789</MKTypography>
               </div>
               <div>
                 
                 <MKTypography> <span className="text-blue-500">Email:</span> 12345678@stu.edu.vn</MKTypography>
               </div>
              </div>
            <hr />
              <MKTypography variant="body1" color="info" textAlign="center" px={{ xs: 6, lg: 12 }} mt={1}>
          THÊM KHÓA HỌC SINH VIÊN
        </MKTypography>

        <div className="flex w-max gap-4">
            {
              (khoahoc.map((data, index) => (
                <Checkbox key={index} color="blue" label={data.tenkhoahoc} value={data.ma_course}
                onChange={(e) => handleCheckboxChange(data.ma_course)}
                />
              )))



            }
    
    </div>
              <div className="mt-5 flex justify-end">
                <Button type="submit" color="blue"> save</Button>
              </div>
            </form>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default StudentAddCourse;
