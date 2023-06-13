import LabCard from '@/components/labCard';
import React, { useState } from 'react';
const labData = [
    {
      name: 'AI Lab',
      dep: 'EECS'
    },
    {
      name: 'AI Lab2',
      dep: 'EECS'
    },
    {
      name: 'AI Lab3',
      dep: 'EECS'
    },
    {
      name: 'AI Lab4',
      dep: 'EECS'
    }
  ];
export default function labPanel() { 
    return (
        <>{labData.map((item) => (<LabCard name={item.name} dep={ item.dep } />))
    }</>
    );
};