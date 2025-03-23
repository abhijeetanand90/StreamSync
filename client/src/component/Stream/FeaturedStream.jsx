
import styles from "./FeaturedStream.module.css";
import StreamCard from "./StreamCard";

export default function FeaturedStream() {
 
  return (
    <div  className={styles.main}>
      <div>

      <StreamCard />
      </div>
      <div>

<StreamCard />
</div>
<div>

<StreamCard />
</div>
      
        
      
    </div>
  );
}
