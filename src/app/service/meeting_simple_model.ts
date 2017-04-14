import { Meeting } from './meeting'
import { MeetingTopic } from './meeting_topic'
import { User } from './user'
import { MeetingMaterial } from './meeting_material'

export class MeetingSimpleModel {
    meeting: Meeting = new Meeting()
    topics: MeetingTopic[] = []
    topicId: number
    topicName: string
    users: User[] = []
    meetingMaterials: MeetingMaterial[] = []
}