import styles from "../styles/Layout.module.scss";

export function Layout(props) {
  return (
    <div>
      <nav className={styles.nav}>
        <h1>BrewerGo</h1>
      </nav>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
}
