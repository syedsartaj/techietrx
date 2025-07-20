'use client';

import { useData } from '../DataContext';
import Herosectionone from './Herosectionone';
import Herosectiontwo from './Herosectiontwo';
import Herosectionthree from './Herosectionthree';

const Herosection = () => {
  const { sheet2Data, loading } = useData();

  if (loading) return <div>Loading hero section...</div>;


  const heroValue = sheet2Data.Hero;
  const heading = sheet2Data.Heading || '';
  const subheading = sheet2Data.Subheading || '';
  const buttonText = sheet2Data.ButtonText || '';

  const heroProps = { heading, subheading, buttonText };

  switch (heroValue) {
    case '1':
      return <Herosectionone {...heroProps} />;
    case '2':
      return <Herosectiontwo {...heroProps} />;
    case '3':
      return <Herosectionthree {...heroProps} />;
    default:
      return <Herosectionthree {...heroProps} />;
  }
};

export default Herosection;
