import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { Box, styled } from "@mui/system";
import {
  useTheme,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GetEditInfoMember } from "src/slices/MemberSlice";
import { encode as base64_encode } from "base-64";
import axios from "src/utils/axios";
import { error } from "console";
import { TextFields } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "450px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#898989",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#898989",
      },
      "&:hover": {
        borderColor: "#898989",
      },
      "& label.Mui-focused": {
        color: "#898989",
        fontSize: "15px",
      },
    },
  },
  passwordField: {
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "80px",
    marginRight: "70px",
  },
  btn: {
    background: "#999999 0% 0% no-repeat padding-box",
    color: "#fff",
    borderRadius: "3px",
    margin: "0px 5px",
    width: "200px",
    height: "40px",
    "&:hover": {
      background: "#999999 0% 0% no-repeat padding-box !important",
    },
  },
  btn1: {
    borderColor: "#0A58CA",
    color: "#0A58CA",
    borderRadius: "8px",
    margin: "0px 5px",
    width: "180px",
    height: "40px",
    "&:hover": {
      background: "#D0D0D0 0% 0% no-repeat padding-box;",
    },
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();
  const { code } = useParams();
  const dispatch = useDispatch();
  const usersinfo: any = useSelector(
    (state: RootState) => state.member.GetAddEditMember?.dataq
  );
  const [cpState, setCpState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Separate showPassword states for each field
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState({ email: "" });
  const [errortextMessage, setErrorTextMessage] = useState({ membername: "" });
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    dispatch(GetEditInfoMember(code));
  }, [code]);

  useEffect(() => {
    if (usersinfo) {
      setCpState({
        oldPassword: usersinfo?.oldPassword,
        newPassword: usersinfo?.newPassword,
        confirmPassword: usersinfo?.confirmPassword,
      });
    }
  }, [usersinfo]);

  const handleChange = (key, value) => {
    if (key === "oldpassword") {
      setCpState((values: any) => ({ ...values, oldPassword: value }));
    }

    if (key === "newpassword") {
      setCpState((values: any) => ({ ...values, newPassword: value }));
    }

    if (key === "confirmpassword") {
      setCpState((values: any) => ({ ...values, confirmPassword: value }));
    }
  };

  // Toggle password visibility for individual fields
  const togglePasswordVisibility = (field) => {
    if (field === "old") {
      setShowOldPassword(!showOldPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const CHARACTER_LIMIT = 60;

  const handleUpdate = () => {
    const changepassword = {
      oldPassword: base64_encode(cpState.oldPassword),
      newPassword: base64_encode(cpState.newPassword),
      confirmationPassword: base64_encode(cpState.confirmPassword),
    };
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/changePassword`, changepassword)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/home");
          alert("password changed successfully");
        }
      })
      .catch((error) => {});
  };

  const clearData = () => {};

  return (
    <div>
      <Typography
        variant="h3"
        component="div"
        style={{
          fontSize: 15,
          color: "#000000",
          width: "165px",
          height: "20px",
          font: "normal normal 600 20px/28px Acumin Pro",
          opacity: "1",
          letterSpacing: "0px",
          padding: 10,
        }}
      >
        Change Password
      </Typography>
      <Card style={{ boxShadow: "none" }}>
        <CardContent style={{ boxShadow: "none" }}>
          <Box>
            <Grid
              xs={12}
              sm={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
              item
            >
              <div className={classes.passwordField}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#5F5F5F",
                    font: "normal normal normal 14px/20px Acumin Pro",
                    letterSpacing: "0px",
                    fontWeight: 400,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Old Password *
                </p>
                <TextField
                  className={classes.textfield}
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  variant="outlined"
                  value={cpState?.oldPassword}
                  onChange={(event) =>
                    handleChange("oldpassword", event.target.value)
                  }
                  error={errortextMessage.membername.length > 0}
                  helperText={errortextMessage.membername}
                  autoComplete="off"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("old")}
                        >
                          {showOldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
              item
            >
              <div className={classes.passwordField}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#5F5F5F",
                    font: "normal normal normal 14px/20px Acumin Pro",
                    letterSpacing: "0px",
                    fontWeight: 400,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  New Password *
                </p>
                <TextField
                  className={classes.textfield}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  variant="outlined"
                  size="small"
                  value={cpState?.newPassword}
                  onChange={(event) =>
                    handleChange("newpassword", event.target.value)
                  }
                  error={errorMessage.email.length > 0}
                  helperText={errorMessage.email}
                  autoComplete="off"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
              item
            >
              <div className={classes.passwordField}>
                <p
                  style={{
                    fontSize: 14,
                    color: "#5F5F5F",
                    font: "normal normal normal 14px/20px Acumin Pro",
                    letterSpacing: "0px",
                    fontWeight: 400,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  Confirm Password *
                </p>
                <TextField
                  className={classes.textfield}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  variant="outlined"
                  value={cpState?.confirmPassword}
                  onChange={(event) =>
                    handleChange("confirmpassword", event.target.value)
                  }
                  error={errorMessage.email.length > 0}
                  helperText={errorMessage.email}
                  autoComplete="off"
                  id="Confirm Password"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
          </Box>
          <div className={classes.btnContainer}>
            <Link className="btn btn-danger" to={"/home"}>
              <Button
                className={classes.btn1}
                type="submit"
                variant="outlined"
                onClick={clearData}
              >
                CANCEL
              </Button>
            </Link>
            <Button
              style={{
                width: "180px",
                backgroundColor: "#0A58CA",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontSize: 5,
                background: "#0A58CA 0% 0% no-repeat padding-box",
              }}
              type="submit"
              variant="contained"
              onClick={handleUpdate}
            >
              UPDATE
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
