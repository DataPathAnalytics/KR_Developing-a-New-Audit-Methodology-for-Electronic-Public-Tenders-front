import { PERMISSIONS } from '../../components/secutiry/PermissionConstants'

export const NAVIGATION_BAR_ITEMS = [
  {
    key: '3',
    path: '/home',
    iconType: 'home',
    translationKey: 'menu_home_title',
    permissions: [PERMISSIONS.auditorBase],
    breadcrumb: [
      {
        linkStatus: false,
        translateKey: 'breadcrumb_main_title',
      },
    ],
  },
  {
    key: 'sub1',
    iconType: 'profile',
    translationKey: 'menu_prioritization_title',
    needsAdminPermission: false,
    permissions: [PERMISSIONS.auditorBase],
    subMenu: [
      {
        key: '5',
        path: '/prioritization/buyers',
        iconType: 'idcard',
        translationKey: 'menu_prioritization_buyers_title',
        permissions: [PERMISSIONS.auditorBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_buyers_title',
          },
        ],
      },
      {
        key: '4',
        path: '/prioritization/tenders',
        iconType: 'file-done',
        translationKey: 'menu_prioritization_tenders_title',
        permissions: [PERMISSIONS.auditorBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_tenders_title',
          },
        ],
      },
      {
        key: '8',
        path: '/prioritization/settings',
        iconType: 'setting',
        translationKey: 'menu_prioritization_settings_title',
        permissions: [PERMISSIONS.auditorBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_prioritization_settings_title',
          },
        ],
      },
    ],
  },
  {
    key: 'sub3',
    iconType: 'audit',
    translationKey: 'menu_checklists_title',
    needsAdminPermission: false,
    permissions: [PERMISSIONS.auditorBase, PERMISSIONS.adminBase],
    subMenu: [
      {
        key: '1',
        path: '/templates',
        translationKey: 'menu_templates_title',
        iconType: 'snippets',
        permissions: [PERMISSIONS.auditorBase, PERMISSIONS.adminBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_checklists_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_templates_title',
          },
        ],
      },
      {
        key: '2',
        path: '/inspections/buyer',
        iconType: 'audit',
        translationKey: 'menu_checklists_audit_title',
        permissions: [PERMISSIONS.auditorBase, PERMISSIONS.adminBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_checklists_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_checklists_audit_title',
          },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    iconType: 'tool',
    translationKey: 'menu_administration_title',
    needsAdminPermission: true,
    permissions: [PERMISSIONS.adminBase],
    subMenu: [
      {
        key: '6',
        path: '/administration/users',
        iconType: 'user',
        translationKey: 'menu_administration_users_title',
        permissions: [PERMISSIONS.adminBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_users_title',
          },
        ],
      },
      {
        key: '7',
        path: '/administration/calendar',
        iconType: 'calendar',
        translationKey: 'menu_administration_calendar_title',
        permissions: [PERMISSIONS.adminBase],
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_calendar_title',
          },
        ],
      },
    ],
  },
  {
    key: 'sub5',
    iconType: 'question',
    translationKey: 'menu_documentation_title',
    needsAdminPermission: true,
    permissions: [PERMISSIONS.auditorBase, PERMISSIONS.adminBase],
    subMenu: [
      {
        key: '9',
        path: '/documentation/manual',
        iconType: 'file-text',
        translationKey: 'menu_documentation_manuals_title',
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_documentation_manuals_title',
          },
        ],
        permissions: [PERMISSIONS.auditorBase],
      },
      {
        key: '10',
        path: '/documentation/videos',
        iconType: 'video-camera',
        translationKey: 'menu_documentation_videos_title',
        breadcrumb: [
          {
            linkStatus: true,
            path: '/',
            translateKey: 'breadcrumb_main_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_administration_title',
          },
          {
            linkStatus: false,
            translateKey: 'menu_documentation_videos_title',
          },
        ],
        permissions: [PERMISSIONS.auditorBase, PERMISSIONS.adminBase],
      },
    ],
  },
  // {
  //   key: 'sub4',
  //   iconType: 'tool',
  //   translationKey: 'menu_administration_title',
  //   path: '/documentation',
  //   subMenu: [
  //   ],
  //   needsAdminPermission: false,
  // },
]