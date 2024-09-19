import React from "react";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";

export default function Team({ team, setIsOpen }) {
    return <>
        <div className="flex">
            {
                team?.map((teamObj, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="inner" onClick={() => setIsOpen(teamObj)}>
                                <div className="card_inner image_side">
                                    <div className="image">
                                        <Image src={cmsFileUrl(teamObj?.image, 'team')} width={800} height={800} alt={teamObj?.name} />
                                    </div>
                                    <div className="txt">
                                        <h5>{teamObj?.name}</h5>
                                        <h6>{teamObj?.designation}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    </>;
}
