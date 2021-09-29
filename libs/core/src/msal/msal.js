// msal-browser is an undefined module type so application breaks. msal-angular expects msal object for msal-browser
// To get it to work, we need to assign msal to @azure/msal-browser
globalThis['@azure/msal-browser'] = msal;
