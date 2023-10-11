import "./Footer.css";
import etherscan from "./IMG/etherscan.png";
import github from "./IMG/github.png";
import medium from "./IMG/medium.png";
import twitter from "./IMG/twitter.png";

function Footer() {
  return (
    <div className="footer">
      <img
        className="socialIcon"
        width="30"
        height="30"
        src={medium}
        alt="mediumLogo"
        onClick={() => window.open("https://medium.com/")}
      />
      <img
        className="socialIcon"
        width="30"
        height="30"
        src={twitter}
        alt="twitterLogo"
        onClick={() => window.open("https://twitter.com/home")}
      />
      <img
        className="socialIcon"
        width="30"
        height="30"
        src={github}
        alt="githubLogo"
        onClick={() => window.open("https://github.com/")}
      />
      <img
        className="socialIcon"
        width="30"
        height="30"
        src={etherscan}
        alt="etherscanLogo"
        onClick={() =>
          window.open(
            "https://goerli.etherscan.io/address/0xc369a6e45742e8691a8635cfd62ad11a4366f76c"
          )
        }
      />
    </div>
  );
}

export default Footer;
