import Link from "next/link"
import React from 'react'
import Newsletter from "./newsletter";

export default function Footer({ siteSettings }) {
  const data = {
    list_02: [
      {
        id: 1,
        text: "Company",
        link: "/company",
      },
      {
        id: 2,
        text: "Portfolio",
        link: "/portfolio",
      },
      {
        id: 3,
        text: "Our Platforms",
        link: "/platforms",
      },
      {
        id: 9,
        text: "Contact Us",
        link: "/contact",
      },
      {
        id: 4,
        text: "Investor Login",
        link: siteSettings?.invester_login ? siteSettings?.invester_login : '',
        target:"_blank"
      },
    ],
    list_03: [
      {
        id: 5,
        text: siteSettings?.site_email,
        link: "mailto:" + siteSettings?.site_email,
      },
      {
        id: 6,
        text: siteSettings?.site_phone,
        link: "tel:" + siteSettings?.site_phone,
      }
    ],

  }
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer>
      <div className="contain">
        <div className="flex_row main_row row">
          <div className="col-xl-3">
            <div className="in_col">
              <p>At HudsonPoint Group, we operate through specialized platforms, each dedicated to delivering optimal results for our tenants, investors, and partners.</p>
              <div className="social_logon">
                <p>Follow Us | </p>
                {
                  siteSettings?.site_facebook ?
                    <Link href={siteSettings?.site_facebook} target="_blank" rel="noreferrer">
                      <img src="/images/facebook.svg" alt={siteSettings?.site_facebook} />
                    </Link>
                    :
                    ""
                }
                {
                  siteSettings?.site_instagram ?
                    <Link href={siteSettings?.site_instagram} target="_blank" rel="noreferrer">
                      <img src="/images/instagram.svg" alt={siteSettings?.site_instagram} />
                    </Link>
                    :
                    ""
                }
                {
                  siteSettings?.site_linkedin ?
                    <Link href={siteSettings?.site_linkedin} target="_blank" rel="noreferrer">
                      <img src="/images/linkedin.svg" alt={siteSettings?.site_linkedin} />
                    </Link>
                    :
                    ""
                }
              </div>
            </div>
          </div>
          <div className="col-lg mid_col">
            <div className="in_col">
              <h4>
                Quick Links
              </h4>
              <ul className="list">
                {data.list_02.map((val) => {
                  return (
                    <li key={val.id}>
                      <Link href={val.link} target={val?.target ? "_blank" : ""}>{val.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="in_col">
              <h4>
                Other Information
              </h4>
              <ul className="list">
                {data.list_03.map((val) => {
                  if (val.link && val.text) {
                    return (
                      <li key={val.id}>
                        <Link href={val.link}>{val.text}</Link>
                      </li>
                    );
                  }

                })}
                {
                  siteSettings?.site_address ?
                    <li>
                      <p>{siteSettings?.site_address}</p>
                    </li>
                    :
                    ""
                }
              </ul>
            </div>
          </div>
          <div className="col-xl-4">
            <Newsletter />
          </div>
        </div>

        <div className="copyright">
          <p className="text-center">
            © Copyright {year}, {siteSettings?.site_copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}