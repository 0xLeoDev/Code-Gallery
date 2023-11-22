import "./Footer.css";
import github from "./IMG/github.png";
import youtube from "./IMG/youtube.png";
import twitter from "./IMG/twitter.png";
import mail from "./IMG/mail.png";
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from "notistack";

function Footer() {
  const copyMailToClipboard = () => {
    navigator.clipboard.writeText("0xleodev@gmail.com");
    enqueueSnackbar("The mail has been copied to the clipboard.");
  };

  return (
    <>
      <SnackbarProvider
        action={(snackbarId) => (
          <button
            className="SnackbarProviderButton"
            onClick={() => closeSnackbar(snackbarId)}
          >
            ✖
          </button>
        )}
      />{" "}
      <div className="footer">
        <img
          className="socialIcon"
          width="30"
          height="30"
          src={github}
          alt="githubLogo"
          onClick={() => window.open("https://github.com/0xLeoDev")}
        />
        <img
          className="socialIcon"
          width="30"
          height="30"
          src={youtube}
          alt="youtubeLogo"
          onClick={() => window.open("https://www.youtube.com/@0xleodev")}
        />
        <img
          className="socialIcon"
          width="30"
          height="30"
          src={twitter}
          alt="twitterLogo"
          onClick={() => window.open("https://twitter.com/leoleonarrd")}
        />
        <img
          className="socialIcon"
          width="30"
          height="30"
          src={mail}
          alt="mailLogo"
          onClick={copyMailToClipboard}
        />
      </div>
    </>
  );
}

export default Footer;
