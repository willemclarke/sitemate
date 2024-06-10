import React from 'react';
import { useCreateIssue } from './hooks/useCreateIssue';
import { v4 as uuidv4 } from 'uuid';
import type { Issue } from '../server/index';
import { useDeleteIssue } from './hooks/useDeleteIssue';
import { useGetIssues } from './hooks/useGetIssues';
import { useUpdateIssue } from './hooks/useUpdateIssue';

function App() {
  const createIssueMutation = useCreateIssue();
  const deleteIssueMutation = useDeleteIssue();
  const updateIssueMutation = useUpdateIssue();
  const issuesQuery = useGetIssues();

  const onCreateClicked = React.useCallback(async () => {
    await createIssueMutation.mutateAsync(
      {
        id: uuidv4(),
        title: 'Some hardcoded issue',
        description: 'adding an issue from UI',
      },
      { onSuccess: () => issuesQuery.refetch() }
    );
  }, []);

  const onUpdateClicked = React.useCallback(async () => {
    await updateIssueMutation.mutateAsync(
      // updating our pre initialised number 2 record
      {
        id: '2',
        title: 'UPDATING THE TITLE',
        description: 'UPDATING THE BODY',
      },
      { onSuccess: () => issuesQuery.refetch() }
    );
  }, []);

  const onDeleteClicked = React.useCallback(async () => {
    // hardcoding deletion for now
    const id = '3';
    await deleteIssueMutation.mutateAsync(id, {
      onSuccess: () => issuesQuery.refetch(),
    });
  }, []);

  if (issuesQuery.isLoading || !issuesQuery.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Sitemate challenge</h1>
      <button onClick={onCreateClicked}>Create</button>
      <button onClick={onDeleteClicked}>Delete</button>
      <button onClick={onUpdateClicked}>Update</button>
      <pre style={{ width: '500px' }}>{JSON.stringify(issuesQuery.data)}</pre>
    </div>
  );
}

export default App;
