import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { displayModal } from "../../../Slices/modalSlice";
import { handleSubreddit } from "../../../Utils/api";
import { getInfo, isLoggedIn as isLoggedInApi } from "../../../Utils/api";
// import Form from "../Twitter/Form";
import DownloadButton from "../../Profile/DownloadButton";
import ReactMarkdown from "react-markdown";
import Form2 from "./Form";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../../Utils/options";
import PageLoader from "../../../components/PageLoader";

function Reddit() {
  const dispatch = useDispatch();
  const {
    mutate,
    data: article,
    isPending,
  } = useMutation({
    mutationFn: handleSubreddit,
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
  const { data: isLoggedIn, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: isLoggedInApi,
    refetchInterval: undefined,
  });

  const { data: userInfo, isLoading: isInfoPending } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getInfo,
  });

  function handleSubmission(formData) {
    if (!isLoggedIn) {
      dispatch(displayModal());
      return;
    } else {
      mutate(formData);
    }
  }
  if (isLoading || isInfoPending) {
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
        className="mt-8 mb-16 h-auto bg-[#100841] m-auto  rounded-4xl flex flex-wrap alink"
        style={{ boxShadow: "0px 0px 1px #fff" }}
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once={true}
      >
        <Form2
          handleSubmission={handleSubmission}
          isMutating={isPending}
          subscriptionTier={subscriptionTier}
        />
        <div className="lg:w-3/5 w-full lg:pr-8 px-2 flex items-center">
          {article && exportsEnabled && (
            <div className="absolute inline-block right-11 bg-purple-900/80 rounded-3xl top-8 z-1">
              <DownloadButton article={article} />
            </div>
          )}
          <div className="resize-none relative bg-[var(--secondary-color)] rounded-2xl w-full my-6 outline-none p-6 overflow-y-scroll modal-scroll lg:h-[700px] h-[550px]">
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

export default Reddit;
