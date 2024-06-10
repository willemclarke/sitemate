import { useMutation } from 'react-query';
import type { Issue } from '../../server/index';

async function updateIssue(issue: Issue) {
  const response = await fetch(`http://localhost:4000/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issue),
  });

  const data = await response.json();
  return data;
}

export function useUpdateIssue() {
  return useMutation<Issue, Error, Issue>({
    mutationFn: updateIssue,
  });
}
