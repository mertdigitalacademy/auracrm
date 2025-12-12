import { Lead, Activity, Metric, LeadStatus, Task } from './types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Alice Freeman',
    company: 'Nexus Corp',
    email: 'alice@nexus.com',
    status: 'New',
    value: 12500,
    tags: ['Enterprise', 'Q3'],
    ownerAvatar: 'https://picsum.photos/32/32?random=1',
    createdAt: '2023-10-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Bob Smith',
    company: 'Global Tech',
    email: 'bob@global.com',
    status: 'Proposal',
    value: 45000,
    tags: ['High Value'],
    ownerAvatar: 'https://picsum.photos/32/32?random=2',
    createdAt: '2023-10-02T14:30:00Z'
  },
  {
    id: '3',
    name: 'Charlie Davis',
    company: 'StartUp Inc',
    email: 'charlie@startup.io',
    status: 'Contacted',
    value: 5000,
    tags: ['SaaS', 'Inbound'],
    ownerAvatar: 'https://picsum.photos/32/32?random=3',
    createdAt: '2023-10-03T09:15:00Z'
  },
  {
    id: '4',
    name: 'Diana Prince',
    company: 'Amazonia',
    email: 'diana@amazonia.net',
    status: 'Negotiation',
    value: 82000,
    tags: ['Enterprise'],
    ownerAvatar: 'https://picsum.photos/32/32?random=4',
    createdAt: '2023-10-04T16:45:00Z'
  },
  {
    id: '5',
    name: 'Evan Wright',
    company: 'Wright Designs',
    email: 'evan@wright.com',
    status: 'Won',
    value: 1500,
    tags: ['Design'],
    ownerAvatar: 'https://picsum.photos/32/32?random=5',
    createdAt: '2023-09-28T11:20:00Z'
  },
  {
    id: '6',
    name: 'Fiona Gallagher',
    company: 'South Side',
    email: 'fiona@south.com',
    status: 'New',
    value: 3200,
    tags: ['Retail'],
    ownerAvatar: 'https://picsum.photos/32/32?random=6',
    createdAt: '2023-10-05T08:00:00Z'
  }
];

export const PIPELINE_COLUMNS: LeadStatus[] = ['New', 'Contacted', 'Proposal', 'Negotiation', 'Won'];

export const ACTIVITIES: Activity[] = [
  { id: '1', user: 'Sarah Jenkins', avatar: 'https://picsum.photos/32/32?random=10', action: 'moved deal', target: 'Nexus Corp', time: '2m ago' },
  { id: '2', user: 'Mike Ross', avatar: 'https://picsum.photos/32/32?random=11', action: 'closed', target: 'Wright Designs', time: '1h ago' },
  { id: '3', user: 'Sarah Jenkins', avatar: 'https://picsum.photos/32/32?random=10', action: 'added note', target: 'Amazonia', time: '3h ago' },
  { id: '4', user: 'System', avatar: 'https://picsum.photos/32/32?random=99', action: 'synced email', target: 'Global Tech', time: '5h ago' },
];

export const REVENUE_DATA = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
  { name: 'Mon', value: 6000 },
  { name: 'Tue', value: 7200 },
  { name: 'Wed', value: 8500 },
  { name: 'Thu', value: 9200 },
];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Follow up with Nexus Corp', isComplete: false, priority: 'High', dueDate: '2023-10-25', description: 'Discuss Q3 pricing adjustments.' },
  { id: '2', title: 'Prepare proposal for Global Tech', isComplete: true, priority: 'Medium', dueDate: '2023-10-20' },
  { id: '3', title: 'Update CRM records', isComplete: false, priority: 'Low', dueDate: '2023-11-01' },
];