import { PERMISSIONS } from '../../components/secutiry/PermissionConstants'

export const VIDEO_TITLES = {
  [PERMISSIONS.adminBase]: {
    chunkSize: 2,
    videoOptions: [
      {
        videoTranslationKey: 'admin_video_1_name',
        videoSourceName: '/media/admin_application_review.mp4',
        slide: '/video_slides/admin_application_review.png',
        styleObject: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'admin_video_2_name',
        videoSourceName: '/media/admin_controls.mp4',
        slide: '/video_slides/controls_element.png',
        styleObject: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'admin_video_3_name',
        videoSourceName: '/media/work_with_admin_checklist_templates.mp4',
        slide: '/video_slides/checklist_templates.png',
        styleObject: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'admin_video_4_name',
        videoSourceName: '/media/management_of_users_and_their_completed_checklists_and_calendar.mp4',
        slide: '/video_slides/first_slide_for_all_videos.png',
        styleObject: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
    ],
  },
  [PERMISSIONS.auditorBase]: {
    chunkSize: 2,
    videoOptions: [
      {
        videoTranslationKey: 'auditor_video_1_name',
        videoSourceName: '/media/application_review.mp4',
        slide: '/video_slides/admin_application_review.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'flex-start',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'auditor_video_2_name',
        videoSourceName: '/media/controls_element.mp4',
        slide: '/video_slides/controls_element.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'center',
          justifyContent: 'center',
        },
      },
      // {
      //   videoTranslationKey: 'auditor_video_3_name',
      //   videoSourceName: '/media/1_1_сontrols.mp4',
      //   slide: '/video_slides/first_slide_for_all_videos.png',
      //   styleObject: {
      //     display: 'flex',
      //     // justifyContent: 'flex-end',
      //     justifyContent: 'center',
      //   },
      // },
      {
        videoTranslationKey: 'auditor_video_4_name',
        videoSourceName: '/media/procuring_entity_procuring_entity_tender_selection.mp4',
        slide: '/video_slides/procuring_entity_procuring_entity_tender_selection.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'flex-start',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'auditor_video_7_name',
        videoSourceName: '/media/selection_tenders_of_the_procuring_entity.mp4',
        slide: '/video_slides/selection_tenders_of_the_procuring_entity.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'flex-start',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'auditor_video_5_name',
        videoSourceName: '/media/checklist_templates.mp4',
        slide: '/video_slides/checklist_templates.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'center',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'auditor_video_6_name',
        videoSourceName: '/media/auditors_checklists.mp4',
        slide: '/video_slides/first_slide_for_all_videos.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'flex-end',
          justifyContent: 'center',
        },
      },
      {
        videoTranslationKey: 'auditor_video_8_name',
        videoSourceName: '/media/auditor_checklist_fill.mp4',
        slide: '/video_slides/auditor_checklist_fill.png',
        styleObject: {
          display: 'flex',
          // justifyContent: 'flex-end',
          justifyContent: 'center',
        },
      },
    ],
  },
}

export const USER_MANUAL_MENU = [
  {
    menuTitle: '1. КОМПОНЕНТЫ АНАЛИТИЧЕСКОГО ПРИЛОЖЕНИЯ',
    refKey: 'link_1',
    className: 'user-menu',
    subMenu: [
      {
        menuTitle: 'Принципы построения приложения',
        refKey: 'link_1_1',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Модули приложения',
        refKey: 'link_1_2',
        className: 'user-sub-menu',
      },
    ],
  },
  {
    menuTitle: '2. МЕТОДОЛОГИИ АНАЛИТИЧЕСКОГО ПРИЛОЖЕНИЯ',
    refKey: 'link_2',
    className: 'user-menu',
    subMenu: [
      {
        menuTitle: 'Методология расчета автоматических индикаторов риска и «красных флажков» описание внедренных автоматических индикаторов риска в аналитическом приложении',
        refKey: 'link_2_1',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Принципы формирования автоматических индикаторов риска и «красных флажков».',
        refKey: 'link_2_2',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Методология приоритезации конкурсов по риску с помощью применения автоматических индикаторов риска',
        refKey: 'link_2_3',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Методология приоритезации закупающих организаций, которые генерируют конкурсы с риском',
        refKey: 'link_2_4',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Балловая (скоринговая) методология, внедренная в контрольные листы для оценки результатов компонентов контрольного листа.',
        refKey: 'link_2_5',
        className: 'user-sub-menu',
      },
    ],
  },
  {
    menuTitle: '3. ИСТОЧНИКИ ДАННЫХ',
    refKey: 'link_3',
    className: 'user-menu',
    subMenu: [],
  },
  {
    menuTitle: '4. ОЦЕНКА РИСКА ЗАКУПАЮЩИХ ОРГАНИЗАЦИЙ',
    refKey: 'link_4',
    className: 'user-menu',
    subMenu: [
      {
        menuTitle: 'Настройка параметров оценки уровня риска',
        refKey: 'link_4_1',
        className: 'user-sub-menu',
      },
      {
        menuTitle: 'Пошаговая инструкция использования аналитического инструмента для оценки риска закупающих организаций',
        refKey: 'link_4_2',
        className: 'user-sub-menu',
      },
    ],
  },
  {
    menuTitle: '5. ПРИМЕНЕНИЕ АВТОМАТИЧЕСКИХ ИНДИКАТОРОВ РИСКА ДЛЯ ОПРЕДЕЛЕНИЯ ВЫБОРКИ КОНКУРСОВ ДЛЯ АУДИТА',
    refKey: 'link_5',
    className: 'user-menu',
    subMenu: [
      {
        menuTitle: 'Пошаговая инструкция использования аналитического инструмента для оценки риска конкурсов',
        refKey: 'link_5_1',
        className: 'user-sub-menu',
      },
    ],
  },
  {
    menuTitle: '6. КОНТРОЛЬНЫЕ ЛИСТЫ',
    refKey: 'link_6',
    className: 'user-menu',
    subMenu: [],
  },
  {
    menuTitle: '7. ОПИСАНИЕ АВТОМАТИЧЕСКИХ ИНДИКАТОРОВ РИСКА',
    refKey: 'link_7',
    className: 'user-menu',
    subMenu: [],
  },
]