import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MapContain from "@/components/components/Map";
import dynamic from 'next/dynamic';
import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";
import PortfolioBlk from "@/components/components/portfolioBlk";
import MapMarkersContain from "@/components/components/map-markers";
import PlatformFilter from "@/components/components/platform-filter";

const Map = dynamic(() => import('../../components/Map'), { ssr: false });


export const getServerSideProps = async (context) => {
  const { property_type, platform, location } = context.query;

  const formData = {
    property_type: property_type || '', 
    platform: platform || '',
    location: location || ''
  };

  const result = await http
    .post("portfolio", doObjToFormData(formData))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function Portfolio({ result }) {
  console.log(result)
  const { content, page_title, meta_desc, portfolio, site_settings, markers,locations } = result

  return (
    <>
      <MetaGenerator page_title={page_title} meta_info={meta_desc} site_settings={site_settings} />
      <main>
        <section className="map_section">
          <div className="top_header_heading cntnt text-center">
            <Text string={content?.banner_detail} />
          </div>
          <MapMarkersContain markers={markers} />
          <div className="contain">

            <PlatformFilter locations={locations} />

            <div className="flex transaction_slider">
              {
                portfolio?.length > 0 ?
                portfolio?.map((portfolio_row, index) => {
                  return (
                    <PortfolioBlk item={portfolio_row} key={index} />
                  )
                })
                :
                <div className="alert alert-danger">No item(s) found!</div>
              }
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
