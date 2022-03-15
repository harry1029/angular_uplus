
export interface ApiFlightInfo {
  id?: number;  
  returnString?: string;
  queryFlag?: number;// -2:没有找到；-1-不支持；0-不确定；1-接机； 2-送机；
  FlightDate?: Date;   //航班日期
  flightNo?: string; //输入的航班号
  ident?: string;           //查询到的航班号
  actualIdent?: string; 
  stopover?: number;   //经停次数
  aircraftType?: string;
  arrivalTime?: Date;   //到达时间
  departureTime?: Date;    //起飞时间
  stopArrivalTime?: Date;    //经停到达时间
  stopDepartureTime?: Date; //经停起飞时间
  utcArrivalTime?: number;    //Utc到达时间
  utcDepartureTime?: number;     //Utc起飞时间
  utcStopArrivalTime?: number;  //Utc经停到达时间
  utcStopDepartureTime?: number;    //Utc经停起飞时间
  destination?: string;
  mealService?: string;
  origin?: string; //出发机场
  originLatitude?: number;
  originLocation?: string;
  originLongitude?: number;
  originName?: string;
  originTimezone?: string;
  destinationLatitude?: number;
  destinationLocation?: string;
  destinationLongitude?: number;
  destinationName?: string;
  destinationTimezone?: string;
  stopPort?: string; //经停机场
  stopLatitude?: number;
  stopLocation?: string;
  stopLongitude?: number;
  stopName?: string;
  stopTimezone?: string;
}
