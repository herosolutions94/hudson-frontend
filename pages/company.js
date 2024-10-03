import React, { useState } from "react";
import Image from "next/image";
import PopupSmall from "../components/popupSmall";
import http from "../helpers/http";
import { doObjToFormData, short_text, cmsFileUrl, generateContentArray } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import Team from "../components/team";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("about", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function About({ result }) {
  const { page_title, content, meta_desc, team, site_settings } = result
  const [isOpen, setIsOpen] = useState(null);
  const onClose = () => {
    setIsOpen(null);
  }

  const investment_thesis = generateContentArray(content, 3, 6, 2, '_card');
  console.log(meta_desc)
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

        <section className="about_sec" id="about">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <h2>{content?.section1_heading}</h2>
                <Text string={content?.section1_text} />
              </div>
              <div className="colR">
                <div className="image">
                  <Image src={cmsFileUrl(content?.image2, 'images')} width={1000} height={1000} alt={short_text(content?.section1_text)} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="these_grid_sec">
          <div className="contain">
            <div className="sec_heading text-center">
              <Text string={content?.section2_text} />
            </div>
            <div className="flex">
              {
                investment_thesis?.map((investment_thesis_obj, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="card">
                        <div className="card-inner front">
                          <div className="img_icon">
                            <Image src={cmsFileUrl(investment_thesis_obj?.image)} width={300} height={200} alt={investment_thesis_obj?.heading} />
                          </div>
                          <h6>{investment_thesis_obj?.heading}</h6>
                        </div>
                        <div className="card-inner back">
                          <p>{investment_thesis_obj?.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }



            </div>
          </div>
        </section>
        {
          team?.length > 0 ?
            <section className="team_sec" id="team">
              <div className="contain">
                <div className="sec_heading text-center">
                  <Text string={content?.section3_text} />
                </div>
                <div className="outer_blk">
                  <Team team={team} setIsOpen={setIsOpen} />
                </div>
              </div>
            </section>
            :
            ""
        }
        {
          isOpen !== null ?
            <PopupSmall isOpen={isOpen !== null ? true : false} onClose={onClose}>
              <div className="team_detail_popup">
                <div className="image">
                  <Image src={cmsFileUrl(isOpen?.image, 'team')} width={800} height={800} alt={isOpen?.name} />
                </div>
                <div className="txt">
                  <Text string={isOpen?.detail} />
                </div>
              </div>
            </PopupSmall>
            :
            ""
        }
      </main>
    </>
  );
}
