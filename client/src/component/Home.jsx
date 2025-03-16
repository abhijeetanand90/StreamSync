import React from 'react'
import styles from './Home.module.css'
export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Welcome to StreamSync</h1>
        <p className={styles.mainPara}>Watch your favorite streamers, discover new content, and connect with a community of passionate viewers.</p>
      </div>
    </div>
  )
}
