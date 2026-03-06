import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}