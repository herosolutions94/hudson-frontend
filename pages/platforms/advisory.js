import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import http from "@/components/helpers/http";
import { doObjToFormData, cmsFileUrl, generateContentArray, short_text } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("advisory", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function Advisory({ result }) {
  const { page_title, content, site_settings, meta_desc } = result
  const rows = generateContentArray(content, 3, 5, 2, '_card');
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

        <section className="thesis_sec platform_thesis_sec p_t_5">
          <div className="contain">
            <div className="flex reverse_flex_flex">

              <div className="colL">
                <div className="sec_heading">
                  <h2>{content?.section1_heading}</h2>
                </div>
                <Text string={content?.section1_text} />
                <div className="btn_blk">
                  <Link href={content?.banner_link_url} className="site_btn">{content?.banner_link_txt}</Link>
                </div>
              </div>
              {/* <div className="colR">
                <div className="image">
                  <Image src={cmsFileUrl(content?.image2, 'images')} width={1000} height={1000} alt={content?.section1_heading} />
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section className="key_feature new_block_feature">
          <div className="contain">
            <div className="sec_heading">
              <Text string={content?.section2_text} />
            </div>
            <div className="flex">
              {
                rows?.map((row, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="inner">
                        <div className="image">
                          <Image src={cmsFileUrl(row?.image, 'images')} width={200} height={200} alt={row?.heading} />
                        </div>
                        <h4>{row?.heading}</h4>
                        <p>{row?.text}</p>
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
                  <Image src={cmsFileUrl(content?.image6)} width={1000} height={1000} alt={content?.section3_form_heading} />
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
      </main>
    </>
  );
}
