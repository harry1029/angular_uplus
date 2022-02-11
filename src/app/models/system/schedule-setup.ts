export interface ScheduleSetup {
    id: number;	//personalId
    startDate?: Date;
    endDate?: Date;
    sunday?: number;
    monday?: number;
    tuesday?: number;
    wednesday?: number;
    thursday?: number;
    friday?: number;
    saturday?: number;
    startTime?: number;
    endTime?: number;
    startBreakTime?: number;
    endBreakTime?: number;
    interval?: number;
    examTime?: number;
}
