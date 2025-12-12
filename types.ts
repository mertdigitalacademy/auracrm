export type LeadStatus = 'New' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  status: LeadStatus;
  value: number;
  tags: string[];
  ownerAvatar?: string;
  createdAt: string;
}

export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
  dueDate?: string;
  priority: Priority;
  description?: string;
  leadId?: string; // Optional link to a lead
}

export interface UserList {
  id: string;
  name: string;
  leadIds: string[]; // Simulation of many-to-many
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
}

export interface Activity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
}

export type ViewState = 'dashboard' | 'pipeline' | 'lists' | 'tasks' | 'settings' | 'billing';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}