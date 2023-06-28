import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: 'lang-sys',
    clientEmail: 'firebase-adminsdk-a3fz8@lang-sys.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJc2dot08SR/xf\nLMtoN2IwG/HTCBHm97GfT3lA+TTdiY2BZAvlmMQUe0qMFGto2YPGhXUWS1/rPUsI\nxpy1OPShPV5nR0w+ocWuc0IEjVSf6jlDLG/jEDQubpGV4vqdJ9G1khGsLDe9GdVy\nAhitqzzNORADh7qMtzKxT4MkSgdFJ8wIkpczZ6R4tynIxe5ouh3ZAMVgSdzQsU6i\nsTw6vyQ9s4MOTHPaNbJT+ca44b3mCoRgrHjMRdIgei1OM8BOvljdmAfoxF7k361w\nudRBttWLRP9kFeoRN/vc9vm8MOemWDIHfNNfaJ2KWyYEdvhsvq2/7dTbAiX3G6AO\nh/BtBvNRAgMBAAECggEAKFYpvg96TzRHxbzf67mvOOfXh4RlpUQydi5BHq/nlHZe\n9aoVMb9hf6JiPmM2UJPBLYZ6d+DWz3EB7btrFGRXo1N47CAcFaxpuzEL5oJwD+cj\n2R30N1h+wk9Ualk9Ciu3c25QiJOAA6bBFOdzjo6riYIkATjzswpZpaRAo4sJIqDm\npW9vWLS6hyL6uwaqzxkeevH1JqcvCwfX8R2MnX9NU4suLcoo2133oMrz17w5mS++\nf/y0kLd3+WcxBcsSH0pSnuFYdenqthI74WROv5xcG5fcNymUtVwawLL9yxHeNaIp\nbIgwiuRRjiOI+G359klAHmUlUMKRUme4YPPmhc2VmwKBgQD1LSP2DP4i310OBYrE\n+KJbpopTONRM//LaTU4cpYwuKXMPtU/+Q/PMGw9bL2ysssjKmuQHiCV39CeQ5UME\nwm+huCwi20vy3kkH99pjO0QDoYS1qCR0Z81nsRNmiZNdfs409DTnPGBKvDjonLHA\nbWrbl8CnyhaacEk+vMafCKWv/wKBgQDSWBl4MHKhs+6hC2AdOGrBgNlVH5S+BF2Y\nak9qUaIQwozU6Ps8uB4o7S6l+I6HbF7yG8q20zrrR5ohaMXQy6cPsPJeqdVPJMdm\nJSsDvYOS0FeKffp+m4opK9heFa5hOcMvsi9emet9r4hu0i4vrACoe+bViIxhjgAG\nQpnzR3xcrwKBgQC43+MABGgVz6wRiKhNQtbamUgw3OdpcI6lgilmfIapwGOc8rFx\nH7hUrgr0TVx7FQ1HiWhtLYJjY136aoYQrrUSkxfk6MvqRSd4tLKepO/ydPbnK/Th\nOeyvRd1FMnRGyfmgAI1r2CEb+bZH4PBAE8HB+Dozy7Ujm4v/nMWA4jpd7QKBgFpx\nHQprsm5K4pkGPh5ySpzHHSuXt6n4UJIfa+QoE4onTMyjHJugAv/P89XTSN17wFtT\njdcMffH6SJCC70N2vW9mwt/nIFu2UbJe2t7x1qgCwxE+V72mfUJ0osTZh7AwWPei\nIvIHNpVFK2GTJ97Bk0rec4NvAgVUPDh03KMZIqTrAoGAHPTwhwVYigfumdk1Is+/\nnD5pn+TDItu527hFhatAGKUvDOLqGNEDo2oPhjTomNiQoOLIAeA9HAc5Cy7Dx42k\nHrTYQodh/k0lnUlEVivS0mDfSt4/O5GlMw2eut/+Zd35ylgsq/F9osixw5FUWgaG\nbub2APz7ZlwZa2NVEDbOrtg=\n-----END PRIVATE KEY-----\n',
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
