import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isTeamSection = checkSelectedSection('team')

const teamMember = {
  name: {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  info: {
    name: 'info',
    label: 'Team Info',
    type: 'textarea',
  },
  email: {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
}

export const teamFields = {
  title: {
    name: 'teamTitle',
    label: 'Team Title',
    type: 'text',
    required: false,
    admin: { condition: isTeamSection },
  },
  teamList: {
    name: 'teamList',
    label: 'Team Members',
    type: 'array',
    fields: Object.values(teamMember),
    admin: { condition: isTeamSection },
    minRows: 1,
  },
}
