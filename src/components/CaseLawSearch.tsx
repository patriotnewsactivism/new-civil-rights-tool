import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function CaseLawSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [court, setCourt] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['caselaw-search', searchQuery, court],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (court) params.append('court', court);
      
      const response = await fetch(`/api/search/opinions?${params}`);
      if (!response.ok) throw new Error('Failed to search cases');
      return response.json();
    },
    enabled: false, // Don't run automatically
  });

  const handleSearch = () => {
    setHasSearched(true);
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Case Law Search</h1>
      <p className="mb-4">Search through millions of legal opinions using the CourtListener API.</p>
      
      <Card title="Search Parameters" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Search Query"
            placeholder="Enter search terms (e.g., 'Fourth Amendment')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Input
            label="Court (Optional)"
            placeholder="Court abbreviation (e.g., 'scotus' for Supreme Court)"
            value={court}
            onChange={(e) => setCourt(e.target.value)}
          />
          
          <Button onClick={handleSearch} disabled={!searchQuery}>
            Search Cases
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
              <p className="text-sm text-gray-600">Found {data.count} results</p>
              {data.results.map((result: any, index: number) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold">{result.caseName || result.case_name}</h3>
                  <p className="text-sm text-gray-600">{result.court || result.court_id}</p>
                  <p className="text-sm">{result.snippet || result.text?.substring(0, 200)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found</p>
          )}
        </Card>
      )}
    </div>
  );
}