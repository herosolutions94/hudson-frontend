import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import http from "@/components/helpers/http";
import { doObjToFormData, cmsFileUrl, generateContentArray, short_text } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";


export const getServerSideProps = async (context) => {

  const result = await http
    .post("acquisition", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Acquisition({ result }) {
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
        <section className="about_sec acquisition_sec">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h2>{content?.section1_heading}</h2>
                </div>
                <Text string={content?.section1_text} />
              </div>
              {/* <div className="colR">
                <div className="image">
                  <Image src={cmsFileUrl(content?.image2, 'images')} width={1000} height={1000} alt={short_text(content?.section1_text)} />
                </div>
              </div> */}
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
                rows?.map((row, index) => {
                  return (
                    <div className="col">
                      <div className="card">
                        <div className="card-inner front">
                          <div className="img_icon">
                            <Image src={cmsFileUrl(row?.image)} width={300} height={200} alt={row?.heading} />
                          </div>
                          <h6>{row?.heading}</h6>
                        </div>
                        <div className="card-inner back">
                          <p>{row?.text}</p>
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
