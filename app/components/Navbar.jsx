'use client';

import { useData } from '../DataContext'; // global context
import Headerone from './Headerone';
import Headertwo from './Headertwo';
import Headerthree from './Headerthree';
import Headerfour from './Headerfour';
import Headerfive from './Headerfive';

const Navbar = () => {
  const { sheet2Data, loading } = useData();

  if (loading) {
    return <div>Loading header...</div>;
  }

  // Find the first row that has a 'Header' value
 const compname = sheet2Data.companyName || '';
  // Parse the header value (as string or number)
  const headerValue = sheet2Data.Header;
  const navprops = { compname };

  // Conditional render based on value
  switch (headerValue) {
    case '1':
      return <Headerone {...navprops}/>;
    case '2':
      return <Headertwo {...navprops}/>;
    case '3':
      return <Headerthree {...navprops}/>;
    case '4':
      return <Headerfour {...navprops}/>;
    case '5':
      return <Headerfive {...navprops}/>;
    default:
      return <Headerfive {...navprops}/>; // default fallback
  }
};

export default Navbar;
