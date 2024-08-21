import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Verified, MailOutline, Bloodtype, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
  import { Link } from "react-router-dom";
  import { CenteredBox } from "./Boxes";
  
  function OrderPage({ setState, loading, state }) {
    const [personal, setPersonal] = useState(true);
    const collapsContainer = {
      borderBottom: "1px solid #7F7F7F",
    };
  
    return (
      <>
        {!loading && state && (
          <Box mt={3} mb={3}>
            <Card
              sx={{
                minWidth: 300,
                border: "1px solid #7F7F7F",
                marginTop: "48px",
                boxShadow: "0px 0px 19px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardHeader
                title="Order details"
                onClick={() => setPersonal(!personal)}
                action={
                  <IconButton aria-label="expand" size="small">
                    {personal ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                }
                sx={collapsContainer}
              />
              <Box>
                <Collapse in={personal} timeout="auto">
                  <CardContent>
                    <Container sx={{ lineHeight: 2 }}>
                      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableBody>
                            {state.products && state.products.length > 0 ? (
                              state.products.map((product, index) => (
                                <React.Fragment key={index}>
                                  <TableRow>
                                    <TableCell>
                                      <Typography
                                        sx={{
                                          alignItems: "center",
                                          display: "flex",
                                          lineHeight: "100%",
                                        }}
                                        variant="h6"
                                      >
                                        <Verified />
                                        &nbsp;&nbsp;
                                      </Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Avatar
                                        sx={{ width: 40, height: 40 }}
                                        alt="Product Image"
                                        src={product.profile_url}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Typography
                                        sx={{
                                          alignItems: "center",
                                          display: "flex",
                                          lineHeight: "100%",
                                        }}
                                        variant="h6"
                                      >
                                        <Verified />
                                        &nbsp;&nbsp;Product Name
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{product.productName || "NA"}</TableCell>
                                  </TableRow>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": { border: 0 },
                                    }}
                                  >
                                    <TableCell>
                                      <Typography
                                        sx={{
                                          alignItems: "center",
                                          display: "flex",
                                          lineHeight: "100%",
                                        }}
                                        variant="h6"
                                      >
                                        <MailOutline />
                                        &nbsp;&nbsp;Price
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{product.price ? `$${product.price}` : "NA"}</TableCell>
                                    <TableCell>
                                      <Typography
                                        sx={{
                                          alignItems: "center",
                                          display: "flex",
                                          lineHeight: "100%",
                                        }}
                                        variant="h6"
                                      >
                                        <Bloodtype />
                                        &nbsp;&nbsp;Quantity
                                      </Typography>
                                    </TableCell>
                                    <TableCell>{product.quantity || "NA"}</TableCell>
                                  </TableRow>
                                </React.Fragment>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4}>
                                  <Typography>No products available</Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Container>
                  </CardContent>
                </Collapse>
              </Box>
            </Card>
          </Box>
        )}
        {!state && !loading && (
          <CenteredBox>
            <Typography variant="h3">Loading Data...</Typography>
          </CenteredBox>
        )}
        {loading && (
          <CenteredBox>
            <CircularProgress />
          </CenteredBox>
        )}
      </>
    );
  }
  
  export default OrderPage;
  