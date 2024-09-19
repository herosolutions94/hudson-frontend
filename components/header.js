import Link from "next/link"
import React, { useState, useEffect } from 'react'
import { cmsFileUrl } from "../helpers/helpers";

export default function Header({ siteSettings }) {
  const [toggle, setToggle] = useState(false);
  const ToggleAction = () => {
    setToggle(!toggle);
  }
  const [userDrop, setUserDrop] = useState(false);
  const ToggleUserDrop = () => {
    setUserDrop(!userDrop);
  }

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header className={isScrolled ? "scrolled" : ''}>
      <div className="contain">
        <div className="logo">
          <Link href="/">
            <img src={cmsFileUrl(siteSettings?.site_logo, 'images')} alt={siteSettings?.site_name} />
          </Link>
        </div>
        <div className={toggle ? "toggle active" : "toggle"} onClick={ToggleAction}><span></span></div>
        <nav id="nav" className={toggle ? "active" : ""}>
          <ul>
            <li className="drop">
              <Link href="/company" onClick={ToggleAction}>Company</Link>
              <ul className="sub">
                <li><Link href="/company" onClick={ToggleAction}>About Us</Link></li>
                <li><Link href="/company#team" onClick={ToggleAction}>Team</Link></li>
              </ul>
            </li>
            <li><Link href="/portfolio" onClick={ToggleAction}>Portfolio</Link></li>
            <li className="drop">
              <Link href="/platforms" onClick={ToggleAction}>Our Platforms</Link>
              <ul className="sub">
                <li>
                  <Link href="/platforms/acquisition" onClick={ToggleAction}>HudsonPoint Acquisitions</Link>
                </li>
                <li>
                  <Link href="/platforms/credit" onClick={ToggleAction}>HudsonPoint Credit</Link>
                </li>
                <li>
                  <Link href="/platforms/advisory" onClick={ToggleAction}>HudsonPoint Advisory</Link>
                </li>
              </ul>
            </li>
            <li><Link href="/contact" onClick={ToggleAction}>Contact Us</Link></li>
            {
              siteSettings?.invester_login ?
            <li className="btn_blk" ><Link href={siteSettings?.invester_login} className="site_btn" onClick={ToggleAction} target="_blank">Investor Login</Link></li>
            :
            ""
}
          </ul>
        </nav>
        <div className="clearfix"></div>
      </div>
    </header>
  )
}