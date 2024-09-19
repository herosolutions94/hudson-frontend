import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData, generateContentArray } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("platforms", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Platforms({ result }) {
  const { content, page_title, site_settings, meta_desc } = result
  const platforms = generateContentArray(content, 2, 4, 2, '_card', true, "_link_");
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
        <section className="main_main_blocks">
          {
            platforms?.map((platform, index) => {
              return (
                <div className="outer" key={index}>
                  <div className="contain">
                    <div className="flex">
                      <div className="col">
                        <div className="image">
                          <Image src={cmsFileUrl(platform?.image)} alt={platform?.heading} width={1000} height={1000} />
                        </div>
                      </div>
                      <div className="col">
                        <div className="sec_heading">
                          <h2>{platform?.heading}</h2>
                        </div>
                        <Text string={platform?.text} />
                        {
                          platform?.link_text && platform?.link_url ?
                            <div className="btn_blk">
                              <Link href={platform?.link_url} className="site_btn">{platform?.link_text}</Link>
                            </div>
                            :
                            ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }


        </section>
      </main>
    </>
  );
}
