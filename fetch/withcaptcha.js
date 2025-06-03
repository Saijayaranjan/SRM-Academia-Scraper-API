import axios from "axios";

export async function withCaptcha(
  identifier,
  digest,
  captcha,
  cdigest,
  password
) {
  try {
    const response = await fetch(
      `https://academia.srmist.edu.in/accounts/p/40-10002227248/signin/v2/primary/${identifier}/password?digest=${digest}&cli_time=${Date.now()}&servicename=ZohoCreator&service_language=en&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin&captcha=${captcha}&cdigest=${cdigest}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "sec-ch-ua":
            '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-zcsrf-token": "iamcsrcoo=CSRF_TOKEN_PLACEHOLDER",
          cookie:
            "SESSION_COOKIES_PLACEHOLDER",
          Referer:
            "https://academia.srmist.edu.in/accounts/p/10002227248/signin?hide_fp=true&servicename=ZohoCreator&service_language=en&css_url=/49910842/academia-academic-services/downloadPortalCustomCss/login&dcc=true&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `{"passwordauth":{"password":"${password}"}}`,
        method: "POST",
      }
    );

    return await response.text();
  } catch (error) {
    console.error("Error verifying password with captcha:", error);
    return { error: "Failed to verify password with captcha" };
  }
}
