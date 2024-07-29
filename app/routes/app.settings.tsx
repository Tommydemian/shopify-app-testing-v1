import {
  FormLayout,
  TextField,
  Page,
  Card,
  Button,
  Banner,
} from "@shopify/polaris";
import {
  Form,
  useActionData,
  useSubmit,
  useNavigation,
} from "@remix-run/react";
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
  const navigation = useNavigation();
  const remixSubmit = useSubmit();
  // form hook
  const { fields, submitting, submit } = useForm({
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
      console.log("Client-side validation passed", fieldValues);
      // Submit to Remix action if client-side validation passes
      remixSubmit(fieldValues, { method: "post" });
      return { status: "success" };
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await submit();
    if (result.status === "fail") {
      console.log("Form has errors, not submitting");
    }
  };

  return (
    <Page narrowWidth>
      <Card>
        {actionData?.success && (
          <Banner title="Success">Form submitted successfully!</Banner>
        )}
        <Form method="POST" onSubmit={handleSubmit}>
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
              disabled={submitting || navigation.state === "submitting"}
              loading={navigation.state === "submitting"}
              submit={true}
              variant="primary"
            >
              {navigation.state === "submitting" ? "Submitting..." : "Submit"}
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
