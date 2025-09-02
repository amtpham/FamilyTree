'use client'

import React from 'react';
import FamilyGraph from './FamilyGraph';
import { Person } from '@/lib/types';

type Props = { people: Person[] };

export default function ClientHome({ people }: Props) {
  const [selected, setSelected] = React.useState<Person | null>(null);
  return (
    <main className='p-6'>
      <h1 className='text-2xl font-semibold'>Family Tree</h1>
      <div className='mt-4'>
        <FamilyGraph people={people} onSelect={setSelected} />
      </div>
      {selected && (
        <div className='mt-4 p-4 border rounded-md bg-white'>
          <h2 className='text-xl font-medium'>{selected.name}</h2>
          <p className='text-sm text-gray-600'>{selected.bioMarkdown || 'No bio yet.'}</p>
        </div>
      )}
    </main>
  );
}

