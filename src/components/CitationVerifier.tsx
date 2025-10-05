import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

export function CitationVerifier() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/citations/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) throw new Error('Failed to verify citations');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Citation Verification</h1>
      <p className="mb-4">Verify legal citations and check for hallucinated references.</p>
      
      <Card title="Enter Text with Citations" className="mb-4">
        <div className="space-y-4">
          <Textarea
            label="Text to Verify"
            placeholder="Paste text containing legal citations (e.g., 'In Brown v. Board of Education, 347 U.S. 483 (1954)...')"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px]"
          />
          
          <Button onClick={handleVerify} disabled={!text || isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Citations'}
          </Button>
        </div>
      </Card>
      
      {error && (
        <Card title="Error" className="border-red-500 mb-4">
          <p className="text-red-500">Error: {error}</p>
        </Card>
      )}
      
      {results && (
        <Card title="Verification Results">
          {results.citations && results.citations.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Found {results.citations.length} citations</p>
              {results.citations.map((citation: any, index: number) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold">{citation.cite}</h3>
                  {citation.matched && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600">✓ Verified</p>
                      <p className="text-sm">{citation.case_name}</p>
                      <p className="text-sm text-gray-600">{citation.court}</p>
                    </div>
                  )}
                  {!citation.matched && (
                    <p className="text-sm text-red-600">✗ Not found in database</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No citations found in the text</p>
          )}
        </Card>
      )}
    </div>
  );
}