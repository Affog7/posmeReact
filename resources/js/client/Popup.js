import React from "react";
// Basic
// import CookieConsent from "react-cookie-consent";

// Option
import CookieConsent, { Cookies,  } from "react-cookie-consent";

const Popup = () => { 
  return (
    <div className="popup">
      {/* Basic */}
      {/* <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent> */}

      {/* option */}
      <CookieConsent
        disableStyles
        location="none" declineButtonText = "Refuse"
        buttonText="Accepte"
        cookieName="__stripe_mid"
        overlay
        overlayClasses="overlayclass"
        // style={{ background: "#2B373B" }}
        // buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        // expires={150}
      >
bkjdgsbggkbgdkfndg d vvhjn gd, sgrkvn v, gf jkfn,fv gsjfsk fg
  fslkf l
  f ùf jf df
  x fbd kgnmgh
   hg dgh fgù
    gf  ;, nj hiu <br/> ichgezveibnrbiugf hs, rtbrsigh fgrgdkffn fgbbnf sn
    gf  ;, nj hiu <br/> ichgezveibnrbiugf hs, rtbrsigh fgrgdkffn fgbbnf sn
    gf  ;, nj hiu <br/> ichgezveibnrbiugf hs, rtbrsigh fgrgdkffn fgbbnf sn

        <br></br> <button>Einstellung</button>
      </CookieConsent>
    </div>
  );
};

export default Popup;
