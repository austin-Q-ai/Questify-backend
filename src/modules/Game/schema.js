import * as yup from "yup";

export const fetchGameSchema = yup.object({
  body: yup.object({
    gameId: yup.string().required("The game number is required"),
  }),
});

export const gameIdSchema = yup.object({
  params: yup.object({
    gameId: yup.string().required("The game number is required"),
  }),
});
