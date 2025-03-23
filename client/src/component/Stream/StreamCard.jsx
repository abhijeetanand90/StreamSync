import { useState } from "react";
import styles from "./StreamCard.module.css";
useState;

export default function StreamCard() {
  const [isLive, setIsLive] = useState(true);
  return (
    <div className={styles.main}>
        <div className={styles.thumbnailContainer}>
        <img
        src="https://picsum.photos/400/225"
        alt=""
        className={styles.thumbnail}
      />
      {isLive && <img src="/live.png" alt="" className={styles.liveImg} />}
        </div>


      <div className={styles.subsection}>
        <h3 className={styles.title}>Stream Title</h3>
        <div className={styles.subheadings}>
          <p className={styles.name}>Channel Name</p>
          <p className={styles.view}>Viewers</p>
        </div>
      </div>
    </div>
  );
}
