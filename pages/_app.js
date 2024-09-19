import 'bootstrap/dist/css/bootstrap.css'
import '../styles/custom.scss'
import Layout from '../components/layout'
import http from '../helpers/http';
import { doObjToFormData } from '../helpers/helpers';
import { Toaster } from 'react-hot-toast';
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps, siteSettings }) {
  // return <Component {...pageProps} />
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <>
        <Toaster position='bottom-right' />
        <NextNProgress color="#97A9B7" />
        <Layout siteSettings={siteSettings}>{page}</Layout>
      </>;
    };

  return renderWithLayout(<Component {...pageProps} />);
}
App.getInitialProps = async ({ ctx }) => {

  const siteSettings = await http
    .post("site-settings", doObjToFormData({ token: "" }))
    .then((response) => response?.data?.site_settings)
    .catch((error) => error);
  return { siteSettings };
};