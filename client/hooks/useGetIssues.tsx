import { useQuery } from 'react-query';
import type { Issue } from '../../server/index';

async function getIssues(): Promise<Issue[]> {
  const response = await fetch(`http://localhost:4000/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export function useGetIssues() {
  return useQuery<readonly Issue[], Error>({
    queryKey: ['issues'],
    queryFn: getIssues,
  });
}
