import type { Issue } from './index';

export const FILE_PATH = './issues.json';

// initial issue entries
export const issues: Issue[] = [
  { id: '1', title: 'Wrong import syntax', description: 'xyz' },
  { id: '2', title: 'Wrong use of let', description: 'abc' },
  { id: '3', title: 'Postman issue', description: 'hello' },
];

// initialise issues json file
export async function init() {
  await Bun.write(FILE_PATH, JSON.stringify(issues));
}

export async function create(issue: Issue): Promise<Issue[]> {
  const file = Bun.file(FILE_PATH);

  const issues = await file.text();
  const parsed = JSON.parse(issues) as Issue[];
  const updatedIssues = parsed.concat(issue);

  await Bun.write(FILE_PATH, JSON.stringify(updatedIssues));
  return updatedIssues;
}

export async function read(issueId: string): Promise<Issue | null> {
  const file = Bun.file(FILE_PATH);

  const issues = await file.text();
  const parsed = JSON.parse(issues) as Issue[];

  const foundIssue = parsed.find((issue) => issue.id === issueId);

  if (!foundIssue) {
    return null;
  }

  return foundIssue;
}

export async function delete_(issueId: string): Promise<Issue | null> {
  const file = Bun.file(FILE_PATH);

  const issues = await file.text();
  const parsed = JSON.parse(issues) as Issue[];
  const deletedIssue = parsed.find((issue) => issue.id === issueId);

  if (!deletedIssue) {
    return null;
  }

  const filtered = parsed.filter((issue) => issue.id !== issueId);

  await Bun.write(FILE_PATH, JSON.stringify(filtered));
  return deletedIssue;
}

export async function update(issue: Issue): Promise<Issue | null> {
  const file = Bun.file(FILE_PATH);

  const issues = await file.text();
  const parsed = JSON.parse(issues) as Issue[];

  const issueIds = new Set(parsed.map((issue) => issue.id));
  const hasIssue = issueIds.has(issue.id);

  if (hasIssue) {
    const removeOriginal = parsed.filter((issue_) => issue_.id !== issue.id);
    const joined = removeOriginal.concat(issue);

    await Bun.write(FILE_PATH, JSON.stringify(joined));
    return issue;
  }

  return null;
}
