export class Meeting {
    id: number;
    name: string;
    meetingTopics: string;
    topics: string[]
    meetingDesc: string;
    typeId: number;
    typeName: string;
    theme: string
    roomId: number;
    roomName: string;
    managerId: number;
    managerName: string;
    status: number;
    statusDisplay: string;
    startTime: string;
    endTime: string;
    secret: boolean = true;
    secretDispaly: string;
    opened: boolean = true;
    openedDisplay: string;
    autoSync: boolean = true;
    autoSyncDispaly: string;
    vote: boolean = false;
    voteDisplay: string;
    signIn: boolean = false;
    signInDisplay: string;
    autoDelete: boolean = false;
    autoDeleteDisplay: string;
    createdAt: string;
    updatedAt: string;
}