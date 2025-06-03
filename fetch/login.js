import axios from "axios";

export async function verifyUser(username) {
  try {
    const data = await axios(
      `https://academia.srmist.edu.in/accounts/p/40-10002227248/signin/v2/lookup/${username}`,
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
        body: "mode=primary&cli_time=1748679238492&servicename=ZohoCreator&service_language=en&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin",
        method: "POST",
      }
    );
    const response = data.data;
    return {
      identity: response.lookup?.identifier,
      statusCode: response.status_code,
      message: response.message,
      digest: response.lookup?.digest,
    };
  } catch (error) {
    console.error("Error verifying user:", error);
    return { error: "Failed to verify user" };
  }
}

export async function verifyPassword(digest, identifier, password) {
  try {
    const data = await fetch(
      `https://academia.srmist.edu.in/accounts/p/40-10002227248/signin/v2/primary/${identifier}/password?digest=${digest}&cli_time=${Date.now()}&servicename=ZohoCreator&service_language=en&serviceurl=https%3A%2F%2Facademia.srmist.edu.in%2Fportal%2Facademia-academic-services%2FredirectFromLogin`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
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

    const response = await data.json();

    if (response.status_code === 201) {
      const cookies = await data.headers
        .getSetCookie()
        .filter((cookie) => !cookie.includes("Max-Age=0"))
        .join("; ");
      return {
        isAuthenticated: true,
        cookies,
      };
    }

    const captchaRequired = response.localized_message
      ?.toLowerCase()
      ?.includes("captcha")
      ? true
      : false;

    return {
      isAuthenticated: false,
      statusCode: response.status_code,
      message: response.localized_message,
      captcha: captchaRequired
        ? { required: true, digest: response.cdigest }
        : { required: false, digest: null },
    };
  } catch (error) {
    console.error("Error verifying password:", error);
    return { error: "Failed to verify password" };
  }
}

export async function verifyCaptcha(c) {
  const { digest } = await c.req.json();
  try {
    const data = await fetch(
      `https://academia.srmist.edu.in/accounts/p/40-10002227248/webclient/v1/captcha/${digest}?darkmode=false`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          cookie:
            "SESSION_COOKIES_PLACEHOLDER",
        },
        body: null,
        method: "GET",
      }
    );
    const response = await data.json();
    let image = response.captcha.image_bytes;
    return c.json({
      image: image !== null ? image : null,
    });
  } catch (error) {
    console.error("Error verifying captcha:", error);
    return c.json({ error: "Failed to verify captcha" }, 500);
  }
}
