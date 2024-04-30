import styles from "./Layout.module.css"

function Layout({children}) {
  return (
    <>
        <header className={styles.header}>
            <h1>Crypto App</h1>
            <p>
                <a href="https://github.com/MahdiKgz" target="_blank">MahdiKgz</a> |
                React App
            </p>
        </header>
        {children}
        <footer className={styles.footer}>
            <p>
                Developed By MahdiKgz with sincere
            </p>
        </footer>
    </>
  )
}

export default Layout