import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "./Slices/modalSlice";
import { Modal } from "@mui/material";
import { lazy, Suspense } from "react";

import Reddit from "./Pages/Products/Reddit/Reddit";
import Twitter from "./Pages/Products/Twitter/Twitter";

const Products = lazy(() => import("./Pages/Products/Products"));
const Home = lazy(() => import("./Pages/Home/Home"));
const PricingPage = lazy(() => import("./Pages/Pricing/PricingPage"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const Billing = lazy(() => import("./Pages/Billing/Billing"));

import Signup from "./Pages/Auth/Signup";
import LoginComponent from "./Pages/Auth/Login";
import PageLoader from "./components/PageLoader";
import PrivacyPolicy from "./Pages/Docs/PrivacyPolicy";
import TermsOfService from "./Pages/Docs/TermsOfService";

function App() {
  const { isModalOpen, authState } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/analyze" element={<Products />}>
              <Route index element={<Navigate replace to="twitter" />} />
              <Route path="twitter" element={<Twitter />} />
              <Route path="reddit" element={<Reddit />} />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {authState ? (
          <Modal open={isModalOpen} onClose={() => dispatch(hideModal())}>
            <Signup />
          </Modal>
        ) : (
          <Modal open={isModalOpen} onClose={() => dispatch(hideModal())}>
            <LoginComponent />
          </Modal>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
