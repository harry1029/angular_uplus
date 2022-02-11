export interface PersonalCalendar {
    id: number;	
    personalId: number;
    calendarDate?: Date;
    calendarIntDate?: number;
    weekDay?: number;
    workStartTime?: number;
    workEndTime?: number;
    break1StartTime?: number;
    break1EndTime?: number;
}
