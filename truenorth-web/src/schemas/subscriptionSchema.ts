import * as Yup from "yup";

export const subscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  cardNumber: Yup.string().required("Card number is required"),
  expiry: Yup.string().required("Expire date is required"),
  securityCode: Yup.string().required("Security code is required"),
  billingAddress: Yup.string().required("Billing address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal code is required"),
  inviteCode: Yup.string(),
  termsAndAgreements: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and agreements"
  ),
});
