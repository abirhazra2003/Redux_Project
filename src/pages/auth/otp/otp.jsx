import React, { useRef, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { verifyOtp } from "../../../redux/slice/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyUIOnly() {
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, setValue, getValues } = useForm({
    defaultValues: { otp: "" },
  });

  const otpRefs = useRef([]);

  const handleOTPChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value?.length > 1) value = value.charAt(0);
    otpRefs.current[index].value = value;

    if (value && index < 3) otpRefs.current[index + 1]?.focus();
    if (!value && index > 0) otpRefs.current[index - 1]?.focus();

    const otpArray = otpRefs.current.map((input) => input.value).join("");
    setValue("otp", otpArray);
  };

  const onSubmit = async () => {
    const otp = getValues("otp");
    const data = { email, otp };
    try {
      setLoading(true);
      const response = await dispatch(verifyOtp(data)).unwrap();
      if (response) navigate("/");
    } catch (error) {
      console.error("OTP Verification Failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
         <Typography align="center">
            <h1>Verify Your OTP</h1>
          </Typography>
        <Card
          sx={{
            width: "100%",
            boxShadow: 6,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >

          <CardContent sx={{ px: 4, pb: 4 }}>
            <Typography variant="body2" align="center" mb={2}>
              A 4-digit code was sent to{" "}
              <Typography component="span" fontWeight="bold">
                {email}
              </Typography>
              . Enter it below to verify your account.
            </Typography>

            <Grid container spacing={2} justifyContent="center" mt={1}>
              {[...Array(4)].map((_, index) => (
                <Grid item key={index}>
                  <TextField
                    variant="outlined"
                    inputRef={(el) => (otpRefs.current[index] = el)}
                    size="small"
                    onChange={(e) => handleOTPChange(e, index)}
                    inputProps={{
                      maxLength: 1,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      style: {
                        textAlign: "center",
                        fontSize: "1.5rem",
                        width: "3.5rem",
                        height: "3.5rem",
                        padding: 0,
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: "10px",
                        borderColor: "#ccc",
                        transition: "all 0.3s ease-in-out",
                        "&:hover fieldset": {
                          borderColor: "#fb8c00",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#fb8c00",
                          boxShadow: "0 0 0 2px rgba(251, 140, 0, 0.2)",
                        },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              fullWidth
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: "#fb8c00",
                textTransform: "none",
                boxShadow: "0px 4px 12px rgba(251, 140, 0, 0.4)",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Box mt={3} textAlign="center">
              <MuiLink
                component={Link}
                to="/auth/register"
                underline="hover"
                fontSize="0.875rem"
                color="text.secondary"
              >
                Didn’t receive a code? Resend
              </MuiLink>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
