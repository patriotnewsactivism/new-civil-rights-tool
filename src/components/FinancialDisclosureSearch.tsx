import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select } from './ui/select';

export function FinancialDisclosureSearch() {
  const [searchType, setSearchType] = useState('judge');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['financial-disclosures', searchType, searchQuery],
    queryFn: async () => {
      if (searchType === 'judge') {
        // Search by judge name
        const params = new URLSearchParams();
        if (searchQuery) params.append('person__name_full__icontains', searchQuery);
        
        const response = await fetch(`/api/financial-disclosures?${params}`);
        if (!response.ok) throw new Error('Failed to search financial disclosures');
        return response.json();
      } else {
        // Search by disclosure ID
        const response = await fetch(`/api/financial-disclosures/${searchQuery}`);
        if (!response.ok) throw new Error('Failed to fetch financial disclosure');
        return response.json();
      }
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
      <h1 className="text-2xl font-bold mb-4">Financial Disclosure Search</h1>
      <p className="mb-4">Search for financial disclosure records of federal judges.</p>
      
      <Card title="Search Parameters" className="mb-4">
        <div className="space-y-4">
          <Select
            label="Search Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            options={[
              { value: 'judge', label: 'By Judge Name' },
              { value: 'id', label: 'By Disclosure ID' },
            ]}
          />
          
          <Input
            label={searchType === 'judge' ? 'Judge Name' : 'Disclosure ID'}
            placeholder={searchType === 'judge' ? 'Enter judge name' : 'Enter disclosure ID'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Button onClick={handleSearch} disabled={!searchQuery}>
            Search Disclosures
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
              <p className="text-sm text-gray-600">Found {data.count} disclosures</p>
              {data.results.map((disclosure: any) => (
                <div key={disclosure.id} className="border-b pb-4">
                  <h3 className="font-semibold">Disclosure #{disclosure.id}</h3>
                  <p className="text-sm text-gray-600">
                    Filed: {disclosure.date_created} | Modified: {disclosure.date_modified}
                  </p>
                  <p className="text-sm">
                    Year: {disclosure.year} | Judge: {disclosure.person?.name_full}
                  </p>
                  <p className="text-sm">
                    Court: {disclosure.court?.full_name} | Position: {disclosure.position}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No disclosures found</p>
          )}
        </Card>
      )}
    </div>
  );
}