import classes from "../css/Footer.module.css";
import instagram from "../assets/instagram.svg";
import whatsapp from "../assets/whatsapp.svg";
import youtube from "../assets/youtube.svg";
import x from "../assets/x.svg";
import linkedin from "../assets/linkedin.svg";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <h1 className={classes.footerLeft}>Logo</h1>
      <ul className={classes.footerRight}>
        <li>
          <img src={instagram} className={classes.footerRightItems} />
        </li>
        <li>
          <img src={whatsapp} className={classes.footerRightItems} />
        </li>
        <li>
          <img src={x} className={classes.footerRightItems} />
        </li>
        <li>
          <img src={youtube} className={classes.footerRightItems} />
        </li>
        <li>
          <img src={linkedin} className={classes.footerRightItems} />
        </li>
      </ul>
    </div>
  );
}
