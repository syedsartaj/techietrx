'use client';

import { useData } from '../DataContext';
import Herosectionone from './Herosectionone';
import Herosectiontwo from './Herosectiontwo';
import Herosectionthree from './Herosectionthree';

const Herosection = () => {
  const { sheet2Data, loading } = useData();

  if (loading) return <div>Loading hero section...</div>;

  const heroRow = sheet2Data.find(row => row.Hero);

  const heroValue = heroRow?.Hero?.toString().trim();
  const heading = heroRow?.Heading || '';
  const subheading = heroRow?.Subheading || '';
  const buttonText = heroRow?.ButtonText || '';

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
