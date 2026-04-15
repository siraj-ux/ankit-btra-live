const GOOGLE_SHEET_URLS = [
  "https://script.google.com/macros/s/AKfycbyNqQghsxa10pLaJKRryPO0fs0-02M4diS9pJ2RwZVisD0KeN5q97BZehzijb1LBKLlRQ/exec",
  "https://script.google.com/macros/s/AKfycbxvwM7-yIPpgIW-7gdWBuLMEEcDvHq-Xz3piCgolOUkY1TfEPH9oneyOrnxmCpyC38v/exec"
];

export const useGoogleSheet = () => {
  const sendToGoogleSheet = async (payload: any) => {
    try {
      // ✅ Convert payload → form data
      const body = new URLSearchParams();

      Object.keys(payload).forEach((key) => {
        body.append(key, payload[key] ?? "");
      });

      // ✅ Send to both sheets
      await Promise.all(
        GOOGLE_SHEET_URLS.map((url) =>
          fetch(url, {
            method: "POST",
            mode: "no-cors",
            body,
          })
        )
      );

    } catch (error) {
      console.error("Google Sheet Error:", error);
    }
  };

  return { sendToGoogleSheet };
};