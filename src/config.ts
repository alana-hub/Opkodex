export const APP_CONFIG = {
  companyName: "Opkodex LTD",
  productName: "SmartCare Rwanda",
  phone: "+250 788 342 020",
  tin: "156712643",
  location: "Rubavu / Gisenyi, Western Province, Rwanda",

  // Keep true while this is a frontend-only prototype.
  // Set to false only after a secure production API is available.
  demoMode: true,

  registrationEndpoint: "/api/registrations"
} as const;
