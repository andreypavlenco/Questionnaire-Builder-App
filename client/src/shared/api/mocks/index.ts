export async function enableMocking() {
  if (import.meta.env.PROD) {
    console.warn("Mocking is enabled in production mode, which is not recommended.");
    return;
  }
    const { worker } = await import("@/shared/api/mocks/browser");
    worker.start({ onUnhandledRequest: "bypass" });

}
