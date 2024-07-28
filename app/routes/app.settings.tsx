import { FormLayout, TextField, Page, Card, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { Form, useActionData } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useForm, useField, notEmpty } from "@shopify/react-form";

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  let values = Object.fromEntries(formData);
  console.log(values);
  return json(values);
}

export default function SettignsForm() {
  const actionData = useActionData<typeof action>();
  // form hook
  const { fields, submitting } = useForm({
    fields: {
      storeName: useField({
        value: "",
        validates: [
          notEmpty("Store name is required"),
          (value) => {
            if (value.length < 3)
              return "Store name must be at least 3 characters";
          },
        ],
      }),
      email: useField({
        value: "",
        validates: [
          notEmpty("Email is required"),
          (value) => {
            if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
          },
        ],
      }),
    },
    onSubmit: async (fieldValues) => {
      return { status: "success" };
    },
  });

  // const [storeName, setStoreName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [errorMessage, setErrorMessage] = useState<string>("");

  // const handleChange = useCallback(
  //   (setter: React.Dispatch<React.SetStateAction<string>>) => {
  //     return (value: string) => {
  //       setter(value);
  //     };
  //   },
  //   [],
  // );

  return (
    <Page narrowWidth>
      <Card>
        <Form method="POST">
          <FormLayout>
            <TextField
              {...fields.storeName}
              type="text"
              id="store-name"
              name="store-name"
              helpText="Enter your store's display name. This will be visible to your customers."
              label="Store name"
              autoComplete="fill"
              clearButton
              onClearButtonClick={() => fields.storeName.onChange("")}
            />
            <TextField
              {...fields.email}
              type="email"
              id="email"
              name="email"
              label="Account email"
              autoComplete="email"
            />
            <Button
              textAlign="center"
              disabled={submitting}
              submit={true}
              variant="primary"
            >
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Card>
      {actionData && <pre>{JSON.stringify(actionData, null, 2)}</pre>}
    </Page>
  );
}
