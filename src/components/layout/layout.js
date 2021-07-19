import React from 'react';
import styles from './layout.module.scss';

const Layout = props => {
  return (
    <div className={styles.layout}>
      <div className="container">
        <main className={styles.main}>
          { props.children }
        </main>
      </div>
    </div>
  )
}

export default Layout