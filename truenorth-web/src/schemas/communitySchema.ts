import * as Yup from "yup";

export const prizePoolSchema = Yup.object().shape({
  id: Yup.string(),
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  iconType: Yup.string().required("Icon type is required"),
  image: Yup.string().when("iconType", {
    is: "image",
    then: () => Yup.string().required("Image is required"),
  }),
  emoji: Yup.string().when("iconType", {
    is: "emoji",
    then: () => Yup.string().required("Emoji is required"),
  }),
  drawingDate: Yup.date().optional(),
  numberOfWinnersDrawnFrequency: Yup.string().optional(),
  numberOfWinnersDrawn: Yup.number().optional(),
});

export const communityItemSchema = Yup.object().shape({
  id: Yup.string(),
  description: Yup.string(),
  iconType: Yup.string().required("Icon type is required"),
  image: Yup.string().when("iconType", {
    is: "image",
    then: () => Yup.string().required("Image is required"),
  }),
  emoji: Yup.string().when("iconType", {
    is: "emoji",
    then: () => Yup.string().required("Emoji is required"),
  })
});

export const questionAndAnswerSchema = Yup.object().shape({
  id: Yup.string(),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

export const communitySchema = Yup.object().shape({
  userId: Yup.string().required("User is required"),
  title: Yup.string().required("Title is required"),
  shortDescription: Yup.string(),
  longerDescription: Yup.string(),
  featuredImage: Yup.string().required("Featured image is required"),
  monthlySubscriptionAmount: Yup.number()
    .required("Monthly subscription amount is required")
    .positive("Monthly subscription amount must be a positive number"),
  website: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  telegram: Yup.string(),
  onlyfans: Yup.string(),
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
  agent: Yup.string().required("Agent field is required"),
  termsAndAgreements: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and agreements"
  ),
  prizePools: Yup.array().of(prizePoolSchema),
  questionsAndAnswers: Yup.array().of(questionAndAnswerSchema),
});
