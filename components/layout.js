import SiteMaster from "./sitemaster";
import Header from "./header";
import Footer from "./footer";
export default function Layout({ children,siteSettings }) {
  return (
    <div className="content">
      <SiteMaster siteSettings={siteSettings} />
      <Header siteSettings={siteSettings} />
      {children}
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
