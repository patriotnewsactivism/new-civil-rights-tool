import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function CitationNetworkExplorer() {
  const [caseId, setCaseId] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['citation-network', caseId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (caseId) params.append('citing_opinion', caseId);
      
      const response = await fetch(`/api/opinions-cited?${params}`);
      if (!response.ok) throw new Error('Failed to fetch citation network');
      return response.json();
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!caseId) return;
    setHasSearched(true);
    refetch();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Citation Network Explorer</h1>
      <p className="mb-4">Explore the network of citations between legal cases.</p>
      
      <Card title="Explore Citations" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Opinion ID"
            placeholder="Enter opinion ID (e.g., 2812209 for Obergefell v. Hodges)"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
          
          <Button onClick={handleSearch} disabled={!caseId}>
            Explore Citation Network
          </Button>
        </div>
      </Card>
      
      {isLoading && <p>Loading citation network...</p>}
      
      {error && (
        <Card title="Error" className="border-red-500">
          <p className="text-red-500">Error: {(error as Error).message}</p>
        </Card>
      )}
      
      {hasSearched && data && (
        <Card title="Citation Network">
          {data.results && data.results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This case cites {data.count} other opinions
              </p>
              <div className="max-h-96 overflow-y-auto">
                {data.results.map((citation: any) => (
                  <div key={citation.id} className="border-b pb-3 mb-3">
                    <h3 className="font-medium">Cited Opinion #{citation.cited_opinion?.id}</h3>
                    <p className="text-sm text-gray-600">
                      {citation.cited_opinion?.case_name}
                    </p>
                    <p className="text-sm">
                      Court: {citation.cited_opinion?.court?.full_name}
                    </p>
                    <p className="text-sm">
                      Date Filed: {citation.cited_opinion?.date_filed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No citations found for this opinion</p>
          )}
        </Card>
      )}
    </div>
  );
}