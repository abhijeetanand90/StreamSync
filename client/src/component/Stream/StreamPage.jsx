import styles from "./StreamPage.module.css";
import Webcam from "react-webcam"

export default function StreamPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.channelLayout}>
           <h3>Channel Name</h3>
           {/* <Webcam
           height={600}
           width={1000}
            />  */}
            </div>

        <div className={styles.activity}>
            <h3>Activity Feed</h3>
            <ul>
                <li>alex_gaming followed you</li>
                <li>viewer123 donated $5.00</li>
                <li>sarah_fan subscribed</li>
            </ul>

        </div>
        <div  className={styles.chat}>
           <h3>Stream Chat</h3> 
           <ul>
            <li>ModeratorName: Welcome everyone to the stream!</li>
            <li>viewer123: PogChamp great gameplay!</li>
            <li>pro_gamer: Your strategy is amazing</li>
           </ul>
             <input type="text" />
            </div>
      </div>
    </>
  );
}
