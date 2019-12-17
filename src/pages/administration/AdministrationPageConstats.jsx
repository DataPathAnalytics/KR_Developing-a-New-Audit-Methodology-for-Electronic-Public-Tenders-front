
export const EDIT_AUDITOR_FORM_NAME = 'EditAuditorFormName'
export const AUDITORS_TABLE_COLUMNS = [
  {
    title: '',
    dataIndex: 'name',
    sorter: (a, b) => { return a.name.localeCompare(b.name)},
    width: '40%',
    translate_key: 'table_field_name'
  },
  {
    title: '',
    dataIndex: 'email',
    sorter: (a, b) => { return a.email.localeCompare(b.email)},
    width: '30%',
    translate_key: 'email'
  },
  {
    title: '',
    dataIndex: 'statusIcon',
    align: 'center',
    width: '20%',
    translate_key: 'status'
  },
  {
    title: '',
    dataIndex: 'editButton',
    align: 'center',
    width: '10%',
  },
]