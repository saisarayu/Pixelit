/**
 * Helper to format application details and launch WhatsApp chat
 */
export function sendApplicationToWhatsApp(phoneNumber, title, fields) {
  if (!phoneNumber) {
    console.warn('WhatsApp number not set yet.');
    return;
  }

  // Remove non-numeric characters
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');

  let text = `🚀 *PIXELIT APPLICATION SUBMISSION*\n`;
  text += `📌 *Type*: ${title}\n\n`;

  Object.entries(fields).forEach(([key, val]) => {
    if (val) {
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
      text += `• *${formattedKey}*: ${val}\n`;
    }
  });

  text += `\n📅 *Time*: ${new Date().toLocaleString()}\n`;
  text += `\n_Submitted via PixelIT Web App_`;

  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  // Open WhatsApp in a new window/tab
  window.open(whatsappUrl, '_blank');
}
