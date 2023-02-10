import * as yup from "yup";

const regex = {
  name: /^[a-z ,.'-]+$/i,
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
};

const userFormValidationSchema = yup.object({
  name: yup
    .string()
    .matches(regex.name, {
      message: "Invalid name. Please enter a valid name.",
    })
    .required("Name can not be empty."),
  email: yup
    .string()
    .matches(regex.email, {
      message: "Invalid email. Please enter a valid email.",
    })
    .required("Email can not be empty."),
  phone: yup
    .string()
    .matches(regex.phone, {
      message: "Invalid phone number. Please, enter a valid phone number. ",
    })
    .required("Phone number can not be empty."),
  address: yup.string(),
  company: yup.string(),
});

const initialFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
};

export { userFormValidationSchema, initialFormValues };
