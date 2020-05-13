export const ErrorCodes = {
  "NET-100": "HTTP Method is not allowed",
  "NET-101": "Invalid JSON data in request body",
  "NET-102": "Invalid/Missing API Method in request body",
  "NET-103": "Invalid/Missing ApiKey in request body",
  "NET-104": "You are not authorized to access this resource",

  "SYS-100": "Internal Server Error",
  "SYS-101": "Validating provided ApiKey failed",
  "SYS-102": "Removing provided ApiKey failed",
  "SYS-103": "Generating ApiKey failed",

  "KER-100": "Invalid/Missing DomainName in request body",
  "KER-101": "Invalid/Missing TenantId in request body",
  "KER-102": "Invalid/Missing CountryId in request body",
  "KER-103": "Invalid/Missing Username/Password in request body",
  "KER-104": "Provided credentials does not belong to provided tenant",
}
