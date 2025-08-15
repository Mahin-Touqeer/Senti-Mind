import { useMutation, useQuery } from "@tanstack/react-query";
import Form from "./Form";
import {
  getInfo,
  handleTwitter,
  isLoggedIn as isLoggedInApi,
} from "../../../Utils/api";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { displayModal } from "../../../Slices/modalSlice";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../../Utils/options";
import PageLoader from "../../../components/PageLoader";
import { useState } from "react";
import DownloadButton from "../../Profile/DownloadButton";
function Box() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();
  const { data: isLoggedIn, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedInApi,
    refetchInterval: undefined,
  });

  const { data: userInfo, isLoading: isInfoPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getInfo,
  });

  const {
    mutate,
    data: article,
    isPending,
  } = useMutation({
    mutationFn: handleTwitter,
    onSuccess: () => {
      toast.success("Article generated succesfully", {
        ...toastOptions,
        style: {
          backgroundColor: "#1e5c39", // any color you like
        },
        autoClose: 750,
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message, {
        ...toastOptions,
        style: {
          backgroundColor: "#fff",
          color: "#212121", // any color you like
        },
        autoClose: 750,
      });
    },
  });

  function handleSubmission(formData) {
    if (!isLoggedIn) {
      dispatch(displayModal());
      return;
    } else {
      mutate(formData);
    }
  }

  if (isLoading || (isLoggedIn !== false && isInfoPending)) {
    return <PageLoader />;
  }
  let subscriptionTier = "free";
  let exportsEnabled = false;
  if (userInfo) {
    subscriptionTier = userInfo.subscription.subscriptionTier;
    exportsEnabled = subscriptionTier !== "free";
  }

  return (
    <>
      <div
        className="mt-8 mb-16 h-auto bg-[#100841] m-auto  rounded-4xl flex flex-wrap"
        style={{ boxShadow: "0px 0px 1px #fff" }}
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once={true}
      >
        <Form
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleSubmission={handleSubmission}
          isMutating={isPending}
          subscriptionTier={subscriptionTier}
        />
        <div className="lg:w-3/5 w-full lg:pr-8 px-2 flex">
          {/* {article && exportsEnabled && (
            <div className="absolute inline-block right-11 bg-purple-900/80 rounded-3xl top-8 z-1">
              <DownloadButton article={article} />
            </div>
          )} */}
          <div
            className={`resize-none relative bg-[var(--secondary-color)] rounded-2xl w-full my-6 outline-none p-6 overflow-y-scroll modal-scroll h-[650px] ${
              showDatePicker ? "lg:h-[1188px]" : "lg:h-[797.6px]"
            }`}
          >
            <ReactMarkdown>{article}</ReactMarkdown>
            {isPending ? (
              <>
                <div className="loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-25/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  Analyzing...
                  <br />
                  This may take a few minutes
                </div>
              </>
            ) : !article ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                Your article/report will appear here
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Box;
