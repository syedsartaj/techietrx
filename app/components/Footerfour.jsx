'use client';

import { useData } from '../DataContext';
import Footerone from './Ooterone';
import Footertwo from './Ootertwo';
import Footerthree from './Ooterthree';
import Footerfour from './Footerfour';

const Footer = () => {
  const { sheet2Data, loading } = useData();

  if (loading) return <div>Loading footer...</div>;
  const footerRow = sheet2Data.find(row => row.Footer);
    const footerValue = footerRow?.Footer || '';
  const companyName = footerRow?.companyName || '';
  const companySlogan = footerRow?.companySlogan || '';

  const footerProps = { companyName, companySlogan };

  switch (footerValue) {
    case '1':
      return <Footerone />;
    case '2':
      return <Footertwo {...footerProps}/>;
    case '3':
      return <Footerthree {...footerProps}/>;
    case '4':
        return <Footerfour {...footerProps}/>;
    default:
      return <Footerfour/>; // fallback
  }
};

export default Footer;
