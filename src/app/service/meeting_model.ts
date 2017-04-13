import { Meeting } from './meeting'
import { MeetingRoom } from '../service/meeting_room'
import { MeetingType } from '../service/meeting_type'
import { MeetingTopic } from './meeting_topic' 

export class MeetingModel {
    meeting: Meeting
    meetingRooms: MeetingRoom[]
    meetingTypes: MeetingType[]
    meetingTopics: MeetingTopic[]
}