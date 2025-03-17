import { ModuleDefinition } from '../types';
import { ActivitySquare, FileWarning, AlertTriangle, FileAlert } from 'lucide-react';

// Activity Management System module definition
export const activityManagementModule: ModuleDefinition = {
  id: 'activity-management',
  name: 'Activity Management',
  description: 'Manage compliance activities, schedule contractors, and track completion.',
  version: '1.0.0',
  author: 'Schoolgle',
  category: 'estates',
  color: '#4CAF50', // Green
  icon: 'ActivitySquare',
  enabled: false,
  required: false,
  routes: [
    {
      path: '/modules/estates/activity-management',
      name: 'Dashboard',
      description: 'Activity Management Dashboard',
      isDefaultRoute: true,
    },
    {
      path: '/modules/estates/activity-management/calendar',
      name: 'Calendar',
      description: 'Activity Calendar View',
      permissions: ['activity:read'],
    },
    {
      path: '/modules/estates/activity-management/activities',
      name: 'All Activities',
      description: 'View all activities',
      permissions: ['activity:read'],
    },
    {
      path: '/modules/estates/activity-management/compliance',
      name: 'Compliance',
      description: 'Compliance overview',
      permissions: ['activity:read'],
    },
    {
      path: '/modules/estates/activity-management/history',
      name: 'History',
      description: 'Activity history and audit',
      permissions: ['activity:read:history'],
    },
  ],
  permissions: [
    {
      action: 'activity:read',
      description: 'View activities',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'activity:create',
      description: 'Create new activities',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'activity:update',
      description: 'Update existing activities',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'activity:delete',
      description: 'Delete activities',
      roles: ['admin'],
    },
    {
      action: 'activity:read:history',
      description: 'View activity history',
      roles: ['admin', 'estates_manager'],
    },
  ],
};

// Risk Assessment System module definition
export const riskAssessmentModule: ModuleDefinition = {
  id: 'risk-assessment',
  name: 'Risk Assessment',
  description: 'Create, manage, and review risk assessments for your school.',
  version: '1.0.0',
  author: 'Schoolgle',
  category: 'estates',
  color: '#FF9800', // Orange
  icon: 'FileWarning',
  enabled: false,
  required: false,
  routes: [
    {
      path: '/modules/estates/risk-assessment',
      name: 'Dashboard',
      description: 'Risk Assessment Dashboard',
      isDefaultRoute: true,
    },
    {
      path: '/modules/estates/risk-assessment/create',
      name: 'Create',
      description: 'Create a new risk assessment',
      permissions: ['risk:create'],
    },
    {
      path: '/modules/estates/risk-assessment/view',
      name: 'View All',
      description: 'View all risk assessments',
      permissions: ['risk:read'],
    },
    {
      path: '/modules/estates/risk-assessment/settings',
      name: 'Settings',
      description: 'Risk assessment settings',
      permissions: ['risk:admin'],
    },
  ],
  permissions: [
    {
      action: 'risk:read',
      description: 'View risk assessments',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'risk:create',
      description: 'Create new risk assessments',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'risk:update',
      description: 'Update existing risk assessments',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'risk:review',
      description: 'Review risk assessments',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'risk:approve',
      description: 'Approve risk assessments',
      roles: ['admin'],
    },
    {
      action: 'risk:admin',
      description: 'Manage risk assessment settings',
      roles: ['admin'],
    },
  ],
};

// School Issue Tracker module definition
export const issueTrackerModule: ModuleDefinition = {
  id: 'issue-tracker',
  name: 'Issue Tracker',
  description: 'Track, manage, and resolve issues across your schools.',
  version: '1.0.0',
  author: 'Schoolgle',
  category: 'estates',
  color: '#2196F3', // Blue
  icon: 'AlertTriangle',
  enabled: false,
  required: false,
  routes: [
    {
      path: '/modules/estates/issue-tracker',
      name: 'Dashboard',
      description: 'Issue Tracker Dashboard',
      isDefaultRoute: true,
    },
    {
      path: '/modules/estates/issue-tracker/new',
      name: 'New Issue',
      description: 'Create a new issue',
      permissions: ['issue:create'],
    },
    {
      path: '/modules/estates/issue-tracker/issues',
      name: 'All Issues',
      description: 'View all issues',
      permissions: ['issue:read'],
    },
    {
      path: '/modules/estates/issue-tracker/email',
      name: 'Email Issues',
      description: 'Email issue reporting',
      permissions: ['issue:admin'],
    },
  ],
  permissions: [
    {
      action: 'issue:read',
      description: 'View issues',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'issue:create',
      description: 'Create new issues',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'issue:update',
      description: 'Update existing issues',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'issue:delete',
      description: 'Delete issues',
      roles: ['admin'],
    },
    {
      action: 'issue:admin',
      description: 'Manage issue tracker settings',
      roles: ['admin'],
    },
  ],
};

// Incidents Management module definition
export const incidentsModule: ModuleDefinition = {
  id: 'incidents',
  name: 'Incidents',
  description: 'Manage, track, and report incidents in your school.',
  version: '1.0.0',
  author: 'Schoolgle',
  category: 'estates',
  color: '#F44336', // Red
  icon: 'FileAlert',
  enabled: false,
  required: false,
  routes: [
    {
      path: '/modules/estates/incidents',
      name: 'Dashboard',
      description: 'Incidents Dashboard',
      isDefaultRoute: true,
    },
    {
      path: '/modules/estates/incidents/new',
      name: 'New Incident',
      description: 'Report a new incident',
      permissions: ['incident:create'],
    },
    {
      path: '/modules/estates/incidents/all',
      name: 'All Incidents',
      description: 'View all incidents',
      permissions: ['incident:read'],
    },
    {
      path: '/modules/estates/incidents/templates',
      name: 'Templates',
      description: 'Incident report templates',
      permissions: ['incident:admin'],
    },
    {
      path: '/modules/estates/incidents/admin',
      name: 'Admin',
      description: 'Incident management admin',
      permissions: ['incident:admin'],
    },
  ],
  permissions: [
    {
      action: 'incident:read',
      description: 'View incidents',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'incident:create',
      description: 'Create new incident reports',
      roles: ['admin', 'estates_manager', 'staff'],
    },
    {
      action: 'incident:update',
      description: 'Update existing incidents',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'incident:close',
      description: 'Close incidents',
      roles: ['admin', 'estates_manager'],
    },
    {
      action: 'incident:admin',
      description: 'Manage incident settings and templates',
      roles: ['admin'],
    },
  ],
};

// Export all estate modules
export const estateModules: ModuleDefinition[] = [
  activityManagementModule,
  riskAssessmentModule,
  issueTrackerModule,
  incidentsModule,
];