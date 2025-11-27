import { Condition } from 'payload'

export const checkSelectedSection = (sectionName: string): Condition => {
  return (_: any, siblingData: any) => {
    return siblingData?.section === sectionName
  }
}
