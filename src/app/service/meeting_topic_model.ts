import { MeetingPeoplePage } from './meeting_people_page'
import { MeetingMaterialPage } from './meeting_material_page'

export class MeetingTopicModel {
    id: number
    name: string
    meetingPeoplePageInfo: MeetingPeoplePage 
    meetingMaterialPageInfo: MeetingMaterialPage 
}