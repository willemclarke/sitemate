import { useMutation } from 'react-query';
import type { Issue } from '../../server/index';

async function deleteIssue(id: string) {
  const response = await fetch(`http://localhost:4000/delete/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

export function useDeleteIssue() {
  return useMutation<Issue, Error, string>({
    mutationFn: deleteIssue,
  });
}
