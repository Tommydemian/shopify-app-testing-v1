import { ClientOnly } from "remix-utils/client-only";

export default function Component() {
  return (
    <ClientOnly fallback={<SimplerStaticVersion />}>
      {() => <ComplexComponentNeedingBrowserEnvironment />}
    </ClientOnly>
  );
}
