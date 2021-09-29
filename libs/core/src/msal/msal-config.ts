// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY

export const MSAL_CONFIG: any = {
  local: {
    clientId: '59b730da-491a-4138-b684-644d07adf635',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://localhost:7000/scs/symphony/home',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/8a2511d8-6df0-4193-9c58-50f16370d8f4/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
  sapdev: {
    clientId: '9e5bc024-fe09-43ee-87da-c072441685b0',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://scs.ups.com/scs',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/d2daf4e1-f99e-4259-bad5-d1e6211cfdf9/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
  upsdev: {
    clientId: '9e5bc024-fe09-43ee-87da-c072441685b0',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://scsappsdev.ups.com/scs',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/d2daf4e1-f99e-4259-bad5-d1e6211cfdf9/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
  qa: {
    clientId: '59b730da-491a-4138-b684-644d07adf635',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://scsappsqa.ups.com/scs',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/8a2511d8-6df0-4193-9c58-50f16370d8f4/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
  uat: {
    clientId: '59b730da-491a-4138-b684-644d07adf635',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://scsappsuat.ups.com/scs',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/8a2511d8-6df0-4193-9c58-50f16370d8f4/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
  prod: {
    clientId: 'f35a64a4-418d-47c4-9aff-7a742a9b6bec',
    tenantId: 'f9032f1f-2bf6-46bc-a40d-58d6de0dd29a',
    redirectUri: 'https://scsapps.ups.com/scs',
    resourceScopes: [
      'https://upsB2C.onmicrosoft.com/a8372d7a-34f1-48cd-85d6-269fe6eef269/API_Access',
    ],
    authorityUrl:
      'https://upsb2c.b2clogin.com/upsb2c.onmicrosoft.com/B2C_1_Symphony_SignIn',
    authorityDomain: ['upsb2c.b2clogin.com'],
    prompt: 'login',
    landingPageFeatureFlag: true,
  },
};

export const environments: Map<string, string> = new Map<string, string>([
  ['localhost', 'local'],
  ['scsappsdev', 'upsdev'],
  ['scsappsqa', 'qa'],
  ['scsappsuat', 'uat'],
  ['scs', 'sapdev'],
  ['scsapps', 'prod'],
]);
