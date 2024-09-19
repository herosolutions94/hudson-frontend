import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import Testimonials from "../components/testimonials";
// import Cta from "../components/cta";
// import ScrollCounter from "../components/ScrollCounter";
import Typewriter from 'typewriter-effect';
import PopupSmall from "../components/popupSmall";
import http from "../helpers/http";
import { cmsFileUrl, doObjToFormData, generateContentArray } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import PortfolioBlk from "../components/portfolioBlk";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("home", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Home({ result }) {
  const { content, page_title, site_settings, meta_desc, portfolio, banner_titles } = result
  const [isOpen, setIsOpen] = useState(null);
  const onClose = () => {
    setIsOpen(null);
  }
  const platforms = generateContentArray(content, 3, 5, 5, '_card', true);
  const investment_blocks = generateContentArray(content, 6, 7, 3, '', true);
  return (
    <>
      <MetaGenerator page_title={page_title} meta_info={meta_desc} site_settings={site_settings} />
      <main>
        <section className="banner" style={{ backgroundImage: "url(" + cmsFileUrl(content?.image1, 'images') + ")" }}>
          <div className="contain">
            <div className="cntnt">
              <h1>{content?.banner_text}
                <span><Typewriter
                  options={{
                    strings: banner_titles,
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    deleteSpeed: 50,
                  }}
                /></span></h1>

            </div>
          </div>
        </section>
        <section className="about_sec">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h2>{content?.section1_heading}</h2>
                </div>
                <Text string={content?.section1_text} />
              </div>
              <div className="colR">
                <div className="image">
                  <Image src={cmsFileUrl(content?.image2)} width={1000} height={1000} alt={content?.section1_heading} />
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className="plateform_sec">
          <div className="contain">
            <div className="outer_txt">
              <Text string={content?.section2_text} />
            </div>
            <div className="flex">
              {
                platforms?.map((platform, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="inner">
                        <div className="image">
                          <Image src={cmsFileUrl(platform?.image)} width={1000} height={1000} alt={platform?.heading} />
                        </div>
                        <Link href={platform?.link ? platform?.link : '/'} className="cntnt">
                          <h5>{platform?.heading}</h5>
                          <p>{platform?.text}</p>
                        </Link>
                      </div>
                    </div>
                  )
                })
              }



            </div>
          </div>
        </section>
        <section className="investment_criteria">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <Text string={content?.section3_text} />

              </div>
              <div className="colR">
                {
                  investment_blocks?.map((investment_block, index) => {
                    return (
                      <div className="inner_col" key={index}>
                        <div className="image" onClick={() => setIsOpen(investment_block?.text)}>
                          <Image src={cmsFileUrl(investment_block?.image)} width={500} height={500} alt="" />
                        </div>
                        <p>{investment_block?.heading}</p>

                        <div className="btn_blk text-center">
                          <button type="button" className="site_btn" onClick={() => setIsOpen(investment_block?.text)}>{investment_block?.link_text}</button>
                        </div>
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
        </section>
        {
          portfolio?.length > 0 ?
            <section className="transactions_section t_p_yes">
              <div className="contain">
                <div className="cntnt text-center">
                  <Text string={content?.section4_heading} />
                </div>
                <div className="flex transaction_slider">
                  {
                    portfolio?.map((portfolio_row, index) => {
                      return (
                        <PortfolioBlk item={portfolio_row} key={index} />
                      )
                    })
                  }

                </div>
                <div className="br"></div>
                <div className="btn_blk text-center">
                  <Link href={content?.section4_link__url} className="site_btn">{content?.section4_link__txt}</Link>
                </div>
              </div>
            </section>
            :
            ""
        }
      </main>
      {
        isOpen !== null ?
          <PopupSmall isOpen={isOpen != null ? true : false} onClose={onClose}>
            <div className="text_more popup_inner_cntnt">
              <Text string={isOpen} />
            </div>
          </PopupSmall>
          :
          ""
      }

    </>
  );
}
