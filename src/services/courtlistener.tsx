// CourtListener API service
const API_BASE_URL = '/api';

export const courtListenerService = {
  // Search opinions
  searchOpinions: async (query: string, court?: string, page?: number) => {
    const params = new URLSearchParams({ q: query });
    if (court) params.append('court', court);
    if (page) params.append('page', page.toString());
    
    const response = await fetch(`${API_BASE_URL}/search/opinions?${params}`);
    if (!response.ok) throw new Error('Failed to search opinions');
    return response.json();
  },

  // Get dockets
  getDockets: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/dockets?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch dockets');
    return response.json();
  },

  // Get docket by ID
  getDocketById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/dockets/${id}`);
    if (!response.ok) throw new Error('Failed to fetch docket');
    return response.json();
  },

  // Get courts
  getCourts: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/courts?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch courts');
    return response.json();
  },

  // Get judges
  getJudges: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/judges?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch judges');
    return response.json();
  },

  // Get judge by ID
  getJudgeById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/judges/${id}`);
    if (!response.ok) throw new Error('Failed to fetch judge');
    return response.json();
  },

  // Get opinions
  getOpinions: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/opinions?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch opinions');
    return response.json();
  },

  // Get opinion by ID
  getOpinionById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/opinions/${id}`);
    if (!response.ok) throw new Error('Failed to fetch opinion');
    return response.json();
  },

  // Verify citations
  verifyCitations: async (text: string) => {
    const response = await fetch(`${API_BASE_URL}/citations/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Failed to verify citations');
    return response.json();
  },

  // Get oral arguments
  getOralArguments: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/oral-arguments?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch oral arguments');
    return response.json();
  },

  // Get oral argument by ID
  getOralArgumentById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/oral-arguments/${id}`);
    if (!response.ok) throw new Error('Failed to fetch oral argument');
    return response.json();
  },

  // Get financial disclosures
  getFinancialDisclosures: async (params: any) => {
    const searchParams = new URLSearchParams(params as any);
    const response = await fetch(`${API_BASE_URL}/financial-disclosures?${searchParams}`);
    if (!response.ok) throw new Error('Failed to fetch financial disclosures');
    return response.json();
  },

  // Get financial disclosure by ID
  getFinancialDisclosureById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/financial-disclosures/${id}`);
    if (!response.ok) throw new Error('Failed to fetch financial disclosure');
    return response.json();
  }
};