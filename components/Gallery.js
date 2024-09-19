import React, { useEffect } from 'react';
import LightGallery from 'lightgallery/react';

// Import LightGallery styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

// Import LightGallery plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import Link from 'next/link';
import { cmsFileUrl } from '../helpers/helpers';

const Gallery = ({ data }) => {
  useEffect(() => { }, []);

  return (
    <div>
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {data?.map((item, index) => (
          <Link key={index} href={cmsFileUrl(item?.image, 'portfolio')}>
            <img src={cmsFileUrl(item?.image, 'portfolio')} alt={"Gallery " + index} />
          </Link>
        ))}
      </LightGallery>
    </div>
  );
};

export default Gallery;

