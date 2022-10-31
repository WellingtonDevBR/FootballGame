import styles from './Footer.module.css';
import logo from '../../assets/footer.svg';
export function Footer() {
    return (
        <footer className={styles.footerLogo}>
            <img src={logo} alt="logo" />
        </footer>
    )
}