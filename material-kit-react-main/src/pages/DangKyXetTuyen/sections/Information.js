// import { useState } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MKButton from "components/MKButton";
import { Input } from "@material-tailwind/react";
// import MKDatePicker from "components/MKDatePicker";
import { Radio, Typography } from "@material-tailwind/react";
import { useState } from "react";
import Select from "react-select";
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full scale-105"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InformationThiSinh() {
  // const [checked, setChecked] = useState(false);
  // const [phai,setphai] = useState("Nam")

  // const handleChecked = (event) => {
  //   const check = event.target.checked;
  //   setChecked(!checked)

  //   if(check)
  //       setphai('Nữ')
  //   else
  //       setphai('Nam')
  // };
  const [startDate, setStartDate] = useState(new Date());

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  return (
    <>
      <MKBox p={3}>
        <MKTypography variant="h" color="text" mb={3}>
          1. THÔNG TIN THÍ SINH
        </MKTypography>
      </MKBox>

      <MKBox component="section" py={1}>
        <Grid container item xs={12} lg={12} sx={{ mx: "auto" }}>
          <MKBox width="100%" component="form" method="post" autoComplete="off">
            <MKBox p={3}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6} mb={2}>
                  <MKInput
                    variant="standard"
                    type="email"
                    label="Email"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      variant="standard"
                      label={
                        <span className="lable-custome">
                          Họ đệm <span className="lable-star">*</span>
                        </span>
                      }
                      placeholder="Nguyễn Văn"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MKInput
                      variant="standard"
                      label={
                        <span className="lable-custome">
                          Tên <span className="lable-star">*</span>
                        </span>
                      }
                      placeholder="A"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={6} alignItems="center">
                    <h6 className="lable-custome">Giới tính</h6> &nbsp;
                    <div className="flex gap-10">
                      <Radio
                        name="type"
                        ripple={false}
                        icon={<Icon />}
                        color="blue"
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography color="blue-gray" className="font-normal text-blue-gray-400">
                            Nam
                          </Typography>
                        }
                      />
                      <Radio
                        name="type"
                        defaultChecked
                        ripple={false}
                        icon={<Icon />}
                        color="blue"
                        className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                        label={
                          <Typography color="blue-gray" className="font-normal text-blue-gray-400">
                            Nữ
                          </Typography>
                        }
                      />
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6} alignItems="center">
                    <h6 className="text-blue-600">Năm sinh</h6>

                    <div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="px-4 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>

           
                  </Grid>
                  <Grid item xs={12} md={12}>
                  <Input variant="static" 
                  color = "blue"
                   label={
                    <span className="lable-custome">
                      Hộ khẩu thường trú <span className="lable-star">*</span>
                    </span>
                  }
                  placeholder="Số nhà/khu phố, thôn, tên đường, ấp, tổ"/>
                  </Grid>
                  <Grid item xs={12} md={4}>
              
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isRtl={isRtl}
                      isSearchable={isSearchable}
                      placeholder="- Chọn Tỉnh/TP -"
                      name="color"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: "none", // Bỏ tất cả viền
                          borderBottom: "2px solid #9ca3af", // Viền dưới mặc định
                          borderRadius: "0px",
                          // Thêm phần tùy chỉnh khi focus
                          ...(state.isFocused && {
                            border: "none", // Loại bỏ viền khi focus
                            borderBottom: "2px solid #4CAF50", // Màu khi focus
                            boxShadow: "none", // Loại bỏ box-shadow
                            outline: "none", // Loại bỏ outline khi focus
                          }),
                        }),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                 
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isRtl={isRtl}
                      isSearchable={isSearchable}
                      placeholder="- Chọn Quận/Huyện -"
                      name="color"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: "none", // Bỏ tất cả viền
                          borderBottom: "2px solid #9ca3af", // Viền dưới mặc định
                          borderRadius: "0px",
                          // Thêm phần tùy chỉnh khi focus
                          ...(state.isFocused && {
                            border: "none", // Loại bỏ viền khi focus
                            borderBottom: "2px solid #4CAF50", // Màu khi focus
                            boxShadow: "none", // Loại bỏ box-shadow
                            outline: "none", // Loại bỏ outline khi focus
                          }),
                        }),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isRtl={isRtl}
                      isSearchable={isSearchable}
                      placeholder="- Chọn Phường/Xã -"
                      name="color"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: "none", // Bỏ tất cả viền
                          borderBottom: "2px solid #9ca3af", // Viền dưới mặc định
                          borderRadius: "0px",
                          // Thêm phần tùy chỉnh khi focus
                          ...(state.isFocused && {
                            border: "none", // Loại bỏ viền khi focus
                            borderBottom: "2px solid #4CAF50", // Màu khi focus
                            boxShadow: "none", // Loại bỏ box-shadow
                            outline: "none", // Loại bỏ outline khi focus
                          }),
                        }),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <MKInput variant="standard" type="email" label="Email Address" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <MKInput variant="standard" label="Your Message" multiline fullWidth rows={6} />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} my={2}>
                  <MKButton type="submit" variant="gradient" color="dark" fullWidth>
                    Send Message
                  </MKButton>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </MKBox>
    </>
  );
}

export default InformationThiSinh;
