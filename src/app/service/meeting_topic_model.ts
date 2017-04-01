import { MeetingPeople } from './meeting_people'
import { MeetingMaterial } from './meeting_material'

export class MeetingTopicModel {
    id: number
    name: string
    meetingPeople: MeetingPeople[]
    meetingMaterials: MeetingMaterial[]
}