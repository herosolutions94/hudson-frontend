import React from 'react';
import Head from 'next/head';
import { cmsFileUrl } from '../helpers/helpers';
import { useRouter } from 'next/router';

export default function MetaGenerator({
  page_title,
  meta_info = false,
  site_settings = null,
  meta_thumb = null,
}) {
  const router = useRouter();
  const asPathWithoutSlash = router.asPath.startsWith('/')
    ? router.asPath.substring(1)
    : router.asPath;
  const currentUrl = `${process.env.NEXT_PUBLIC_APP_URL}${asPathWithoutSlash}`;
  let canonicalUrl = currentUrl;  // Default to the original URL

  if (currentUrl.includes('explore/product')) {
    // Create a URL object
    const url = new URL(currentUrl);

    // Remove the 'slug' parameter
    url.searchParams.delete('slug');

    // Assign the modified URL to the canonicalUrl variable
    canonicalUrl = url.origin + url.pathname; // Rebuild without the query string
  }


  return (
    <>
      {page_title && meta_info !== false && (
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />

          <title>{page_title}</title>
          <meta name="title" content={meta_info?.meta_title} />
          <meta name="description" content={meta_info?.meta_description} />
          <meta name="keywords" content={meta_info?.meta_keywords} />

          <meta property="og:type" content={meta_info?.og_type} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={meta_info?.og_title} />
          <meta property="og:description" content={meta_info?.og_description} />
          <meta
            property="og:image"
            content={
              meta_thumb
                ? meta_thumb
                : cmsFileUrl(site_settings?.site_thumb, 'images')
            }
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={canonicalUrl} />
          <meta property="twitter:title" content={meta_info?.og_title} />
          <meta
            property="twitter:description"
            content={meta_info?.og_description}
          />
          <meta
            property="twitter:image"
            content={
              meta_thumb
                ? meta_thumb
                : cmsFileUrl(site_settings?.site_thumb, 'images')
            }
          />
          {site_settings?.site_icon && (
            <link
              rel="icon"
              href={cmsFileUrl(site_settings?.site_icon, 'images')}
            />
          )}
          <link rel="canonical" href={canonicalUrl} />
        </Head>
      )}

      {page_title && meta_info === false && (
        <Head>
          <title>{page_title}</title>
          <meta name="title" content={page_title} />
          <meta name="description" content={page_title} />
          <meta name="keywords" content={page_title} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:title" content={page_title} />
          <meta property="og:description" content={page_title} />
          <meta
            property="og:image"
            content={cmsFileUrl(site_settings?.site_thumb, 'images')}
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={canonicalUrl} />
          <meta property="twitter:title" content={page_title} />
          <meta property="twitter:description" content={page_title} />
          <meta
            property="twitter:image"
            content={cmsFileUrl(site_settings?.site_thumb, 'images')}
          />
          {site_settings?.site_icon && (
            <link
              rel="icon"
              href={cmsFileUrl(site_settings?.site_icon, 'images')}
            />
          )}
          <link rel="canonical" href={canonicalUrl} />
        </Head>
      )}
    </>
  );
}
