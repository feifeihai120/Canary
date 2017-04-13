import { Meeting } from './meeting'
import { MeetingTopic } from './meeting_topic'
import { MeetingPeople } from './meeting_people'
import { MeetingMaterial } from './meeting_material'

export class MeetingSimpleModel {
    meeting: Meeting = new Meeting()
    topics: MeetingTopic[] = []
    topicId: number
    topicName: string
    meetingPeople: MeetingPeople[] = []
    meetingMaterials: MeetingMaterial[] = []
}