import MKBox from "components/MKBox"

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components

import MKTypography from "components/MKTypography";


import { PencilIcon, PencilSquareIcon, PlusIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import "../../assets/css/style.css"

import { Alert, IconButton, Input, Tooltip } from "@material-tailwind/react";
// Images
import bgImage from "assets/images/toanha.jpg";
import Header from "pages/DangKyXetTuyen/sections/Header";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function View() {

    const TABLE_HEAD = ["ID", "Họ tên", "Gioi tính", "Ngày sinh", "MSSV", "SĐT", "Email" ,""];
    const TABLE_HEAD_COURSE = ["ID", "Tên khóa học"]
 
const [dssinhvien, setdssinhvien] = useState([
  
])

const getDanhSachSinhVien = async() => {
  try {
    const result = await axios.get(`http://localhost:2020/student-service/student/list`,{

      validateStatus: () => {
        return true;
      }
    });
    console.log(result)
    if(result.status === 200){

        setdssinhvien(result.data)
    }

   
} catch (error) {
  console.log(error)
}
}

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

useEffect(() => {
  getDanhSachSinhVien()
  getDanhSachKhoaHoc();
}, [])

const [open, setOpen] = useState(false);
 const [txtthongbao, settxtthongbao] = useState("")
 const [mastudent, setmastudent] = useState(0)
  const handleOpen = (mastudent,hoten) => {
      settxtthongbao(hoten)
  setmastudent(mastudent)
    setOpen(!open)
  };

  const onClickXoaStudent = async () => {

    if(mastudent === 0)
{
    alert("Mã student không hợp lệ")
    return
  }

  axios.delete(`http://localhost:2020/student-service/student/${mastudent}`, {
    validateStatus: () => {
      return true;
    }
  })
  .then((response) => {
  
  
    if(response.data)
    {

      getDanhSachSinhVien()
      setOpen(false)
     
      setOpenAlter(true)
     
    }
     
    else
      alert("Xóa sinh viên không thành công")
  })
  }

  const [openAlter, setOpenAlter] = useState(false);

  const [openAddCourse, setOpenAddCourse] = useState(false);

const handleOpenAddCourse = () => {
   
    
    setOpenAddCourse(true)
  
};

const [openEditCourse, setOpenEditCourse] = useState(false);
const [ma_course, setma_course] = useState(0)
const handleOpenEditCourse = (ma_course, tenkhoahoc) => {
   
  setcourse({...course, tenkhoahoc:tenkhoahoc})
  setOpenEditCourse(true)
setma_course(ma_course)
};
const [course, setcourse] = useState({
  tenkhoahoc: '',
})

const onInputChange = (e) => {
  setcourse({...course, [e.target.name]:e.target.value})
 
}



const handleSubmitCourse = () => {
    console.log(course)
  axios
  .post(`http://localhost:2020/course-service/course`,course, {
   
    validateStatus: () => {
      return true;
    }
  })
  .then((response) => {
    console.log(response) // Xử lý phản hồi từ server
    if(response.data)
    {
     
    getDanhSachKhoaHoc()

    alert("Edit khoa học thành công")

    setcourse({...course, "tenkhoahoc":""})
    }
     
    else
    {
     
      setOpenEditCourse(false)
    }
  })
  .catch((error) => {
    console.error('Error:', error)
    console.log(error.response.data.message)
   
  })

}

const handleSubmitEditCourse = () => {
  console.log(course)
axios
.put(`http://localhost:2020/course-service/course/${ma_course}`,course, {
 
  validateStatus: () => {
    return true;
  }
})
.then((response) => {
  console.log(response) // Xử lý phản hồi từ server
  if(response.data)
  {
   
  getDanhSachKhoaHoc()

  alert("Thêm khoa học thành công")

 
  }
   
  else
  {
   
    setOpenAlter(false)
  }
})
.catch((error) => {
  console.error('Error:', error)
  console.log(error.response.data.message)
 
})

}

const [openXoaKH, setOpenXoaKH] = useState(false);
const [txtXoa, settxtXoa] = useState("")
const [maxoa, setmxoa] = useState(0)
const handleOpenXoaKH = (makhoa,hoten) => {
  settxtXoa(hoten)
setmxoa(makhoa)
setOpenXoaKH(!open)
};


const onClickXoaCourse = async () => {

  if(maxoa === 0)
{
  alert("Mã course không hợp lệ")
  return
}

axios.delete(`http://localhost:2020/course-service/course/${maxoa}`, {
  validateStatus: () => {
    return true;
  }
})
.then((response) => {


  if(response.data)
  {

    setOpenXoaKH(false)
    getDanhSachKhoaHoc()
   alert("Xóa khoa học thành công")
  }
   
  else
    alert("Xóa sinh viên không thành công")
})
}
        return(
            <>
            <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Container>
              <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
                <MKTypography
                  variant="h1"
                  color="error"
                  mt={-7}
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


         
      <Alert className="absolute top-3 left-2 w-72" open={openAlter}   animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }} onClose={() => setOpenAlter(false)}>
      Thêm khóa học thành công
      </Alert>

          <Card
            sx={{
              p: 2,
            //   mx: { xs: 2, lg: 3 },
              mt: -20,
              mb: 4,
              mx: "auto", // Tự động căn giữa theo trục ngang
              width: "70%",
              // backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <div>
          
             
              <div className="columns-5 gap-4">
              <Link to={`/quanlysinhvien/add-sinh-vien`}>
                  <Button color="blue" className="flex items-center gap-3" size="sm">  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm sinh viên</Button>
                  </Link>
            
              </div>
              
                 
              
          
            </div>
             
            <MKTypography
                  variant="body1"
                  color="info"
                  textAlign="center"
                  px={{ xs: 6, lg: 12 }}
                  mt={1}
                >
                 Danh Sách Sinh Viên
                </MKTypography>
        <div className="border-indigo-700 border-b">
                <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                 variant="small"
                 color="blue-gray"
                 className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
          dssinhvien.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) :
          (dssinhvien.map((data, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.mastudent}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.hoten}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.gioitinh === 0 ? 'Nam' : 'Nữ'}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.ngaysinh}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.mssv}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.sdt}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.email}
                </Typography>
              </td>
              <td className="p-4 text-sm">
             
                
                <Link to={`/quanlysinhvien/edit-sinh-vien/${data.mastudent}`}>
                <Tooltip content="Edit User">
              
                       <FontAwesomeIcon icon={faPenToSquare} className="text-blue-500"/>
                      
                       
                      </Tooltip>
                      
              </Link>
              <Tooltip content="Delete User">
                      
                        <FontAwesomeIcon icon={faTrash} onClick={() => handleOpen(data.mastudent,data.hoten)} className="text-red-500 ml-3 " />
                      
                      </Tooltip>
                      <Link to={`/quanlysinhvien/add-course-student/${data.mastudent}`}>
                <Tooltip content="Thêm khóa học">
                <FontAwesomeIcon icon={faPlus} className="ml-3" />
                      </Tooltip>
                      
              </Link>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>

      <div className="columns-5 gap-4 mt-5">
      
      <Button onClick={handleOpenAddCourse} color="blue" className="flex items-center gap-3" size="sm">  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Thêm khóa học</Button>
           
    
              
              </div>
      <MKTypography
                  variant="body1"
                  color="info"
                  textAlign="center"
                  px={{ xs: 6, lg: 12 }}
                  mt={1}
                >
                 Danh Sách Khóa Học
                </MKTypography>

                <div className="border-indigo-700 border-b">
                <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD_COURSE.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                 variant="small"
                 color="blue-gray"
                 className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
          khoahoc.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) :
          (khoahoc.map((data, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.ma_course}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {data.tenkhoahoc}
                </Typography>
              </td>
              
              <td className="p-4 text-sm">
            
               
                <Tooltip content="Edit khóa học">
                        <IconButton variant="text">
                          <PencilSquareIcon className="h-4 w-4"  onClick={() => handleOpenEditCourse(data.ma_course, data.tenkhoahoc)}/>
                        </IconButton>
                      </Tooltip>
                      
             
              <Tooltip content="Delete khóa học">
                      
                        <FontAwesomeIcon className="text-red-500" icon={faTrash}  onClick= {() => handleOpenXoaKH(data.ma_course, data.tenkhoahoc)}/>
                      
                      </Tooltip>
                      <Link to={`/quanlysinhvien/edit-sinh-vien/${data.mastudent}`}>
                {/* <Tooltip content="Thêm khóa học">
                        <IconButton variant="text">
                          <PlusIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip> */}
                      
              </Link>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      </div>


      
          </Card>

         

          <Dialog open={open}   size="xs" handler={handleOpen}>
        <DialogHeader>Thông báo</DialogHeader>
        <DialogBody>
          Bạn có muốn xóa sinh viên <span className="text-red-500">{txtthongbao}</span> không ?
         </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClickXoaStudent}>
            <span>Xóa</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openAddCourse}   size="xs" handler={handleOpenAddCourse}>
        <DialogHeader>Thêm khóa học</DialogHeader>
        <DialogBody>
        
        <div>
                          <Input color="blue" label="Tên khóa học" name="tenkhoahoc" onChange={(e) => onInputChange(e)} />
                        </div>
         </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpenAddCourse(!openAddCourse)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmitCourse}>
            <span>save</span>
          </Button>
        </DialogFooter>
      </Dialog>


      <Dialog open={openEditCourse}   size="xs" handler={handleOpenEditCourse}>
        <DialogHeader>Edit khóa học</DialogHeader>
        <DialogBody>
        
        <div>
                          <Input color="blue" label="Tên khóa học" name="tenkhoahoc" value={course.tenkhoahoc} onChange={(e) => onInputChange(e)} />
                        </div>
         </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpenEditCourse(!openEditCourse)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmitEditCourse}>
            <span>update</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openXoaKH}   size="xs" handler={handleOpenXoaKH}>
        <DialogHeader>Thông báo</DialogHeader>
        <DialogBody>
          Bạn có muốn xóa khóa học <span className="text-red-500">{txtXoa}</span> không ?
         </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpenXoaKH(!openXoaKH)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClickXoaCourse}>
            <span>Xóa</span>
          </Button>
        </DialogFooter>
      </Dialog>
        </>
        )
}


export default View