import { Meeting } from './meeting'
import { MeetingTopicModel } from './meeting_topic_model' 

export class MeetingModel {
    meeting: Meeting
    meetingTopicModels: MeetingTopicModel[]
}