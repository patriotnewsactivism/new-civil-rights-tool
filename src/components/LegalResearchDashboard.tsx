import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select } from './ui/select';

export function LegalResearchDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('case_law');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['legal-research', searchType, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      params.append('type', searchType === 'case_law' ? 'o' : searchType === 'dockets' ? 'd' : 'p');
      
      const response = await fetch(`/api/search/opinions?${params}`);
      if (!response.ok) throw new Error('Failed to search legal database');
      return response.json();
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!searchQuery) return;
    setHasSearched(true);
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Legal Research Dashboard</h1>
      <p className="mb-4">Comprehensive legal research tool powered by CourtListener API.</p>
      
      <Card title="Research Parameters" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Search Query"
            placeholder="Enter legal terms, case names, or judges"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Select
            label="Search Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            options={[
              { value: 'case_law', label: 'Case Law' },
              { value: 'dockets', label: 'Dockets' },
              { value: 'judges', label: 'Judges' },
            ]}
          />
          
          <Button onClick={handleSearch} disabled={!searchQuery}>
            Search Legal Database
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
                  <h3 className="font-semibold">{result.caseName || result.name_full}</h3>
                  <p className="text-sm text-gray-600">
                    {result.court || result.court_id || result.date_created}
                  </p>
                  <p className="text-sm">
                    {result.snippet || result.description || result.text?.substring(0, 200)}
                  </p>
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