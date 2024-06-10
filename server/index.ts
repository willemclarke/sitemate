import express from 'express';
import bodyParser from 'body-parser';
import * as service from './service';
import cors from 'cors';

export interface Issue {
  id: string;
  title: string;
  description: string;
}

await service.init();
const app = express();
const port = process.env.PORT ?? 4000;

app.use(bodyParser.json());
app.use(cors());

app.post('/create', async (req, res) => {
  const issue = req.body;

  const createdIssue = await service.create(issue);
  return res.status(200).json(createdIssue);
});

app.get('/all', async (req, res) => {
  const allIssues = await service.all();
  return res.status(200).json(allIssues);
});

app.post('/update', async (req, res) => {
  const issue = req.body;
  const updatedIssue = await service.update(issue);

  return res.status(200).json(updatedIssue);
});

app.post('/delete/:id', async (req, res) => {
  const issueId = req.params.id;
  const deleted = await service.delete_(issueId);
  return res.status(200).json(deleted);
});

app.get('/read/:id', async (req, res) => {
  const issueId = req.params.id;
  const issue = await service.read(issueId);
  return res.status(200).json(issue);
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}...`);
});
