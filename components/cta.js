import Link from 'next/link'
export default function Cta() {
    return (
      <div className='cta_flex'>
        <div className='sec_heading'>
            <h2>Ready to Elevate Your Real Estate Investments?</h2>
            <p>Join us in crafting exceptional living spaces and securing superior returns. Let’s work together to unlock the full potential of New York City’s real estate market.</p>
        </div>
        <div className='btn_blk text-right'>
            <Link href="/" className='site_btn'>Explore Investment Opportunities</Link>
        </div>
      </div>
    );
}