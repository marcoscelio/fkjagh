import * as Yup from "yup";

export const accountSettingsSchema = Yup.object().shape({
  id: Yup.string().required("User ID is required"),
  email: Yup.string().email().required("Email is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
  bitcoin: Yup.string(),
  ach: Yup.string(),
  bitcoinWalletAddress: Yup.string().when("paymentMethod", {
    is: "bitcoin",
    then: () =>
      Yup.string().required("Bitcoin wallet address is required"),
  }),
  achRouting: Yup.string().when("paymentMethod", {
    is: "ach",
    then: () => Yup.string().required("Routing number is required"),
  }),
  achAccountName: Yup.string().when("paymentMethod", {
    is: "ach",
    then: () => Yup.string().required("ACH account name is required"),
  }),

  achAccountNumber: Yup.string().when("paymentMethod", {
    is: "ach",
    then: () => Yup.string().required("Account number is required"),
  }),
  achAccountType: Yup.string().when("paymentMethod", {
    is: "ach",
    then: () => Yup.string().required("Account type is required"),
  }),
});
