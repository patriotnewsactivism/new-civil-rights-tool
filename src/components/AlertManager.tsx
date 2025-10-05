import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select } from './ui/select';

export function AlertManager() {
  const [alertName, setAlertName] = useState('');
  const [alertQuery, setAlertQuery] = useState('');
  const [alertRate, setAlertRate] = useState('rt');
  const queryClient = useQueryClient();

  // Fetch existing alerts
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const response = await fetch('/api/alerts');
      if (!response.ok) throw new Error('Failed to fetch alerts');
      return response.json();
    },
  });

  // Create new alert mutation
  const createAlertMutation = useMutation({
    mutationFn: async (alertData: { name: string; query: string; rate: string }) => {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });
      
      if (!response.ok) throw new Error('Failed to create alert');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      setAlertName('');
      setAlertQuery('');
    },
  });

  const handleCreateAlert = () => {
    if (!alertName || !alertQuery) return;
    
    createAlertMutation.mutate({
      name: alertName,
      query: alertQuery,
      rate: alertRate,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Legal Alert Manager</h1>
      <p className="mb-4">Create and manage alerts for new legal cases and filings.</p>
      
      <Card title="Create New Alert" className="mb-4">
        <div className="space-y-4">
          <Input
            label="Alert Name"
            placeholder="Enter alert name"
            value={alertName}
            onChange={(e) => setAlertName(e.target.value)}
          />
          
          <Input
            label="Search Query"
            placeholder="Enter search query (e.g., 'q=constitutional law')"
            value={alertQuery}
            onChange={(e) => setAlertQuery(e.target.value)}
          />
          
          <Select
            label="Alert Frequency"
            value={alertRate}
            onChange={(e) => setAlertRate(e.target.value)}
            options={[
              { value: 'rt', label: 'Real Time' },
              { value: 'dly', label: 'Daily' },
              { value: 'wly', label: 'Weekly' },
              { value: 'mly', label: 'Monthly' },
            ]}
          />
          
          <Button 
            onClick={handleCreateAlert} 
            disabled={!alertName || !alertQuery || createAlertMutation.isPending}
          >
            {createAlertMutation.isPending ? 'Creating...' : 'Create Alert'}
          </Button>
        </div>
      </Card>
      
      {createAlertMutation.isError && (
        <Card title="Error" className="border-red-500 mb-4">
          <p className="text-red-500">
            Error: {(createAlertMutation.error as Error).message}
          </p>
        </Card>
      )}
      
      {createAlertMutation.isSuccess && (
        <Card title="Success" className="border-green-500 mb-4">
          <p className="text-green-500">Alert created successfully!</p>
        </Card>
      )}
      
      {isLoading && <p>Loading alerts...</p>}
      
      {error && (
        <Card title="Error" className="border-red-500">
          <p className="text-red-500">Error: {(error as Error).message}</p>
        </Card>
      )}
      
      {alerts && alerts.results && (
        <Card title="Existing Alerts">
          {alerts.results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">You have {alerts.results.length} alerts</p>
              {alerts.results.map((alert: any) => (
                <div key={alert.id} className="border-b pb-4">
                  <h3 className="font-semibold">{alert.name}</h3>
                  <p className="text-sm text-gray-600">Query: {alert.query}</p>
                  <p className="text-sm">
                    Rate: {alert.rate === 'rt' ? 'Real Time' : 
                          alert.rate === 'dly' ? 'Daily' :
                          alert.rate === 'wly' ? 'Weekly' : 'Monthly'}
                  </p>
                  <p className="text-sm">
                    Created: {new Date(alert.date_created).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No alerts configured</p>
          )}
        </Card>
      )}
    </div>
  );
}