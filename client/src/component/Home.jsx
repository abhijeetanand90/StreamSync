import React from 'react'
import styles from './Home.module.css'
import FeaturedStream from './Stream/FeaturedStream'
export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to StreamSync</h1>
        <p className={styles.mainPara}>Watch your favorite streamers, discover new content, and connect with a community of passionate viewers.</p>
        <div className={styles.mainButton}>
          <button className={styles.Browse}>Browse Streams</button>
          <button className={styles.Start}>Start Streaming</button>
        </div>
      </div>
      <div className={styles.Hero}>
        <h2 style={
          {color:'#fff'}
        }>Featured Stream</h2>
        <FeaturedStream />
      </div>
     
    </div>
  )
}
