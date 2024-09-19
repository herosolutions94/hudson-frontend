import React from "react"
import Head from "next/head"
import { cmsFileUrl } from "../helpers/helpers"

export default function SiteMaster({ siteSettings }) {

    return (
        <Head>
            <title>{siteSettings?.site_name}</title>
            <meta name="title" content={siteSettings?.site_name} />
            <meta name="description" content={siteSettings?.site_meta_desc} />
            <meta name="keywords" content={siteSettings?.site_meta_keyword} />
            <link rel="icon" href={cmsFileUrl(siteSettings?.site_icon, 'images')} />
            <meta property="og:image" content={cmsFileUrl(siteSettings?.site_thumb, 'images')} />
            <meta property="twitter:image" content={cmsFileUrl(siteSettings?.site_thumb, 'images')} />
        </Head>
    )
}