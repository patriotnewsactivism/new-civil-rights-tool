import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function OralArgumentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['oral-arguments', searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('case_name_full__icontains', searchQuery);
      
      const response = await fetch(`/api/oral-arguments?${params}`);
      if (!response.ok) throw new Error('Failed to search oral arguments');
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
      <h1 className="text-2xl font-bold mb-4">Oral Argument Search</h1>
      <p className="mb-4">Search the largest collection of oral argument recordings on the Internet.</p>
      
      <Card title="Search Parameters" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Case Name"
            placeholder="Enter case name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Button onClick={handleSearch} disabled={!searchQuery}>
            Search Oral Arguments
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
              <p className="text-sm text-gray-600">Found {data.count} oral arguments</p>
              {data.results.map((argument: any) => (
                <div key={argument.id} className="border-b pb-4">
                  <h3 className="font-semibold">{argument.case_name}</h3>
                  <p className="text-sm text-gray-600">
                    Court: {argument.court?.full_name} | Date Argued: {argument.date_argued}
                  </p>
                  <p className="text-sm">
                    Duration: {argument.duration} seconds | Docket: {argument.docket?.docket_number}
                  </p>
                  {argument.local_path_mp3 && (
                    <audio controls className="mt-2 w-full">
                      <source src={argument.local_path_mp3} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No oral arguments found</p>
          )}
        </Card>
      )}
    </div>
  );
}