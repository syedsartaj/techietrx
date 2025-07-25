'use client';

import { useData } from '../DataContext';
import Footerone from './Ooterone';
import Footertwo from './Ootertwo';
import Footerthree from './Ooterthree';
import Footerfour from './Footerfour';
import SkeletonLoader from './SkeletonLoader';

const Footer = () => {
  const { sheet2Data, loading } = useData();

  if (loading) return <SkeletonLoader/>;
    const footerValue = sheet2Data.Footer || '';
  const companyName = sheet2Data.companyName || '';
  const companySlogan = sheet2Data.companySlogan || '';
  const emailid = sheet2Data.emailid || '';

  const footerProps = { companyName, companySlogan };
  const footerPropss = { companyName, companySlogan,emailid };

  switch (footerValue) {
    case '1':
      return <Footerone />;
    case '2':
      return <Footertwo {...footerPropss}/>;
    case '3':
      return <Footerthree {...footerProps}/>;
    case '4':
        return <Footerfour {...footerProps}/>;
    default:
      return <Footerfour/>; // fallback
  }
};

export default Footer;
