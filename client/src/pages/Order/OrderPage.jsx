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
import moment from "moment";
import '../MyAccount/MyAccount.scss'

function OrderPage({ setState, loading, state }) {

  // Initialize state for each order
  const [expandedOrders, setExpandedOrders] = useState({});

  // Toggle collapse for a specific order
  const handleExpandClick = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <>
    <div className="layout">
    <div className="_container">
     <main id="mainContent" className="_main">
          <div className="_settingsMain">
            <div className="_container _row _spaceBetween">
              <div className="_row">
                <h1 className="_title">Settings</h1>
              </div>
            </div>
          </div>

          <div className="_tabsContainer">
            <div className="w-100 select-none bg-white">
              <div className="flex">
                <a href="/myaccount" className="router-link-exact-active router-link-active _menuItem" aria-current="page">Account Settings</a>
                <a href="/orderPage" className="router-link-exact-active router-link-active _menuItem" aria-current="page">Orders</a>
              </div>
            </div>
          </div>

          <div className="_root">
          {!loading && state && (
        <Box mt={3} mb={3}>
          {state.data.data && state.data.data.length > 0 ? (
            state.data.data.map((order) => (
              <Card
                key={order.id}
                sx={{
                  minWidth: 300,
                  border: "1px solid #7F7F7F",
                  marginTop: "48px",
                  boxShadow: "0px 0px 19px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader
                  title={`Order Date - ${moment(order.attributes.createdAt).format('MMMM D, YYYY')}`}
                  onClick={() => handleExpandClick(order.id)}
                  action={
                    <IconButton aria-label="expand" size="small">
                      {expandedOrders[order.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  }
                  sx={{ borderBottom: "1px solid #7F7F7F" }}
                />
                <Box>
                  <Collapse in={expandedOrders[order.id]} timeout="auto">
                    <CardContent>
                      <Container sx={{ lineHeight: 2 }}>
                        <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                              {order.attributes.products && order.attributes.products.length > 0 ? (
                                order.attributes.products.map((product, productIndex) => (
                                  <React.Fragment key={productIndex}>
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
                                          &nbsp;&nbsp;Image
                                        </Typography>
                                      </TableCell>
                                      <TableCell>
                                        <Avatar
                                          sx={{ width: 40, height: 40 }}
                                          alt="Product Image"
                                          src={`${process.env.REACT_APP_IMAGE_ACCESS_URL}${product.img}`}
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
                                          &nbsp;&nbsp;Product Name
                                        </Typography>
                                      </TableCell>
                                      <TableCell>{product.title || "NA"}</TableCell>
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
            ))
          ) : (
            <Typography>No orders available</Typography>
          )}
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
          </div>
        </main>
      </div>
      </div>
    </>
  );
}

export default OrderPage;