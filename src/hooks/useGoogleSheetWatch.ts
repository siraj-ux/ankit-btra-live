const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwyFQFUerEL2TwXkBBQUuH0bfDLWUgCXZBCuu0j9VRXL5y9FEAwIK89yTD6nblyGRXcZQ/exec";

export const useGoogleSheet = () => {
  const sendToGoogleSheet = async (payload: any) => {
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Google Sheet Error:", error);
    }
  };

  return { sendToGoogleSheet };
};