import styles from "./PageLoader.module.css";

function PageLoader() {
  return (
    <div className=" h-screen flex w-full bg-transparent justify-center items-center">
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default PageLoader;
