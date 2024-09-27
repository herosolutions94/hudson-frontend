import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Gallery from "@/components/components/Gallery";
import MapContain from "@/components/components/Map";
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";

export const getServerSideProps = async (context) => {
  const { params } = context;
  const slug = params.slug || null;
  const result = await http
    .post(
      'portfolio-details/' + slug,
      doObjToFormData({ token: "" })
    )
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function PortfolioDetail({ result }) {
  const { meta_desc, portfolio, site_settings } = result
  console.log(portfolio)
  return (
    <>
      <MetaGenerator page_title={portfolio?.title + " - " + site_settings?.site_name} meta_info={meta_desc} site_settings={site_settings} />
      <main>
        <section className="detail_banner_new" style={{ backgroundImage: "url(" + cmsFileUrl(portfolio?.image, 'portfolio') + ")" }}>
          <div className="contain">
            <div className="cntnt">
              <div className="head_property">
                <h3>{portfolio?.title}</h3>
                {
                  portfolio?.address ?
                <div className="location">
                  <Image src="/images/map.svg" width={100} height={100} alt="" />
                  <span>{portfolio?.address}</span>
                </div>
                :
                ""
}
              </div>
            </div>
          </div>
        </section>
        <section className="detail_property_pg">
          <div className="contain">
            <div className="blk_inner">

              <div className="cntnt_blk_inner">
                <div className="ck_editor">
                  <Text string={portfolio?.details} />
                </div>

                <div className="flex">
                  <div className="col">
                    <div className="inner">
                      <h4>transaction date</h4>
                      <p>{portfolio?.acquisition_date}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <h4>INVESTMENT TYPE</h4>
                      <p>{portfolio?.investment_type}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <h4>size</h4>
                      <p>{portfolio?.size}</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="inner">
                      <h4>SECTOR</h4>
                      <p>{portfolio?.sector}</p>
                    </div>
                  </div>
                </div>


                <div className="gallery_blk">
                  <Gallery data={portfolio?.gallery} />
                </div>

                <div className="br"></div>
                <h4>Location</h4>
                <div className="location_map">
                  <MapContain latitude={portfolio?.latitude} longitude={portfolio?.longitude} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
