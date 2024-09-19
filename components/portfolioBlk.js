import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cmsFileUrl } from "../helpers/helpers";

export default function PortfolioBlk({ item }) {
    return <>
        <div className="item">
            <div className="inner">
                <Link href={"/portfolio/" + item?.slug} ></Link>
                <div className="image">
                    <Image src={cmsFileUrl(item?.image, 'portfolio')} width={1000} height={1000} alt={item?.title} />
                    <span className="label_type capitalize">{item?.platform}</span>
                </div>
                <div className="inner_cntnt">
                    <h5>{item?.title}</h5>
                    <div className="location">
                        <Image src="/images/map.svg" width={100} height={100} alt="" />
                        <span>{item?.address}</span>
                    </div>
                    <p>{item?.short_text}</p>
                </div>
            </div>
        </div>
    </>;
}
