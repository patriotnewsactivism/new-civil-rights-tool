import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function JudgeLookup() {
  const [searchName, setSearchName] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['judge-search', searchName],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchName) params.append('name_full__icontains', searchName);
      
      const response = await fetch(`/api/judges?${params}`);
      if (!response.ok) throw new Error('Failed to search judges');
      return response.json();
    },
    enabled: false,
  });

  const handleSearch = () => {
    setHasSearched(true);
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Judge Lookup</h1>
      <p className="mb-4">Search for federal and state court judges and view their biographical information.</p>
      
      <Card title="Search for a Judge" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Judge Name"
            placeholder="Enter judge's name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          
          <Button onClick={handleSearch} disabled={!searchName}>
            Search Judges
          </Button>
        </div>
      </Card>
      
      {isLoading && <p>Searching...</p>}
      
      {error && (
        <Card title="Error" className="border-red-500">
          <p className="text-red-500">Error: {(error as Error).message}</p>
        </Card>
      )}
      
      {hasSearched && data && (
        <Card title="Search Results">
          {data.results && data.results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Found {data.count} judges</p>
              {data.results.map((judge: any) => (
                <div key={judge.id} className="border-b pb-4">
                  <h3 className="font-semibold text-lg">{judge.name_full}</h3>
                  {judge.date_dob && (
                    <p className="text-sm text-gray-600">Born: {judge.date_dob}</p>
                  )}
                  {judge.gender && (
                    <p className="text-sm text-gray-600">Gender: {judge.gender}</p>
                  )}
                  {judge.positions && judge.positions.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Positions:</p>
                      {judge.positions.map((position: any, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600 ml-4">
                          {position.court?.full_name || position.organization_name}
                          {position.date_start && ` (${position.date_start} - ${position.date_termination || 'Present'})`}
                        </p>
                      ))}
                    </div>
                  )}
                  {judge.educations && judge.educations.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Education:</p>
                      {judge.educations.map((edu: any, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600 ml-4">
                          {edu.school?.name} - {edu.degree_level} ({edu.degree_year})
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No judges found</p>
          )}
        </Card>
      )}
    </div>
  );
}