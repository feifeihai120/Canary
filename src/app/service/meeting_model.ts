import { Meeting } from './meeting'
import { MeetingRoom } from '../service/meeting_room'
import { MeetingType } from '../service/meeting_type'
import { MeetingTopicModel } from './meeting_topic_model' 

export class MeetingModel {
    meeting: Meeting
    meetingRooms: MeetingRoom[]
    meetingTypes: MeetingType[]
    meetingTopicModels: MeetingTopicModel[]
}