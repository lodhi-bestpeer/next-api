import Header from "./user/common/Header";
import Footer from "./user/common/Footer";
import "./user/style/global.css";
import { Providers } from "./redux/provider";
import Protected from "./protected";

export default async function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body>
        <Providers>
          <Protected>
            <Header />
            {children}
            <Footer />
          </Protected>
        </Providers>
      </body>
    </html>
  );
}
