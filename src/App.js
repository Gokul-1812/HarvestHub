import "./App.css";
import Home from "./pages/Home";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./api/profileAPI";
import {
  getLoginAction,
  getSaveProfileAction,
  getSaveTokenAction
} from "./redux/actions";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import SupportAdmin from "./components/ChatSupport/SupportAdmin/index";
import SupportEngine from "./components/ChatSupport/SupportEngine/index";
import Cookies from "js-cookie";

//Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Help from "./pages/Help";
import Header from "./components/header/Header";
import FAQ from "./pages/FAQ";
import Footer from "./components/footer/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/addProduct/AddProduct";
import VerifyOTP from "./components/verify-otp";
import Product from "./pages/product/Product";
import PartnerDispute from "./pages/PartnerDispute";
import CancellationForm from "./components/cancellationForm";
import ContactUs from "./pages/ContactUs/ContactUs";
import Chat from "./pages/chat/Chat";
import BookingRequest from "./pages/bookingRequest/BookingRequest";
import CancellationPolicy from "./pages/cancellationPage/CancellationPolicy";
import UpdateProfile from "./pages/updateProfile/index";
import BookingHistory from "./pages/bookingHistory";
import Feedback from "./pages/feedback/Feedback";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import EquipmentReport from "./pages/EquipmentReport";

function App() {
  const authState = useSelector((state) => state.authReducer);
  const tokenState = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const access = Cookies.get("access-token");
    const refresh = Cookies.get("refresh-token");
    dispatch(
      getSaveTokenAction({
        accessToken: access,
        refreshToken: refresh
      })
    );
  }, [tokenState.token.accessToken]);

  useEffect(async () => {
    const access = Cookies.get("access-token");
    if (access) {
      const uuid = Cookies.get("uuid");
      dispatch(getLoginAction());
      const data = await getProfile({
        uuid: uuid,
        accessToken: access
      });
      console.log(data);
      dispatch(getSaveProfileAction(data));
    }
  }, []);

  return (
    <>
      {/*       
      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button> */}
      {/* <PreHeader /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="help" element={<Help />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="bookingRequest/:id" element={<BookingRequest />} />
        <Route path="chat" element={<Chat />} />
        <Route path="booking-history" element={<BookingHistory />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="partner-dispute" element={<PartnerDispute />} />
        <Route path="support" element={<SupportAdmin />} />
        <Route path="policy" element={<CancellationPolicy />} />
        <Route path="equipment-report/:id" element={<EquipmentReport />} />
        <Route path="feedback" element={<Feedback />} />
        <Route
          path="*"
          element={
            <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
              <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div class="relative">
                  <div class="absolute">
                    <div class="">
                      <h1 class="my-2 text-gray-800 font-bold text-2xl">
                        Looks like you've found the doorway to the great nothing
                      </h1>
                      <p class="my-2 text-gray-800">
                        Sorry about that! Please visit our hompage to get where
                        you need to go.
                      </p>
                      <button
                        type="button"
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Take me there!
                      </button>
                    </div>
                  </div>
                  <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                  </div>
                </div>
              </div>
              <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
              </div>
            </div>
          }
        />
      </Routes>

      <Footer />
      <SupportEngine />
    </>
  );
}

export default App;
