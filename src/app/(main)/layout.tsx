import Header from "../components/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import ReduxProvider from './../components/ReduxProvider';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
        <ReduxProvider>
          <Header />
          {children}
        </ReduxProvider>
      </ProtectedRoute>
    </>
  );
}
