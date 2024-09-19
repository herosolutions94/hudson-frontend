import React from "react";
import Link from "next/link";
import Image from "next/image";
import { doObjToFormData, cmsFileUrl } from "../helpers/helpers";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import ContactForm from "../components/contactForm";

export const getServerSideProps = async (context) => {

    const result = await http
        .post("contact", doObjToFormData({ token: "" }))
        .then((response) => response.data)
        .catch((error) => error.response.data.message);

    return { props: { result } };
};


export default function Contact({ result }) {
    const { page_title, content, site_settings, meta_desc } = result
    return (
        <>
            <MetaGenerator page_title={page_title} meta_info={meta_desc} site_settings={site_settings} />
            <main>
                <section className="cmn_banner" style={{ backgroundImage: "url(" + cmsFileUrl(content?.image1, 'images') + ")" }}>
                    <div className="contain">
                        <div className="outer">
                            <div className="cntnt">
                                <Text string={content?.banner_detail} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact_pg">
                    <div className="contain">
                        <div className="flex">
                            <div className="colL">
                                <ContactForm />
                            </div>
                            <div className="colR">
                                <div className="inner_contact">
                                    <div className="top_inner_contact">
                                        <Text string={content?.section5_detail1} />
                                        <ul>
                                            {
                                                site_settings?.site_email ?
                                                    <li>
                                                        <Link href={"mailto:" + site_settings?.site_email}>
                                                            <Image src="/images/email.svg" alt={site_settings?.site_email} width={200} height={200} />
                                                            <span>{site_settings?.site_email}</span>
                                                        </Link>
                                                    </li>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_phone ?

                                                    <li>
                                                        <Link href={"tel:" + site_settings?.site_phone}>
                                                            <Image src="/images/call.svg" alt={site_settings?.site_phone} width={200} height={200} />
                                                            <span>{site_settings?.site_phone}</span>
                                                        </Link>
                                                    </li>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_address ?
                                                    <li>
                                                        <p>
                                                            <Image src="/images/map.svg" alt={site_settings?.site_address} width={200} height={200} />
                                                            <span>{site_settings?.site_address}</span>
                                                        </p>
                                                    </li>
                                                    :
                                                    ""
                                            }
                                        </ul>
                                        <div className="social_logon">
                                            {
                                                site_settings?.site_facebook ?
                                                    <Link href={site_settings?.site_facebook} target="_blank" rel="noreferrer">
                                                        <img src="/images/facebook.svg" alt={site_settings?.site_facebook} />
                                                    </Link>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_twitter ?
                                                    <Link href={site_settings?.site_twitter} target="_blank" rel="noreferrer">
                                                        <img src="/images/twitter.svg" alt={site_settings?.site_twitter} />
                                                    </Link>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_instagram ?
                                                    <Link href={site_settings?.site_instagram} target="_blank" rel="noreferrer">
                                                        <img src="/images/instagram.svg" alt={site_settings?.site_instagram} />
                                                    </Link>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_linkedin ?
                                                    <Link href={site_settings?.site_linkedin} target="_blank" rel="noreferrer">
                                                        <img src="/images/linkedin.svg" alt={site_settings?.site_linkedin} />
                                                    </Link>
                                                    :
                                                    ""
                                            }
                                            {
                                                site_settings?.site_pinterest ?
                                                    <Link href={site_settings?.site_pinterest} target="_blank" rel="noreferrer">
                                                        <img src="/images/pinterest.svg" alt={site_settings?.site_pinterest} />
                                                    </Link>
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                    {
                                        site_settings?.site_contact_map ?
                                            <div className="map_google">
                                                <iframe
                                                    src={site_settings?.site_contact_map}
                                                    width="100%"
                                                    height="220"
                                                    style={{ border: 0, width: '100%' }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                ></iframe>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
}
