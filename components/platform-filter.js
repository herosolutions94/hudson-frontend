import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function PlatformFilter({ locations }) {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { query } = router; // Access the query parameters from the URL

  // Use useEffect to set form values based on URL parameters
  useEffect(() => {
    if (query.property_type) {
      setValue("property_type", query.property_type);
    }
    if (query.platform) {
      setValue("platform", query.platform);
    }
    if (query.location) {
      setValue("location", query.location);
    }
  }, [query, setValue]);

  const onSubmit = (data) => {
    // Filter out any empty or undefined fields from the data
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value)
    );

    // Convert the filtered data into query params
    const queryParams = new URLSearchParams(filteredData).toString();

    // Redirect to the portfolio page with the valid query parameters
    router.push(`/portfolio?${queryParams}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filter_portfolio">
          {/* <div className="blk_filter">
            <h6>Property Type</h6>
            <select className="input" {...register("property_type")}>
              <option value="multifamily">Multifamily</option>
              <option value="mixed-use">Mixed-Use</option>
              <option value="commercial">Commercial</option>
            </select>
          </div> */}

          <div className="blk_filter">
            <h6>Platform</h6>
            <select className="input" {...register("platform")}>
              <option value="acquisition">HudsonPoint Acquisitions</option>
              <option value="credit">HudsonPoint Credit</option>
              <option value="advisory">HudsonPoint Advisory</option>
            </select>
          </div>

          <div className="blk_filter">
            <h6>Location</h6>
            <select className="input" {...register("location")}>
              {locations?.map((location, index) => (
                <option value={location?.id} key={index}>
                  {location?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="blk_filter">
            <div className="btn_blk">
              <button className="site_btn" type="submit">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
