export interface PersonCalendar {
    id: number;	
    personId: number;
    calendarDate?: Date;
    calendarIntDate?: number;
    weekDay?: number;
    workStartTime?: number;
    workEndTime?: number;
    break1StartTime?: number;
    break1EndTime?: number;
}
