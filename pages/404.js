import Link from 'next/link';
import React from 'react';
import MetaGenerator from '../components/meta-generator';

export default function NotFound({ text = '', heading = '' }) {
    const data = {
        num: '404',
        title: 'Page not found',
        para: "Let's pretend ..... !! You never saw that. Go back to the Homepage to find out more.",
        btn: 'Back to the website',
        btn_link: '/',
    };
    return (

        <main>
            <MetaGenerator page_title={"404 - The HudsonPoint Group"} />
            <section id="oops">
                <div className="flex">
                    <Link href="/">
                        <img src="/images/logo.svg" alt="" />
                    </Link>
                    <div className="contain text-center">
                        <div className="icon">{data.num}</div>
                        <div className="inner">
                            <h4>{heading ? heading : data.title}</h4>
                            <p>{text ? text : data.para}</p>
                            <div className="btn_blk">
                                <Link href={data.btn_link} className="site_btn">
                                    {data.btn}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
