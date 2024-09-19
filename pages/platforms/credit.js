import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import http from "@/components/helpers/http";
import { doObjToFormData, cmsFileUrl, generateContentArray, short_text } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";
import Cta from "@/components/components/cta";
import PopupSmall from "@/components/components/popupSmall";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("credit", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function Credit({ result }) {
  const { page_title, content, site_settings, meta_desc, programs } = result
  const [popup, setPopup] = useState(null);
  const onClose = () => {
    setPopup(null);
  }
  const strategies = generateContentArray(content, 2, 4, 2, '_card', true);

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

        <section className="programs_sec">
          <div className="contain">
            <div className="cntnt text-center">
              <Text string={content?.section1_text} />
            </div>
            <div className="flex">
              {
                programs?.map((program, index) => {
                  return (
                    <div className="col">
                      <div className="inner">
                        <h3>{program?.title}</h3>
                        <ul>
                          {
                            program?.rows?.length > 0 ?
                              program?.rows?.slice(0, 5)?.map((program_row) => {
                                return (
                                  <li key={index}>
                                    <p>{program_row?.title}</p>
                                    <h5>{program_row?.detail}</h5>
                                  </li>
                                )
                              })
                              :
                              ""
                          }


                        </ul>
                        {
                          program?.rows?.length > 5 ?
                            <div className="btn_blk text-center">
                              <button type="button" className="site_btn" onClick={() => setPopup(program)}>{program?.button_text}</button>
                            </div>
                            :
                            ""
                        }
                      </div>
                    </div>
                  )
                })
              }




            </div>
          </div>
        </section>
        <section className="these_grid_sec_new">
          <div className="contain">
            <div className="sec_heading text-center">
              <Text string={content?.section2_text} />
            </div>
            <div className="flex">
              {
                strategies?.map((strategy, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="card">
                        <div className="card-inner front">
                          <div className="img_icon">
                            <Image src={cmsFileUrl(strategy?.image)} width={300} height={200} alt={strategy?.heading} />
                          </div>
                          <h6>{strategy?.heading}</h6>
                        </div>
                        <div className="card-inner back">
                          <p>{strategy?.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }



            </div>
          </div>
        </section>
        <section className="thesis_sec platform_thesis_sec">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="image">
                  <Image src={cmsFileUrl(content?.image5)} width={1000} height={1000} alt={content?.section3_form_heading} />
                </div>
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>{content?.section3_form_heading}</h2>
                </div>
                <Text string={content?.section3_detail1} />
                <div className="btn_blk">
                  <Link href={content?.section3_link__url} className="site_btn">{content?.section3_link__txt}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {popup !== null ?
          <PopupSmall isOpen={popup !== null ? true : false} onClose={onClose}>
            <div className="detail_popup_programs">
              <h3>{popup?.title}</h3>
              <ul>
                {
                  popup?.rows?.length > 0 ?
                    popup?.rows?.slice(0, 5)?.map((popup_row) => {
                      return (
                        <li key={index}>
                          <p>{popup_row?.title}</p>
                          <h5>{popup_row?.detail}</h5>
                        </li>
                      )
                    })
                    :
                    ""
                }
              </ul>
            </div>
          </PopupSmall>
          :
          ""
        }

      </main >
    </>
  );
}
