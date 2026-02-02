import ReduxProvider from "../components/ReduxProvider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-container">
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </main>
  );
}
