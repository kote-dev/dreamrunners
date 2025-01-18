const QUBE_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.0xqube.xyz"
    : "https://staging-qube.vercel.app";

class QubeService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getIP() {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Failed to get IP:", error);
      return "127.0.0.1"; // Fallback
    }
  }

  async logClick(referralId, userAgent) {
    try {
      const ip = await this.getIP();
      const response = await fetch(`${QUBE_API_URL}/api/click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify({
          referral: referralId,
          ip,
          userAgent,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error("Failed to log click:", error);
      return false;
    }
  }

  async logConversion(referralId, conversionId) {
    try {
      const response = await fetch(
        `${QUBE_API_URL}/api/conversion?referral=${referralId}&conversionId=${conversionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": this.apiKey,
          },
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Failed to log conversion:", error);
      return false;
    }
  }
}

export default QubeService;
